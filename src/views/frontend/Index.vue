<template>
  <div class="index mt-3">
    <div class="banner bg-cover mb-5">
      <div class="container h-100">
        <div class="d-flex flex-column align-items-end justify-content-center h-100">
          <p class="banner__title mb-3">
            保證選用最新鮮的水果、蔬菜，24H內送達
          </p>
          <a
            href="#"
            @click.prevent="
              category = '所有商品';
              toProducts();
            "
            class="btn btn-outline-primary"
            >立即下單</a
          >
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8">
          <h2 class="text-center mb-3 h3 font-weight-bold">小農商品</h2>
          <div class="row mb-3">
            <div class="col-md-4 col-6">
              <div class="productImg d-inline-block">
                <img src="../../../public/images/product1.jpg" class="img-fluid" alt="" />
                <a
                  href="#"
                  @click.prevent="
                    category = '水果';
                    toProducts();
                  "
                >
                  <div class="mask d-flex justify-content-center align-items-center text-center">
                    <h3>
                      Fruits <br />
                      新鮮水果
                    </h3>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-md-8 col-6 d-flex align-items-center">
              <p>
                炎炎夏日，最需要好吃的水果來消暑，選用當季水果，產地直送，無農藥噴灑，健康的首選。
              </p>
            </div>
          </div>
          <div class="row flex-row-reverse mb-3" data-aos="fade-up">
            <div class="col-md-4 col-6">
              <div class="productImg d-inline-block">
                <img src="../../../public/images/product2.jpg" class="img-fluid" alt="" />
                <a
                  href="#"
                  @click.prevent="
                    category = '蔬菜';
                    toProducts();
                  "
                >
                  <div class="mask d-flex justify-content-center align-items-center text-center">
                    <h3>
                      Vegetables <br />
                      當季蔬菜
                    </h3>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-md-8 col-6 d-flex align-items-center">
              <p>
                無農藥使用，選用當季蔬菜，合理的價格，買的安心，吃的放心。
              </p>
            </div>
          </div>
          <div class="row" data-aos="fade-up" data-aos-offset="150">
            <div class="col-md-4 col-6">
              <div class="productImg d-inline-block">
                <img src="../../../public/images/product3.jpg" class="img-fluid" alt="" />
                <a
                  href="#"
                  @click.prevent="
                    category = '濃縮果汁';
                    toProducts();
                  "
                >
                  <div class="mask d-flex justify-content-center align-items-center text-center">
                    <h3>
                      Juice <br />
                      清涼果汁
                    </h3>
                  </div>
                </a>
              </div>
            </div>
            <div class="col-md-8 col-6 d-flex align-items-center">
              <p>
                炎炎夏日，需要清涼的果汁來消暑，絕不添加人工色素，可放心食用。
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-center mb-3 h3 font-weight-bold">熱銷商品</h2>
      <swiper :options="swiperOption">
        <swiper-slide v-for="item in sales" :key="item.id">
          <router-link :to="`/product/${item.id}`" class="text-decoration-none text-dark">
            <div class="card">
              <div class="product__img__wrap">
                <div
                  class="product__img bg-cover"
                  style="height: 200px"
                  :style="{ backgroundImage: `url(${item.img})` }"
                ></div>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="card-title text-primary font-weight-bold">{{ item.title }}</h5>
                  <span class="badge badge-secondary align-self-start">
                    {{ item.category }}
                  </span>
                </div>
                <div class="d-flex justify-content-between">
                  <div>
                    <del class="h6">原價 {{ item.origin_price | money }} 元</del>
                    <p class="h5 font-weight-bold">網路價 {{ item.price | money }} 元</p>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'Index',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      category: '',
      swiperOption: {
        speed: 1200,
        loop: true,
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          992: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
        },
      },
      sales: [
        {
          id: 'qIyfO3swSR4E0NuINLEHRC8294NsHktidJgSE8mqTWqlgOZDzcuagzY33OcOXdex',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/VicSEZlG32nzUg44GLP3sRDrE9BHpJ3muHl9bw7crPAjWzrBUTamELAmFjGERdkamsnrYnPOAAx1Ip9ruo8JgLSRRX2IzNFP4KBvNFqhZeLRbch0kmCPBIMqD0vNVLLD.jpg',
          ],
          title: '帝王柑',
          price: 999,
          origin_price: 1090,
          category: '水果',
        },
        {
          id: '8FmghALYej1MvHBv62BR1QXYl9Ht56QSCEG5JHCU0WCOfGJMwmhtJ0JptA3RlNG0',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/vqlj6BXfxkqfvjWn94cmTbFnpx4elxpsMDP9a4ImfvbImDyYBK1OBSrJJLFp0JRdgFUE9V9EotLjXtM4RnASQMTb3R3EUUpJtBTr1DQiu9cAgIM5Z8pdFCBr6Hqig7hi.jpg',
          ],
          title: '富士蘋果',
          price: 399,
          origin_price: 450,
          category: '水果',
        },
        {
          id: 'T1NWKG3QDMxv89zc11XjDmh3M3f4HL1n4rNZmVZsDDbwDZqGswvcJZhfIHTgtt0O',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/VBjWtdKjvqkQdwlSt4Gj8wlFNAQVJtF7k6H4E25hBBNdIvKVPKv96f3MkLcupltvKqWa4jkfrZNsrpzJN4jaPoNfMyF4Ujrrvpv1s1OC9e9rOJrE6E0YA0MNhOPwVE0N.jpg',
          ],
          title: '豐香草莓',
          price: 454,
          origin_price: 550,
          category: '水果',
        },
        {
          id: 'mFxULTmpbk5MqFFRt2DBXX9OHZIAhbJFIWMfPODyS75SKUmw7WtykwBt6zJKGrty',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/T1MDqqrpQaWlgeQJ4DYTtyuMldafaYp0IyvwOcNwVFvciD1JnL4fyRNLnKM2NsJ6PYQBMRF10L35prvtHi8yYyKNIdA0efRUjE8J4TCS7l509gyQtsoNpzZUMBlKRG0N.jpg',
          ],
          title: '巨峰葡萄',
          price: 666,
          origin_price: 789,
          category: '水果',
        },
        {
          id: 'wvACGisVSB73OPnbTj9utomvsGfcEP4cLiE3oe3ept88wmzuKr8gPWrzQcXGCVU9',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/ts0sZgEJQDF6H1GLncV1DAsJFJzDBu0boQq3rhd3VrDWI6sh7yP66q1Le0VINB8IOevwlHJzZI32qjtc5HIQUPwc4pQCd6VrZiqTx9ry3e5Evoxai9A7bPynE7HariKg.jpg',
          ],
          title: '高山高麗菜',
          price: 390,
          origin_price: 429,
          category: '蔬菜',
        },
        {
          id: 'PQhKfuiL7bWtUzi2zmTPc6VOmExjFfNnGrwjPOVnTKIoUm77OXb7Ygx5ymWWOGHM',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Ux1019LdIFelF0S13tXxxCMtpYAfOSINo5OJ2wU1B4S6c4U92kGd9ENyQm2WwsqzxHsgtySWU1lAuGJRGvuCdDPYkNYdhPZ6XdiVQo0CAMPe9WTquNcUv95KmEZzgnMG.jpg',
          ],
          title: '多汁牛番茄',
          price: 666,
          origin_price: 699,
          category: '蔬菜',
        },
      ],
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
  border: 1px solid #dee2e6;
  padding: 8px;
  border-radius: 4px;
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
  transition: 0.3s;
}

.productImg .mask:hover {
  opacity: 1;
}

.swiper-container {
  padding-bottom: 30px;
}
</style>
