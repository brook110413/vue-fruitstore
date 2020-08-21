<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white" id="exampleModalLabel">商品內容</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="cancel()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4">
              <div class="form-group" v-for="i in 5" :key="i + 'img'">
                <label :for="'img' + i">輸入圖片網址</label>
                <input
                  type="text"
                  :id="'img' + i"
                  placeholder="請輸入圖片連結"
                  class="form-control"
                  v-model="productTemp.imageUrl[i - 1]"
                />
              </div>
              <div class="form-group">
                <label for="imgFile">或 上傳圖片</label>
                <input type="file" id="imgFile" class="form-control" @change="uploadFile" />
              </div>
              <img :src="productTemp.imageUrl[0]" alt="" class="img-fluid" />
            </div>
            <div class="col-8">
              <div class="form-group">
                <Validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="title">商品名稱</label>
                  <input
                    type="text"
                    name="產品名稱"
                    id="title"
                    placeholder="請輸入商品名稱"
                    class="form-control"
                    :class="classes"
                    v-model="productTemp.title"
                  />
                  <span class="text-danger"> {{ errors[0] }} </span>
                </Validation-provider>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <Validation-provider rules="required" v-slot="{ errors, classes }">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      name="分類"
                      id="category"
                      placeholder="請輸入商品分類"
                      class="form-control"
                      :class="classes"
                      v-model="productTemp.category"
                    />
                    <span class="text-danger"> {{ errors[0] }} </span>
                  </Validation-provider>
                </div>
                <div class="form-group col">
                  <label for="unit">單位</label>
                  <input
                    type="text"
                    id="unit"
                    placeholder="請輸入商品單位"
                    class="form-control"
                    v-model="productTemp.unit"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col">
                  <label for="origin_price">原價</label>
                  <input
                    type="number"
                    id="origin_price"
                    placeholder="請輸入商品原價"
                    class="form-control"
                    v-model.number="productTemp.origin_price"
                  />
                </div>
                <div class="form-group col">
                  <label for="price">售價</label>
                  <input
                    type="number"
                    id="price"
                    placeholder="請輸入商品售價"
                    class="form-control"
                    v-model.number="productTemp.price"
                  />
                </div>
              </div>
              <div class="form-group">
                <Validation-provider rules="required" v-slot="{ errors, classes }">
                  <label for="content">商品敘述</label>
                  <textarea
                    id="content"
                    cols="30"
                    rows="2"
                    name="商品敘述"
                    placeholder="請輸入商品敘述"
                    class="form-control"
                    :class="classes"
                    v-model="productTemp.content"
                  >
                  </textarea>
                  <span class="text-danger"> {{ errors[0] }} </span>
                </Validation-provider>
              </div>
              <div class="form-group">
                <label for="description">商品說明</label>
                <vue-editor id="description" v-model="productTemp.description"></vue-editor>
              </div>
              <input type="checkbox" id="enabled" v-model="productTemp.enabled" />
              <label for="enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
            @click="cancel"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import swal from 'sweetalert';

export default {
  data() {
    return {
      productTemp: {
        imageUrl: [],
      },
      isLoading: false,
    };
  },
  props: {
    user: {
      type: Object,
    },
    submit: {
      type: String,
    },
  },
  methods: {
    getProduct(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;
      this.$http.get(url).then((res) => {
        this.isLoading = false;
        this.productTemp = res.data.data;
        $('#productModal').modal('show');
      });
    },
    updateProduct() {
      this.isLoading = true;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
      let method = 'post';
      if (this.submit === 'edit') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.productTemp.id}`;
        method = 'patch';
      }
      this.$http[method](api, this.productTemp).then(() => {
        this.isLoading = false;
        this.productTemp = {
          imageUrl: [],
        };
        this.$emit('update');
        $('#productModal').modal('hide');
      });
    },
    uploadFile() {
      // 選取DOM
      const uploadedFile = document.querySelector('#imgFile').files[0];
      // 轉成formData
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      this.isLoading = true;
      this.$http
        .post(url, formData, {
          // 以formDat的形式傳送
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.isLoading = false;
          this.productTemp.imageUrl.push(res.data.data.path);
          swal({
            title: '圖片上傳成功',
            icon: 'success',
            buttons: false,
            timer: 1000,
          });
          document.querySelector('#imgFile').value = '';
        })
        .catch(() => {
          swal({
            title: '圖片大小超過2MB',
            icon: 'error',
            buttons: false,
            timer: 1000,
          });
          this.isLoading = false;
        });
    },
    cancel() {
      this.productTemp = {
        imageUrl: [],
      };
      document.querySelector('#imgFile').value = '';
    },
  },
};
</script>
