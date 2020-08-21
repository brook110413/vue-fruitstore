<template>
  <div
    class="modal fade"
    id="delProductModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <loading :active.sync="isLoading"></loading>
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="exampleModalLabel">刪除商品</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="h4">
            是否刪除
            <span class="text-danger font-weight-bold">{{ productTemp.title }}</span>
            商品(刪除後將無法回復)
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  props: {
    productTemp: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  methods: {
    delProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.productTemp.id}`;
      this.$http.delete(url).then(() => {
        this.$emit('update');
        $('#delProductModal').modal('hide');
        this.isLoading = false;
      });
    },
  },
};
</script>
