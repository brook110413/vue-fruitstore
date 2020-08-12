<template>
  <div class="products pt-3">
    <loading :active.sync="isLoading"></loading>
    <div class="container" v-if="products[0]">
      <div class="row">
        <div class="col-lg-2 col-md-3">
          <div
            class="list-group flex-row flex-md-column mt-0 mb-3
          sticky-top"
            id="list-tab"
            role="tablist"
          >
            <a
              class="list-group-item list-group-item-action active"
              data-toggle="list"
              href="#list-filter"
              @click="category = 'all'"
              >所有商品</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#list-filter"
              @click="category = '水果'"
              >現摘水果</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#list-filter"
              @click="category = '蔬菜'"
              >當季蔬菜</a
            >
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#list-filter"
              @click="category = '濃縮果汁'"
              >濃縮果汁</a
            >
          </div>
        </div>
        <div class="col-lg-10 col-md-9">
          <div class="tab-content">
            <div class="tab-pane show active" id="list-filter">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 mb-5"
                  v-for="item in filterProducts"
                  :key="item.id"
                >
                  <div class="card">
                    <router-link :to="`/product/${item.id}`">
                      <div
                        class="bg-cover position-relative"
                        style="height: 200px"
                        :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
                      >
                        <span class="more_info">看更多內容</span>
                      </div>
                    </router-link>
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center">
                        <router-link :to="`/product/${item.id}`">
                          <h5 class="card-title text-primary font-weight-bold">{{ item.title }}</h5>
                        </router-link>
                        <span class="badge badge-secondary align-self-start">
                          {{ item.category }}
                        </span>
                      </div>
                      <div class="d-flex justify-content-between">
                        <div>
                          <del class="h6">原價 {{ item.origin_price | money }} 元</del>
                          <p class="h4 text-success font-weight-bold">
                            網路價 {{ item.price | money }} 元
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer bg-white p-0 border-0">
                      <button
                        type="button"
                        class="cartBtn btn btn-block"
                        @click.prevent="addToCart(item.id)"
                      >
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      category: 'all',
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      this.$http.get(api).then((res) => {
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
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
  },
  computed: {
    filterProducts() {
      if (this.category === 'all') {
        return this.products;
      }
      return this.products.filter((item) => item.category === this.category);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  margin-top: 15px;
  top: 72px;
}

.list-group-item {
  @media (max-width: 576px) {
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    font-size: 12px;
  }
  @media (max-width: 375px) {
    font-size: 11px;
  }
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

.cartBtn {
  background-color: #ffb74d;
  color: #ffffff;
  font-weight: bold;
}

.more_info {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ffb74d;
  color: #ffffff;
  padding: 1rem 1rem 0.5rem 1.25rem;
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0% 100%);
  opacity: 0;
  transition: .3s;
  @media (max-width: 768px) {
    opacity: 1;
  }
}
</style>
