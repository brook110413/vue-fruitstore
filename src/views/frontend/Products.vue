<template>
  <div class="products pt-4">
    <loading :active.sync="isLoading"></loading>
    <div class="container" v-if="products[0]">
      <div class="d-sm-flex justify-content-sm-end mb-3">
        <div class="d-lg-flex align-items-lg-center d-none mr-3">
          <p class="mb-0">顯示方式：</p>
          <input type="radio" id="standard" value="standard" v-model="display" class="mr-1" />
          <label for="standard" class="mb-0 mr-2">標準</label>
          <input type="radio" id="list" value="list" v-model="display" class="mr-1" />
          <label for="list" class="mb-0">序列</label>
        </div>
        <div class="form-group mb-0">
          <select
            name="sort"
            id="sort"
            v-model="sort"
            class="form-control"
            @change="sortProducts()"
          >
            <option value="" disabled>商品排序</option>
            <option value="lowToHigh">價格由低至高</option>
            <option value="highToLow">價格由高至低</option>
          </select>
        </div>
      </div>
      <div class="row" v-if="display === 'standard'">
        <div class="col-lg-3 col-md-6 mb-5" v-for="item in filterProducts" :key="item.id">
          <router-link :to="`/product/${item.id}`" class="text-decoration-none text-dark">
            <div class="card">
              <div class="product__wrap">
                <div
                  class="product__wrap__img bg-cover position-relative"
                  style="height: 200px"
                  :style="{ backgroundImage: `url(${item.imageUrl[0]})` }"
                >
                  <a
                    href="#"
                    class="btn favorite"
                    @click.prevent="removefavorite(item)"
                    v-if="favoriteId.includes(item.id)"
                  >
                    <i class="fas fa-heart fa-lg text-white"></i>
                  </a>
                  <a href="#" class="btn favorite" @click.prevent="addfavorite(item)" v-else>
                    <i class="far fa-heart fa-lg text-white"></i>
                  </a>
                  <span class="moreInfo">看更多內容</span>
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
      <table class="table" v-if="display === 'list'">
        <thead>
          <tr>
            <th scope="col">品名</th>
            <th scope="col" class="text-center d-none d-sm-table-cell">單位</th>
            <th scope="col" class="text-right">原價</th>
            <th scope="col" class="text-right">網路價</th>
            <th scope="col" class="text-center">加入購物車</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filterProducts" :key="item.id">
            <th class="align-middle" scope="row">
              <router-link :to="`/product/${item.id}`">
                <img
                  :src="item.imageUrl[0]"
                  class="img-fluid mr-3 d-none d-md-inline-block"
                  width="200px"
                />
              </router-link>
              {{ item.title }}
            </th>
            <td class="align-middle text-center">
              {{ item.unit }}
            </td>
            <td class="align-middle text-right">
              <del>{{ item.origin_price | money }}</del>
            </td>
            <td class="align-middle text-right">
              {{ item.price | money }}
            </td>
            <td class="align-middle text-center">
              <button type="button" class="btn btn-primary" @click.prevent="addToCart(item.id)">
                <i class="fas fa-cart-plus mr-1"></i>加入購物車
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
      sort: '',
      favoriteList: [],
      favoriteId: [],
      display: 'standard',
    };
  },
  created() {
    this.$emit('changeCategory', this.$route.params.category);
    this.getProducts();
    this.favoriteList = JSON.parse(localStorage.getItem('favoriteList')) || [];
    this.favoriteId = JSON.parse(localStorage.getItem('favoriteId')) || [];
  },
  props: ['category'],
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
    sortProducts() {
      this.filterProducts.sort((a, b) => {
        if (this.sort === 'lowToHigh') {
          return a.price - b.price;
        }
        if (this.sort === 'highToLow') {
          return b.price - a.price;
        }
        return this.filterProducts;
      });
    },
    addfavorite(item) {
      this.favoriteList.push(item);
      this.favoriteId.push(item.id);
      this.favoriteList = [...new Set(this.favoriteList)];
      this.favoriteId = [...new Set(this.favoriteId)];
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
      localStorage.setItem('favoriteId', JSON.stringify(this.favoriteId));
      swal({
        title: '加入追蹤商品',
        text: '已加入追蹤商品當中',
        icon: 'success',
        buttons: false,
        timer: 1000,
      });
    },
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
  },
  computed: {
    filterProducts() {
      if (this.category === '所有商品') {
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

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: all 0.5s;
  &:hover {
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    .moreInfo {
      opacity: 1;
    }
  }
}

.product__wrap {
  overflow: hidden;
}

.product__wrap__img {
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.04);
    @media (max-width: 992px) {
      transform: none;
    }
  }
}

.favorite {
  position: absolute;
  right: 0;
}

.moreInfo {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #C75200;
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
