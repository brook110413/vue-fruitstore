<template>
  <div class="complete">
    <div class="container">
      <div class="row">
        <div class="col d-flex flex-column justify-content-center">
          <h2 class="mb-3">付款完成，感謝您的支持</h2>
          <router-link to="/products" class="btn btn-primary w-25">繼續購物</router-link>
        </div>
        <div class="col">
          <div class="completeBanner bg-cover"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
  .completeBanner {
    background-image: url(../../../public/images/completeBanner.jpg);
    height: 90vh;
    margin-bottom: -48px;
  }
</style>
