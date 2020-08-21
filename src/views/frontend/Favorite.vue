<template>
  <div class="favorite pt-4">
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="d-flex justify-content-center" v-if="!favoriteList[0]">
        <div>
          <h2 class="favorite__title mb-3 h5">暫時無追蹤商品，請添加商品</h2>
          <a
            href="#"
            @click.prevent="
              category = '所有商品';
              toProducts();
            "
            class="text-dark"
          >
            <i class="fas fa-angle-left mr-2"></i>去逛逛</a
          >
        </div>
      </div>
      <div v-else>
        <div class="favoriteTitle d-flex justify-content-between align-items-center mb-4 pb-3">
          <h2 class="h3 mb-0 font-weight-bold">我的追蹤清單</h2>
          <p class="mb-0 h4 font-weight-bold">
            共 <span class="text-danger"> {{ favoriteList.length }} </span> 項
          </p>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-5" v-for="item in favoriteList" :key="item.id">
            <router-link :to="`/product/${item.id}`" class="text-decoration-none text-dark">
              <div class="card">
                <div class="product__img__wrap">
                  <div
                    class="product__img bg-cover position-relative"
                    style="height: 200px"
                    :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
                  >
                    <a
                      href="#"
                      class="btn favoriteIcon"
                      @click.prevent="removefavorite(item)"
                      v-if="favoriteId.includes(item.id)"
                    >
                      <i class="fas fa-heart fa-lg text-white"></i>
                    </a>
                    <a href="#" class="btn favoriteIcon" @click.prevent="addfavorite(item)" v-else>
                      <i class="far fa-heart fa-lg text-white"></i>
                    </a>
                    <span class="more_info">看更多內容</span>
                  </div>
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
                <div class="card-footer bg-white p-0 border-0">
                  <button
                    type="button"
                    class="btn btn-primary btn-block font-weight-bold"
                    style="border-top-left-radius:0;border-top-right-radius:0"
                    @click.prevent="addToCart(item.id)"
                  >
                    <i class="fas fa-cart-plus mr-1"></i>
                    加入購物車
                  </button>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: 'Favorite',
  data() {
    return {
      favoriteList: [],
      favoriteId: [],
      isLoading: false,
      category: '',
    };
  },
  created() {
    this.favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    this.favoriteId = JSON.parse(localStorage.getItem('favoriteId')) || [];
  },
  methods: {
    removefavorite(item) {
      this.favoriteList.forEach((i, index) => {
        if (i.id === item.id) {
          this.favoriteList.splice(index, 1);
          localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
        }
      });
      this.favoriteId.forEach((i, index) => {
        if (i === item.id) {
          this.favoriteId.splice(index, 1);
          localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId));
        }
      });
      swal({
        title: '取消追蹤商品',
        text: '已取消追蹤商品',
        icon: 'info',
        buttons: false,
        timer: 1000,
      });
    },
    addToCart(id, quantity = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity,
      };
      this.$http
        .post(api, cart)
        .then(() => {
          swal({
            title: '產品添加成功',
            text: '請至購物車結帳',
            icon: 'success',
            buttons: false,
            timer: 1000,
          });
          this.$emit('updateCart');
          this.isLoading = false;
        })
        .catch(() => {
          swal({
            title: '商品重複',
            text: '商品已放入購物車當中',
            icon: 'error',
            buttons: false,
            timer: 1000,
          });
          this.isLoading = false;
        });
    },
    toProducts() {
      this.$emit('fliterProduct', this.category);
      this.$router.push(`/products/${this.category}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.favorite__title {
  @media (min-width: 768px) {
    font-size: 32px;
  }
}

.favoriteTitle {
  border-bottom: 1px solid #000000;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.5s;
  &:hover {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    .more_info {
      opacity: 1;
    }
  }
}

.product__img__wrap {
  overflow: hidden;
}

.product__img {
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.04);
    @media (max-width: 992px) {
      transform: none;
    }
  }
}

.favoriteIcon {
  position: absolute;
  right: 0;
}

.more_info {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ffb74d;
  color: #ffffff;
  padding: 1rem 1.25rem 0.75rem 1.25rem;
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0% 100%);
  opacity: 0;
  transition: 0.3s;
  @media (max-width: 992px) {
    padding: 1rem 1rem 0.5rem 1.25rem;
    opacity: 1;
  }
}
</style>
