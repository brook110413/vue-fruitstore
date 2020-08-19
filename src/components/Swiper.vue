<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="item in relatedProducts" :key="item.id">
      <router-link
        :to="`/product/${item.id}`"
        @click.native="toProduct()"
        class="text-decoration-none text-dark"
      >
        <div class="card">
          <div class="product__img__wrap">
            <div
              class="product__img bg-cover"
              style="height: 200px"
              :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
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
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['relatedProducts'],
  data() {
    return {
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
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
        },
      },
    };
  },
  methods: {
    toProduct() {
      this.$emit('toProduct');
    },
  },
};
</script>
