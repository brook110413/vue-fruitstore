<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <router-link to="/" class="brand navbar-brand col-md-3 col-lg-2 mr-0 px-3">Nutrition</router-link>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="navbar-nav px-3 d-flex">
      <!-- <li class="nav-item text-nowrap">
        <router-link to="/" class="nav-link">回到前台</router-link>
      </li> -->
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click.prevent="singOut()">登出</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    singOut() {
      document.cookie = 'token=; expires=;';
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.brand {
  font-family: Monoton;
}

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}
</style>
