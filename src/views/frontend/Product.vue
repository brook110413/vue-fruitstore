<template>
  <div class="product pt-3">
    <loading :active.sync="isLoading"></loading>
    <div class="container" v-if="product.id">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white">
          <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
          <li class="breadcrumb-item"><router-link to="/products">線上商城</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
      <div class="row mb-5">
        <div class="col-lg-6">
          <div class="d-flex justify-content-center">
            <img :src="product.imageUrl[0]" alt="" class="img-fluid rounded" />
          </div>
        </div>
        <div class="col-lg-6 d-flex justify-content-center align-items-center">
          <div class="card border-0">
            <div class="card-body">
              <h2 class="card-title text-primary font-weight-bold">{{ product.title }}</h2>
              <p class="card-text">
                【 產品說明 】<br />
                {{ product.content }}
              </p>
              <div class="d-flex flex-column align-items-end mb-3">
                <del class="mb-0 mb-2">
                  原價 {{ product.origin_price | money }} / {{ product.unit }}
                </del>
                <p class="mb-0 text-success h4 font-weight-bold">
                  網路價 {{ product.price | money }} / {{ product.unit }}
                </p>
              </div>
              <p class="h5 text-right">小計 {{ (product.price * cartNum) | money }}</p>
              <div class="d-flex">
                <div class="input-group w-50 mr-3">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-primary"
                      @click="cartNum--"
                      :disabled="cartNum === 1"
                    >
                      -
                    </button>
                  </div>
                  <input
                    type="number"
                    min="1"
                    class="form-control text-center"
                    readonly
                    v-model="cartNum"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" @click="cartNum++">
                      +
                    </button>
                  </div>
                </div>
                <button type="button" class="btn btn-primary w-50" @click="addToCart()">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  data() {
    return {
      product: {},
      cartNum: 1,
      isLoading: false,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      // 取得路由的值
      const { id } = this.$route.params;
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(api).then((res) => {
        this.product = res.data.data;
        this.isLoading = false;
      });
    },
    addToCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: this.product.id,
        quantity: this.cartNum,
      };
      this.$http
        .post(api, cart)
        .then(() => {
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
