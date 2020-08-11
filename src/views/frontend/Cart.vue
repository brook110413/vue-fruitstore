<template>
  <div class="cart pt-4">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8 mb-5">
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
              aria-valuenow="33"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 33%"
            ></div>
          </div>
        </div>
      </div>
      <div class="row" v-if="cart[0]">
        <div class="col-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">品名</th>
                <th scope="col" width="150" class="text-center">數量</th>
                <th scope="col" class="text-center">單位</th>
                <th scope="col" width="120" class="text-right">小計</th>
                <th scope="col" width="10%" class="text-center">移除</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.product.id">
                <td class="align-middle" scope="row">
                  <img :src="item.product.imageUrl[0]" class="img-fluid mr-3" width="100px" />
                  {{ item.product.title }}
                </td>
                <td class="align-middle">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button
                        class="btn btn-outline-primary"
                        @click="item.quantity--;quantityUpdate(item.product.id, item.quantity)"
                        :disabled="item.quantity === 1"
                      >
                        -
                      </button>
                    </div>
                    <input
                      type="number"
                      min="1"
                      class="form-control text-center"
                      readonly
                      v-model.number="item.quantity"
                    />
                    <div class="input-group-append">
                      <button
                      class="btn btn-outline-primary"
                      @click="item.quantity++;quantityUpdate(item.product.id, item.quantity)">
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td class="align-middle text-center">{{ item.product.unit }}</td>
                <td class="align-middle text-right">
                  {{ (item.product.price * item.quantity) | money }}
                </td>
                <td class="align-middle text-center">
                  <button type="button" class="btn btn-sm" @click="delOneCartItem(item.product.id)">
                    <font-awesome-icon icon="times" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">訂單詳細</h3>
              <div class="card-content mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="mb-0">小計</h5>
                  <p class="mb-0 h5">{{ updateCartTotalPrice | money }}</p>
                </div>
                <div
                  class="d-flex
                justify-content-between align-items-center mb-2"
                  v-if="coupon.enabled"
                >
                  <h5 class="mb-0">優惠碼</h5>
                  <p class="mb-0 h5">
                    -
                    {{ Math.round(updateCartTotalPrice * ((100 - coupon.percent) / 100)) | money }}
                  </p>
                </div>
                <div class="form-group d-flex">
                  <label for="couponCode" class="sr-only">couponCode</label>
                  <input
                    type="text"
                    class="form-control w-50 mr-2"
                    id="couponCode"
                    placeholder="請輸入優惠碼"
                    v-model="couponCode"
                    @keyup.enter="addCoupon()"
                  />
                  <button type="button" class="btn btn-outline-primary w-50" @click="addCoupon()">
                    套用優惠碼
                  </button>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="mb-0 font-weight-bold">總計</h4>
                <p class="mb-0 h4" v-if="coupon.enabled">
                  {{ Math.round(updateCartTotalPrice * (coupon.percent / 100)) | money }}
                </p>
                <p class="mb-0 h4" v-else>
                  {{ updateCartTotalPrice | money }}
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <router-link to="/products" class="text-dark">
                  <font-awesome-icon icon="angle-left" class="mr-2" />繼續選購</router-link
                >
                <router-link to="/order" class="btn btn-primary">前往結帳</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      isLoading: false,
      coupon: {},
      couponCode: '',
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
        this.isLoading = false;
      });
    },
    delAllCartItem() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http.delete(api).then(() => {
        this.getCart();
        this.$bus.$emit('updateCart');
      });
    },
    quantityUpdate(id, num) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const data = {
        product: id,
        quantity: num,
      };
      this.$http.patch(api, data).then(() => {
        this.getCart();
      });
    },
    delOneCartItem(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      this.$http.delete(api).then(() => {
        this.getCart();
        this.$bus.$emit('updateCart');
      });
    },
    addCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.$http
        .post(api, {
          code: this.couponCode,
        })
        .then((res) => {
          this.coupon = res.data.data;
          this.isLoading = false;
          this.$emit('addCoupon', this.coupon);
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  computed: {
    updateCartTotalPrice() {
      return this.cart.reduce((prev, i) => prev + i.product.price * i.quantity, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #000;
  &-content {
    border-bottom: 1px solid #000;
  }
}
</style>
