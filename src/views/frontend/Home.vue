<template>
  <div class="home">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <nav class="navbar navbar-expand-sm fixed-top shadow">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            <h1 class="brand h5 mb-0">Nutrition</h1>
          </router-link>
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
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">首頁</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/products" class="nav-link">線上商城</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/cart" class="nav-link">購物車</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <main class="main mb-5">
      <router-view @updateCart="getCart()" @addCoupon="getCoupon" :coupon="coupon"></router-view>
    </main>

    <router-link
      to="/cart"
      class="cartLink
      nav-link rounded-circle d-flex flex-column align-items-center justify-content-center shadow"
      v-if="cart.length !== 0"
      style="width:82px;height:82px"
    >
      <span class="cartNum badge badge-pill badge-danger">{{ cart.length }}</span>
      <font-awesome-icon icon="shopping-cart" size="2x" />
      購物車
    </router-link>

    <div class="footer bg-primary py-3 text-white">
      <div class="container">
        <div class="footer__navbar d-flex justify-content-between align-items-center mb-3 pb-3">
          <router-link to="/" class="navbar-brand brand text-white p-0">Nutrition</router-link>
          <ul class="list-unstyled d-flex mb-0">
            <li class="mr-4">
              <a href="#">
                <font-awesome-icon
                  :icon="['fab', 'facebook-square']"
                  size="2x"
                  class="text-white"
                />
              </a>
            </li>
            <li class="mr-4">
              <a href="#">
                <font-awesome-icon :icon="['fab', 'instagram']" size="2x" class="text-white" />
              </a>
            </li>
            <li>
              <a href="#">
                <font-awesome-icon :icon="['fab', 'line']" size="2x" class="text-white" />
              </a>
            </li>
          </ul>
        </div>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-column">
            <a href="tel:0800-987-654" class="text-white mb-3 d-flex align-items-center">
              <font-awesome-icon icon="phone-alt" size="2x" class="mr-3" />
              <span class="h4 mb-0">0800-987-654</span>
            </a>
            <a href="mailto:fruitstroe@business.com" class="text-white d-flex align-items-center">
              <font-awesome-icon icon="envelope" size="2x" class="mr-3" />
              <span class="h4 mb-0">nutrition@business.com</span>
            </a>
          </div>
          <router-link
          to="/admin/products"
          class="text-white mb-0 align-self-end d-none d-md-inline-block">
            © 2020 LOGO All Rights Reserved.
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      cart: [],
      coupon: {},
      isLoading: false,
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
.navbar-nav .nav-link:hover {
  color: #17a2b8;
}

.navbar-toggler {
  color: rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.1);
}

.cartLink {
  position: fixed;
  right: 2%;
  bottom: 9%;
  border: 1px solid #17a2b8;
  background-color: #fff;
  transition: 0.5s;
  &:hover {
    background-color: #17a2b8;
    color: #ffffff;
  }
}

.cartNum {
  position: absolute;
  right: 0;
  top: 0;
}

.footer__navbar {
  border-bottom: 1px solid #fff;
}

.main {
  min-height: calc(100vh - 287px);
}
.footer {
  height: 181px;
}
</style>
