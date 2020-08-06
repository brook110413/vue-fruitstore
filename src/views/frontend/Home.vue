<template>
  <div class="home">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <nav class="navbar navbar-expand-sm fixed-top bg-white shadow">
        <div class="container">
          <a class="navbar-brand" href="#">小農工坊</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
          class="collapse navbar-collapse justify-content-lg-between" id="navbarNavDropdown">
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
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/admin/products" class="nav-link">後台管理</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <div class="container">
          <div class="row">
            <router-view @updateCart="getCart()"></router-view>
          </div>
        </div>
      </main>
      <router-link to="/cart"
      class="cartLink nav-link rounded-circle d-flex flex-column align-items-center">
        <span class="cartNum badge badge-pill badge-danger">{{cart.length}}</span>
        <font-awesome-icon icon="shopping-cart" size="2x"/>
        購物車
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      cart: [],
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
  },
};
</script>

<style lang="scss" scoped>
  main {
    margin-top: 60px;
  }

  .navbar-brand {
    color: #000000;
  }

  .navbar-nav .nav-link {
    color: #000;
    font-weight: 700;
  }

  .navbar-nav .router-link-exact-active, .navbar-nav .nav-link:hover {
  color: #17a2b8;
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
</style>
