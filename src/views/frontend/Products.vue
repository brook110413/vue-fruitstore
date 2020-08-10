<template>
  <div class="products pt-3">
    <loading :active.sync="isLoading"></loading>
    <div class="container" v-if="products[0]">
      <div class="row">
        <div class="col-2">
          <div class="sticky-top" style="top:72px">
            <div class="list-group mt-0" id="list-tab" role="tablist">
              <a
                class="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#list-all"
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
        </div>
        <div class="col-10">
          <div class="tab-content">
            <div
              class="tab-pane show active"
              id="list-all"
            >
              <div class="row">
                <div class="col-4 mb-5" v-for="item in products" :key="item.id" v-cloak>
                  <div class="card">
                    <router-link :to="`/product/${item.id}`">
                      <div
                        class="bg-cover"
                        style="height: 200px"
                        :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
                      ></div>
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
                        <button
                          type="button"
                          class="cartBtn btn rounded-circle"
                          @click.prevent="addToCart(item.id)"
                        >
                          <font-awesome-icon icon="shopping-cart" size="2x" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane"
              id="list-filter"
            >
              <div class="row">
                <div class="col-4 mt-3 mb-5" v-for="item in filterProducts" :key="item.id" v-cloak>
                  <div class="card">
                    <router-link :to="`/product/${item.id}`">
                      <div
                        class="bg-cover"
                        style="height: 200px"
                        :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
                      ></div>
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
                        <button
                          type="button"
                          class="cartBtn btn rounded-circle"
                          @click.prevent="addToCart(item.id)"
                        >
                          <font-awesome-icon icon="shopping-cart" size="2x" />
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
  </div>
</template>

<script>
import swal from 'sweetalert';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      category: '',
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
      return this.products.filter((item) => item.category === this.category);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  margin-top: 15px;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.5s;
  &:hover {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  }
}

.cartBtn {
  background-color: #ffffff;
  color: #ffb74d;
  border: 1px solid #ffb74d;
  transition: 0.5s;
  &:hover {
    background-color: #ffb74d;
    color: #ffffff;
  }
}
</style>
