<template>
  <div class="checkout pt-4">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 mb-4">
          <ul class="list-unstyled d-flex justify-content-around mb-1">
            <li class="d-flex flex-column align-items-center">
              <span
                class="rounded-circle bg-primary
                d-flex justify-content-center
                align-items-center text-white"
                style="width:20px; height:20px"
                >1</span
              >購物車
            </li>
            <li class="d-flex flex-column align-items-center">
              <span
                class="rounded-circle bg-primary
                d-flex justify-content-center
                align-items-center text-white"
                style="width:20px; height:20px"
                >2</span
              >填寫資料
            </li>
            <li class="d-flex flex-column align-items-center">
              <span
                class="rounded-circle bg-primary
                d-flex justify-content-center
                align-items-center text-white"
                style="width:20px; height:20px"
                >3</span
              >訂單確認
            </li>
          </ul>
          <div class="progress">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 100%"
            ></div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="order.products">
        <div class="col-lg-6">
          <table class="table mb-5">
            <thead>
              <tr>
                <th scope="col">品名</th>
                <th scope="col">數量</th>
                <th scope="col" class="text-right">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in order.products" :key="key">
                <td class="align-middle" scope="row">
                  <img
                  :src="item.product.imageUrl[0]"
                  class="img-fluid mr-3 d-none d-md-inline-block" width="100px" />
                  {{ item.product.title }}
                </td>
                <td class="align-middle">{{ item.quantity }} {{ item.product.unit }}</td>
                <td class="align-middle text-right">
                  {{ (item.product.price * item.quantity) | money }}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>優惠碼</td>
                <td class="text-right">
                  - {{ Math.round(orderTotalPrice * ((100 - order.coupon.percent) / 100)) | money }}
                </td>
              </tr>
              <tr>
                <td></td>
                <td class="h4 font-weight-bold">總計</td>
                <td
                class="text-right h4 font-weight-bold">{{ Math.round(order.amount) | money }}</td>
              </tr>
            </tbody>
          </table>
          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row" width="120">收件人姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th scope="row" width="120">電子信箱</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th scope="row" width="120">收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th scope="row" width="120">收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
            </tbody>
          </table>
          <button type="button" class="btn btn-primary btn-block" @click="payOrder()">
            確認付款
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
  data() {
    return {
      orders: [],
      order: {},
      isLoading: false,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      this.$http.get(api).then((res) => {
        this.orders = res.data.data;
        this.getOrder();
      });
    },
    getOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${this.orders[0].id}`;
      this.$http.get(api).then((res) => {
        this.order = res.data.data;
        this.isLoading = false;
      });
    },
    payOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders/${this.order.id}/paying`;
      this.$http.post(api).then(() => {
        this.$router.push('/complete');
        this.isLoading = false;
      });
    },
  },
  computed: {
    orderTotalPrice() {
      return this.order.products.reduce((prev, i) => prev + i.product.price * i.quantity, 0);
    },
  },
};
</script>
