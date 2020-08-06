<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <h2>這是產品詳細頁面</h2>
    <img :src="product.imageUrl" alt="" class="img-fluid" style="width:300px"><br>
    {{product.title}} <br>
    {{product.description}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  created() {
    // 取得路由的值
    const { id } = this.$route.params;
    this.isLoading = true;
    const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
    this.$http.get(api)
      .then((res) => {
        this.product = res.data.data;
        this.isLoading = false;
      });
  },
};
</script>
