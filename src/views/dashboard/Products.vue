<template>
    <div class="products">
      <loading :active.sync="isLoading"></loading>
      <div class="mt-3 text-right">
        <button
          type="button"
          class="btn btn-primary font-weight-bold"
          data-toggle="modal"
          data-target="#productModal"
          @click="submit = 'add';productTemp = {}"
        >
          建立新的商品
        </button>
      </div>
      <table class="table table-striped mt-3">
        <thead>
          <tr class="thead-dark">
            <th scope="col" width="15%">分類</th>
            <th scope="col" width="40%">產品名稱</th>
            <th
              scope="col"
              width="10%"
              class="sort text-right"
            >
              原價
            </th>
            <th
              scope="col"
              width="10%"
              class="sort text-right"
            >
              售價
            </th>
            <th scope="col" width="15%" class="text-center">是否啟用</th>
            <th scope="col" width="10%" class="text-center">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <th scope="row">{{item.category}}</th>
            <td>{{item.title}}</td>
            <td class="text-right">{{item.origin_price | money}}</td>
            <td class="text-right">{{item.price | money}}</td>
            <td class="text-success text-center font-weight-bold" v-if="item.enabled">啟用</td>
            <td class="text-secondary text-center" v-else>不啟用</td>
            <td>
              <button
                type="button"
                class="btn btn-outline-primary btn-sm mr-2"
                @click="getProductTemp(item);openEditModal()"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                data-toggle="modal"
                data-target="#delProductModal"
                @click="getProductTemp(item)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <product-modal
        :submit="submit"
        ref="productModal"
        @update="getProducts"
      ></product-modal>

      <del-product-modal
        :product-temp="productTemp"
        @update="getProducts"
      ></del-product-modal>

      <pagination :pages="pagination" @update="getProducts()" v-if="products[0]"></pagination>
    </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';
import productModal from '@/components/ProductModal.vue';
import delProductModal from '@/components/DelProductModal.vue';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      productTemp: {},
      pagination: {},
      submit: '',
      ispPrice: false,
      isLoading: false,
    };
  },
  components: {
    pagination,
    productModal,
    delProductModal,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
        });
    },
    getProductTemp(item) {
      this.productTemp = { ...item };
    },
    openEditModal() {
      this.submit = 'edit';
      // 使用 refs 觸發子元件方法
      this.$refs.productModal.getProduct(this.productTemp.id);
    },
  },
};
</script>
