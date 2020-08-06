<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view v-if="checkSuccess"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/Navbar.vue';
import sidebar from '@/components/Sidebar.vue';

export default {
  data() {
    return {
      token: '',
      checkSuccess: false,
      select: '',
    };
  },
  components: {
    navbar,
    sidebar,
  },
  created() {
    this.select = 'products';
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      this.isLoading = true;
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;
      this.$http
        .post(api, {
          api_token: this.token,
        })
        .then(() => {
          this.isLoading = false;
          this.checkSuccess = true;
        })
        .catch(() => {
          this.isLoading = false;
          this.$router.push('/login');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
</style>
