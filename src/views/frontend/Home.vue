<template>
  <div class="home">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <nav class="navbar navbar-expand-lg fixed-top shadow">
        <div class="container">
          <router-link
            to="/"
            class="navbar-brand mr-auto mr-lg-3 order-lg-1"
            @click.native="category = ''"
          >
            <h1 class="brand h4 mb-0">Nutrition</h1>
          </router-link>

          <ul class="navbar-nav flex-row mr-3 mr-lg-0 order-lg-3">
            <li class="nav-item d-flex align-items-center mr-2">
              <div class="input-group input-group-sm d-none d-sm-inline-flex">
                <input
                  type="text"
                  class="form-control rounded-pill"
                  placeholder="找尋什麼商品呢？"
                  v-model.trim="keyword"
                  @keyup.enter="
                    goSearch();
                    category = '';
                  "
                />
                <div class="input-group-append">
                  <button
                    class="btn"
                    type="button"
                    @click="
                      goSearch();
                      category = '';
                    "
                  >
                    <i class="fas fa-search fa-lg"></i>
                  </button>
                </div>
              </div>
            </li>
            <li class="nav-item mr-2">
              <router-link
                to="/favorite"
                class="nav-link mr-2 mr-sm-0"
                @click.native="category = ''"
              >
                <i class="far fa-heart fa-lg"></i>
              </router-link>
            </li>
            <li class="nav-item position-relative">
              <router-link to="/cart" class="nav-link" @click.native="category = ''">
                <i class="fas fa-shopping-cart fa-lg"></i>
                <span class="cartNum badge badge-pill badge-danger" v-if="cart.length !== 0">{{
                  cart.length
                }}</span>
              </router-link>
            </li>
          </ul>

          <button
            class="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">
              <font-awesome-icon icon="bars" style="width:30px;height:30px" />
            </span>
          </button>

          <div
            class="collapse navbar-collapse justify-content-start
          order-lg-2"
            id="navbarNavDropdown"
          >
            <ul class="navbar-nav">
              <li class="nav-item py-2">
                <div class="input-group input-group-sm d-sm-none">
                  <input
                    type="text"
                    class="form-control rounded-pill"
                    placeholder="找尋什麼商品呢？"
                    v-model.trim="keyword"
                    @keyup.enter="goSearch()"
                  />
                  <div class="input-group-append">
                    <button class="btn" type="button" @click="goSearch()">
                      <i class="fas fa-search fa-lg"></i>
                    </button>
                  </div>
                </div>
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  :class="{ active: category === '所有商品' }"
                  @click.prevent="
                    category = '所有商品';
                    toProducts();
                  "
                >
                  所有商品
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  :class="{ active: category === '水果' }"
                  @click.prevent="
                    category = '水果';
                    toProducts();
                  "
                >
                  現摘水果
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  :class="{ active: category === '蔬菜' }"
                  @click.prevent="
                    category = '蔬菜';
                    toProducts();
                  "
                >
                  當季蔬菜
                </a>
              </li>
              <li class="nav-item">
                <a
                  href="#"
                  class="nav-link"
                  :class="{ active: category === '濃縮果汁' }"
                  @click.prevent="
                    category = '濃縮果汁';
                    toProducts();
                  "
                >
                  濃縮果汁
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <main class="main mb-5">
      <router-view
        @updateCart="getCart()"
        @addCoupon="getCoupon"
        @fliterProduct="getCategory"
        @removeCoupon="removeCoupon()"
        :coupon="coupon"
        :keyword="keyword"
        :category="category"
      ></router-view>
    </main>

    <button
      type="button"
      class="btn upIcon shadow"
      @click="goTop()"
      data-aos="fade-up"
      data-aos-offset="300"
    >
      <i class="fas fa-angle-up fa-lg"></i>
    </button>

    <div class="footer bg-primary text-white py-3">
      <div class="container">
        <div class="footer__navbar d-flex justify-content-between align-items-center mb-3 pb-3">
          <router-link
            to="/"
            class="navbar-brand brand text-white p-0"
            @click.native="category = ''"
            >Nutrition</router-link
          >
          <ul class="list-unstyled d-flex mb-0">
            <li class="mr-3">
              <a href="#">
                <i class="fab fa-facebook-square fa-lg text-white"></i>
              </a>
            </li>
            <li class="mr-3">
              <a href="#">
                <i class="fab fa-instagram fa-lg text-white"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-line fa-lg text-white"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-column">
            <a href="tel:0800-987-654" class="text-white mb-3 d-flex align-items-center">
              <i class="fas fa-phone-alt fa-lg mr-3"></i>
              <span class="h5 mb-0">0800-987-654</span>
            </a>
            <a href="mailto:fruitstroe@business.com" class="text-white d-flex align-items-center">
              <i class="fas fa-envelope fa-lg mr-3"></i>
              <span class="h5 mb-0">nutrition@business.com</span>
            </a>
          </div>
          <router-link
            to="/admin/products"
            class="text-white mb-0 align-self-end d-none d-md-inline-block"
          >
            {{ year }} LOGO All Rights Reserved.
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Home',
  data() {
    return {
      cart: [],
      coupon: {},
      isLoading: false,
      keyword: '',
      category: '',
    };
  },
  created() {
    this.getCart();
  },
  mounted() {
    this.$bus.$on('updateCart', () => {
      this.getCart();
    });
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
    getCoupon(para) {
      this.coupon = para;
    },
    removeCoupon() {
      this.coupon = {};
    },
    goSearch() {
      this.$router.push(`/search/keyword/${this.keyword}`);
    },
    toProducts() {
      this.$router.push(`/products/${this.category}`);
    },
    getCategory(para) {
      this.category = para;
    },
    goTop() {
      $('html,body').animate({ scrollTop: 0 }, 333);
    },
  },
  computed: {
    year() {
      return `© ${new Date().getFullYear()}`;
    },
  },
};
</script>

<style lang="scss">
.main {
  margin-top: 58px;
}

.navbar {
  background: rgba(#ffffff, 0.87);
}

.navbar-brand {
  color: #000000;
}

.brand {
  font-family: Monoton;
}

.navbar-nav .nav-link {
  color: #000;
  font-weight: 700;
}

.navbar-nav .router-link-exact-active,
.navbar-nav .nav-link.active,
.navbar-nav .nav-link:hover {
  color: #00796b;
}

.navbar-toggler {
  color: rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.1);
}

.cartNum {
  position: absolute;
  right: -4px;
  top: 0;
}

.upIcon {
  position: fixed;
  right: 2%;
  bottom: 9%;
  border-radius: 50%;
  border: 1px solid #9e9e9e;
  width: 56px;
  height: 56px;
  padding: 6px;
  z-index: 10;
  background: #fff;
  i {
    color: #9e9e9e;
  }
}

.footer__navbar {
  border-bottom: 1px solid #fff;
}

.main {
  min-height: calc(100vh - 269px);
}
.footer {
  height: 162px;
}
</style>
