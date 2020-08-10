<template>
  <div class="confirm">

  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      this.$http.get(api)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>

</style>
