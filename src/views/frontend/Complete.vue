<template>
  <div class="complete">
    <div class="container">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <div>
            <h2 class="completeTitle mb-3 h6">付款完成，感謝您的支持</h2>
            <router-link to="/products" class="btn btn-primary ">繼續購物</router-link>
          </div>
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

.completeTitle {
  @media (min-width: 768px) {
    font-size: 28px;
  }
  @media (min-width: 992px) {
    font-size: 32px;
  }
}
</style>
