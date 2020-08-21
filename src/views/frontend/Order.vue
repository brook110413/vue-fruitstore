<template>
  <div class="order pt-4">
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
              aria-valuenow="66"
              aria-valuemin="0"
              aria-valuemax="100"
              style="width: 66%"
            ></div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <validation-observer v-slot="{ invalid }" tag="div" class="col-lg-6">
          <form @submit.prevent="createOrder">
            <!-- 姓名 -->
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="username"
                  >收件人姓名 <span class="text-danger align-middle">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  id="username"
                  name="收件人姓名"
                  aria-describedby="username"
                  placeholder="請輸入收件人姓名"
                  v-model="form.name"
                />
                <span class="text-danger"> {{ errors[0] }} </span>
              </validation-provider>
            </div>
            <!-- email -->
            <div class="form-group">
              <validation-provider rules="required|email" v-slot="{ errors, classes }">
                <label for="email">Email <span class="text-danger align-middle">*</span></label>
                <input
                  type="email"
                  class="form-control"
                  :class="classes"
                  id="email"
                  name="電子郵件"
                  aria-describedby="email"
                  placeholder="請輸入email"
                  v-model="form.email"
                />
                <span class="text-danger"> {{ errors[0] }} </span>
              </validation-provider>
            </div>
            <!-- 電話 -->
            <div class="form-group">
              <validation-provider rules="required|min:8|numeric" v-slot="{ errors, classes }">
                <label for="tel">電話 <span class="text-danger align-middle">*</span></label>
                <input
                  type="tel"
                  class="form-control"
                  :class="classes"
                  id="tel"
                  name="電話"
                  aria-describedby="tel"
                  placeholder="請輸入電話"
                  v-model="form.tel"
                />
                <span class="text-danger"> {{ errors[0] }} </span>
              </validation-provider>
            </div>
            <!-- 地址 -->
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="address">地址 <span class="text-danger align-middle">*</span></label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  id="address"
                  name="地址"
                  aria-describedby="address"
                  placeholder="請輸入收件地址"
                  v-model="form.address"
                />
                <span class="text-danger"> {{ errors[0] }} </span>
              </validation-provider>
            </div>
            <!-- 付款方式 -->
            <div class="form-group">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="payment"
                  >付款方式 <span class="text-danger align-middle">*</span></label
                >
                <select
                  name="付款方式"
                  id="payment"
                  class="form-control"
                  :class="classes"
                  v-model="form.payment"
                >
                  <option value="" disabled>請選擇付款方式</option>
                  <option value="WebATM">WebATM</option>
                  <option value="ATM">ATM</option>
                  <option value="Barcode">Barcode</option>
                  <option value="Credit">Credit</option>
                  <option value="ApplePay">ApplePay</option>
                  <option value="GooglePay">GooglePay</option>
                </select>
                <span class="text-danger"> {{ errors[0] }} </span>
              </validation-provider>
            </div>
            <!-- 備註 -->
            <div class="form-group">
              <label for="message">備註</label>
              <textarea
                name="message"
                id="message"
                class="form-control"
                cols="30"
                rows="3"
                placeholder="有什麼想和我們說的嗎？"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <router-link to="/cart" class="text-dark">
                <i class="fas fa-angle-left mr-2"></i>回購物車</router-link
              >
              <button type="submit" class="btn btn-primary" :disabled="invalid">
                提交訂單
              </button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: 'Order',
  data() {
    return {
      isLoading: false,
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
      },
    };
  },
  props: ['coupon'],
  methods: {
    createOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      const order = { ...this.form };

      if (this.coupon.enabled) {
        order.coupon = this.coupon.code;
      }
      this.$http
        .post(api, order)
        .then(() => {
          this.$bus.$emit('updateCart');
          this.$router.push('/checkout');
          this.isLoading = false;
        })
        .catch(() => {
          swal({
            title: '訂單失敗',
            text: '系統忙碌中，請稍後再嘗試',
            icon: 'error',
            buttons: false,
            timer: 1000,
          });
        });
    },
  },
};
</script>
