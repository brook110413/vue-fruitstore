<template>
  <div class="complete pt-4">
    <div class="container">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
          <div>
            <h2 class="completeTitle mb-3 h6">付款完成，感謝您的支持</h2>
            <a
              href="#"
              @click.prevent="
                category = '所有商品';
                toProducts();
              "
              class="btn btn-primary "
              >繼續購物</a
            >
          </div>
        </div>
        <div class="col-6">
          <div class="completeBanner bg-cover"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Complete',
  data() {
    return {
      category: '',
    };
  },
  methods: {
    toProducts() {
      this.$emit('fliterProduct', this.category);
      this.$router.push(`/products/${this.category}`);
    },
  },
};
</script>

<style lang="scss" scoped>
$public: '../../../public';

.completeBanner {
  background-image: url($public + '/images/completeBanner.jpg');
  height: 100vh;
  margin-bottom: -16px;
  width: 83.8vh;
  @media (min-width: 1200px) {
    width: 83.8vh;
  }
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
