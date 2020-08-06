<template>
  <div class="login d-flex justify-content-center align-items-center">
    <loading :active.sync="isLoading"></loading>
    <form @submit.prevent="logIn()">
      <h1 class="text-center">
        請先登入
      </h1>
      <div class="form-group">
        <Validation-provider rules="required|email" v-slot="{ errors, classes }">
          <label for="loginEmail" class="sr-only">Email address</label>
          <input
            type="email"
            name="電子郵件"
            class="form-control"
            :class="classes"
            id="loginEmail"
            aria-describedby="emailHelp"
            placeholder="請輸電子郵件"
            v-model="user.email"
          />
          <span class="text-danger text-left"> {{errors[0]}} </span>
        </Validation-provider>
      </div>
      <div class="form-group">
        <Validation-provider rules="required" v-slot="{ errors, classes }">
          <label for="loginPassword" class="sr-only">Password</label>
          <input
            type="password"
            name="密碼"
            class="form-control"
            :class="classes"
            id="loginPassword"
            placeholder="請輸入密碼"
            required
            v-model="user.password"
          />
          <span class="text-danger text-left"> {{errors[0]}} </span>
        </Validation-provider>
      </div>
      <button type="submit" class="btn btn-primary btn-block">
        登入
      </button>
      <button type="button" class="btn btn-outline-warning btn-block" @click="toFrontEnd()">
        回首頁
      </button>
    </form>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    logIn() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      this.$http.post(api, this.user)
        .then((res) => {
          const { token } = res.data;
          const { expired } = res.data;
          // 將取得的token存入cookie
          document.cookie = `token=${token}; expires=${new Date(
            expired * 1000,
          )};`;
          this.isLoading = false;
          this.$router.push('/admin/products');
        })
        .catch(() => {
          this.isLoading = false;
          swal({
            title: '登入失敗',
            text: '登入失敗，請重新嘗試',
            icon: 'error',
            buttons: false,
            timer: 1000,
          });
        });
    },
    toFrontEnd() {
      this.$router.push('/');
    },
  },
};
</script>

<style>
  .login{
    height: 100vh;
  }
</style>
