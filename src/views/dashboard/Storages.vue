<template>
  <div class="storages mt-3">
    <loading :active.sync="isLoading"></loading>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">圖片縮圖</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in storages" :key="item.id">
          <th scope="row">
            <img :src="item.path" class="img-fluid" width="100px">
          </th>
          <td class="align-middle">
            <button
            type="button"
            class="btn btn-outline-danger"
            data-toggle="modal"
            data-target="#delStorageModal"
            @click="getStorageTemp(item)">
              <font-awesome-icon icon="trash-alt" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @update="getStorages()"></pagination>

    <!-- 刪除modal -->
    <div
      class="modal fade"
      id="delStorageModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white" id="exampleModalLabel">刪除圖片</h5>
            <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="h6">
              是否刪除該筆資料(刪除後無法恢復)
            </p>
          </div>
          <div class="modal-footer">
            <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
            >取消</button>
            <button type="button" class="btn btn-danger" @click="delstorage()">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      storages: [],
      storageTemp: {},
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    pagination,
  },
  created() {
    this.getStorages();
  },
  methods: {
    getStorages() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      this.$http.get(api)
        .then((res) => {
          this.storages = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        });
    },
    getStorageTemp(item) {
      this.storageTemp = { ...item };
    },
    delstorage() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage/${this.storageTemp.id}`;
      this.$http.delete(api)
        .then(() => {
          this.isLoading = false;
          this.getStorages();
          $('#delStorageModal').modal('hide');
        });
    },
  },
};
</script>
