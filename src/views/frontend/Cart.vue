<template>
  <div class="cart container">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right my-3">
      <button type="button" class="btn btn-outline-danger" @click="delAllCartItem()">
        刪除所有品項
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" width="10%" class="text-center">移除</th>
          <th scope="col" width="45%">品名</th>
          <th scope="col" width="15%" class="text-center">數量</th>
          <th scope="col" width="10%" class="text-center">單位</th>
          <th scope="col" width="10%" class="text-right">小計</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.product.id">
          <td class="align-middle text-center">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="delOneCartItem(item.product.id, item.product.price)"
            >
              <font-awesome-icon icon="trash-alt" />
            </button>
          </td>
          <td class="align-middle" scope="row">
            {{ item.product.title }}
          </td>
          <td class="align-middle">
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-primary"
                  @click="quantityUpdata(item.product.id, item.quantity - 1)"
                  :disabled = "item.quantity === 1"
                >
                  -
                </button>
              </div>
              <input
                type="text"
                class="form-control text-center"
                :value="item.quantity"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-primary"
                  @click="quantityUpdata(item.product.id, item.quantity + 1)"
                >
                  +
                </button>
              </div>
            </div>
          </td>
          <td class="align-middle text-center">{{ item.product.unit }}</td>
          <td class="align-middle text-right">{{ item.product.price * item.quantity | money }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-right">總計</td>
          <td class="text-right">{{cartTotal | money}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      cartTotal: 0,
      isLoading: false,
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(api).then((res) => {
        this.cart = res.data.data;
        this.cartTotal = this.cart.reduce((prev, i) => prev + i.product.price * i.quantity, 0);
        this.isLoading = false;
      });
    },
    delAllCartItem() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http
        .delete(api)
        .then(() => {
          this.cartTotalPrice = 0;
          this.getCart();
          this.$bus.$emit('updateCart');
        });
    },
    quantityUpdata(id, num) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };
      this.$http
        .patch(api, data)
        .then(() => {
          this.getCart();
        });
    },
    delOneCartItem(id, price) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http
        .delete(api)
        .then(() => {
          this.cartTotalPrice -= price;
          this.getCart();
          this.$bus.$emit('updateCart');
        });
    },
  },
};
</script>
