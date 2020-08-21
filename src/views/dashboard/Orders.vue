<template>
  <div class="orders mt-3">
    <loading :active.sync="isLoading"></loading>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">下單時間</th>
          <th scope="col">購買項目</th>
          <th scope="col" class="text-center">付款方式</th>
          <th scope="col" class="text-right">應付金額</th>
          <th scope="col">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <th scope="row">{{ item.created.datetime }}</th>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, key) in item.products" :key="key">
                {{ product.product.title }} 數量：{{ product.quantity }} {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-center">{{ item.payment }}</td>
          <td class="text-right">{{ Math.round(item.amount) | money }}</td>
          <td>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                :id="item.id"
                v-model="item.paid"
                @change="setOrderPaid(item)"
              />
              <label class="custom-control-label" :for="item.id">
                <span class="text-success font-weight-bolder" v-if="item.paid">已付款</span>
                <span v-else>尚未付款</span>
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @update="getOeders" v-if="orders[0]"></pagination>
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';

export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    pagination,
  },
  created() {
    this.getOeders();
  },
  methods: {
    getOeders(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;
      this.$http.get(api).then((res) => {
        this.isLoading = false;
        this.orders = res.data.data;
        this.pagination = res.data.meta.pagination;
      });
    },
    setOrderPaid(item) {
      this.isLoading = true;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      if (!item.paid) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }
      this.$http.patch(api, item.id).then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>
