<template>
  <div class="product pt-3">
    <loading :active.sync="isLoading"></loading>
    <div class="container" v-if="product.id">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-white">
          <li class="breadcrumb-item">
            <a
              href="#"
              @click.prevent="
                category = '所有商品';
                toProducts();
              "
            >
              所有商品
            </a>
          </li>
          <li class="breadcrumb-item">
            <a
              href="#"
              @click.prevent="
                category = product.category;
                toProducts();
              "
            >
              {{ product.category }}
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
      <div class="row mb-5">
        <div class="col-lg-6">
          <div class="d-flex justify-content-center">
            <img :src="product.imageUrl[0]" alt="" class="img-fluid rounded" />
            <a
              href="#"
              class="btn favorite"
              @click.prevent="removefavorite()"
              v-if="favoriteId.includes(product.id)"
            >
              <i class="fas fa-heart fa-2x text-white"></i>
            </a>
            <a href="#" class="btn favorite" @click.prevent="addfavorite()" v-else>
              <i class="far fa-heart fa-2x text-white"></i>
            </a>
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
                <p class="mb-0 h4 font-weight-bold">
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
                      :disabled="cartNum <= 1"
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
      <h3 class="h4 mb-3">相關商品</h3>
      <swiper :relatedProducts="relatedProducts" @toProduct="getProduct()"></swiper>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import Swiper from '@/components/Swiper.vue';

export default {
  name: 'Product',
  components: {
    Swiper,
  },
  data() {
    return {
      relatedProducts: [],
      product: {},
      cartNum: 1,
      isLoading: false,
      favoriteList: [],
      favoriteId: [],
      category: '',
    };
  },
  created() {
    this.getProduct();
    this.favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    this.favoriteId = JSON.parse(localStorage.getItem('favoriteId')) || [];
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
        this.getRelatedProducts();
      });
    },
    getRelatedProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(api).then((res) => {
        this.relatedProducts = res.data.data.filter(
          (item) => item.category === this.product.category && item.id !== this.product.id,
        );
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
    addfavorite() {
      this.favoriteList.push(this.product);
      this.favoriteId.push(this.product.id);
      this.favoriteList = [...new Set(this.favoriteList)];
      this.favoriteId = [...new Set(this.favoriteId)];
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
      localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId));
      swal({
        title: '加入追蹤商品',
        text: '已加入追蹤商品當中',
        icon: 'success',
        buttons: false,
        timer: 1000,
      });
    },
    removefavorite() {
      this.favoriteList.forEach((i, index) => {
        if (i.id === this.product.id) {
          this.favoriteList.splice(index, 1);
          localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
        }
      });
      this.favoriteId.forEach((i, index) => {
        if (i === this.product.id) {
          this.favoriteId.splice(index, 1);
          localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId));
        }
      });
      swal({
        title: '取消追蹤商品',
        text: '已取消追蹤商品',
        icon: 'info',
        buttons: false,
        timer: 1000,
      });
    },
    toProducts() {
      this.$emit('fliterProduct', this.category);
      this.$router.push(`/products/${this.category}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.favorite {
  position: absolute;
  right: 15px;
}
.swiper-container {
  padding-bottom: 30px;
}
</style>
