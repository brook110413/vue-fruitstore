<template>
  <div class="index mt-3">
    <div class="banner bg-cover mb-5">
      <div class="container h-100">
        <div class="d-flex flex-column align-items-end justify-content-center h-100">
          <p class="banner__title mb-3">
            保證選用最新鮮的水果、蔬菜，24H內送達
          </p>
          <router-link to="/products" class="btn btn-outline-primary">立即下單</router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <h2 class="text-center">小農商品</h2>
          <ul class="list-unstyled mb-0">
            <li class="d-flex align-items-center mb-3">
              <div class="productImg d-inline-block mr-3">
                <img src="../../../public/images/product1.jpg" class="img-fluid" alt="" />
                <router-link to="/products">
                  <div class="mask d-flex justify-content-center align-items-center text-center">
                    <h3>
                      Fruits <br />
                      新鮮水果
                    </h3>
                  </div>
                </router-link>
              </div>
              <p>炎炎夏日，最需要好吃的水果來消暑，選用當季水果，產地直送，無農藥噴傻，健康的首選</p>
            </li>
            <li class="d-flex flex-row-reverse align-items-center mb-3" data-aos="fade-up">
              <div class="productImg d-inline-block ml-3">
                <img src="../../../public/images/product2.jpg" class="img-fluid" alt="" />
                <router-link to="/products">
                  <div class="mask d-flex justify-content-center align-items-center text-center">
                    <h3>
                      Vegetables <br />
                      當季蔬菜
                    </h3>
                  </div>
                </router-link>
              </div>
              <p>無農藥使用，選用當季蔬菜，合理的價格，買的安心，吃的放心</p>
            </li>
            <li class="d-flex align-items-center" data-aos="fade-up" data-aos-offset="150">
              <div class="productImg d-inline-block mr-3">
                <img src="../../../public/images/product3.jpg" class="img-fluid" alt="" />
                <router-link to="/products">
                  <div class="mask d-flex justify-content-center align-items-center text-center">
                    <h3>
                      Juice <br />
                      清涼果汁
                    </h3>
                  </div>
                </router-link>
              </div>
              <p>炎炎夏日，需要清涼的果汁來消暑，濃縮果汁，絕不添加色素，可放心食用</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.banner {
  background-image: url(../../../public/images/banner.jpg);
  height: 60vh;
  &__title {
    @media (min-width: 576px) {
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 28px;
    }
  }
}

.productImg {
  position: relative;
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(101, 101, 101, 0.6);
  color: #ffffff;
  opacity: 0;
  transition: 0.5s;
}

.productImg .mask:hover {
  opacity: 1;
}
</style>
