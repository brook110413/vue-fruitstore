<template>
  <div class="products">
    <loading :active.sync="isLoading"></loading>
    <div class="row">
      <div class="col-2">
        <div class="list-group" id="list-tab" role="tablist" v-if="products[0]">
          <a
            class="list-group-item list-group-item-action active"
            id="list-home-list"
            data-toggle="list"
            href="#list-home"
            role="tab"
            aria-controls="home"
            >全部商品</a
          >
          <a
            class="list-group-item list-group-item-action"
            id="list-profile-list"
            data-toggle="list"
            href="#list-profile"
            role="tab"
            aria-controls="profile"
            >新鮮蔬菜</a
          >
          <a
            class="list-group-item list-group-item-action"
            id="list-messages-list"
            data-toggle="list"
            href="#list-messages"
            role="tab"
            aria-controls="messages"
            >新鮮水果</a
          >
        </div>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col-4 mt-3 mb-5" v-for="item in products" :key="item.id" v-cloak>
            <div class="card">
              <router-link :to="`/product/${item.id}`" class="productLink">
                <div
                  style="height: 200px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
                ></div>
                <div class="card-body">
                  <h5 class="card-title text-primary font-weight-bold">{{ item.title }}</h5>
                  <p class="card-text"></p>
                  <div class="d-flex justify-content-between">
                    <div>
                      <del class="h6">原價 {{ item.origin_price | money }} 元</del> <small></small>
                      <p class="h4 text-success font-weight-bold">網路價 {{ item.price | money }} 元</p>
                    </div>
                    <button type="button"
                    class="cartBtn btn rounded-circle" @click.prevent="addToCart(item.id)">
                      <font-awesome-icon icon="shopping-cart" size="2x"/>
                    </button>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <pagination :pages="pagination" @update="getProducts"></pagination>
  </div>
</template>

<script>
import swal from 'sweetalert';
import pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    pagination,
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1, paged = 9) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}&paged=${paged}`;
      this.$http.get(api).then((res) => {
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
      });
    },
    addToCart(id, quantity = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http
        .post(api, cart)
        .then(() => {
          swal({
            title: '產品添加成功',
            text: '請至購物車結帳',
            icon: 'success',
            buttons: false,
            timer: 1000,
          });
          this.$emit('updateCart');
          this.isLoading = false;
        })
        .catch(() => {
          swal({
            title: '商品重複',
            text: '商品已放入購物車當中',
            icon: 'error',
            buttons: false,
            timer: 1000,
          });
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  margin-top: 15px;
}

.productLink {
  color: #000000;
  text-decoration: none;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.5s;
  &:hover {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  }
}

.cartBtn {
  background-color: #ffffff;
  color: #f9cdad;
  border: 1px solid #f9cdad;
  transition: 0.5s;
  &:hover {
    background-color: #f9cdad;
    color: #ffffff;
  }
}
</style>
