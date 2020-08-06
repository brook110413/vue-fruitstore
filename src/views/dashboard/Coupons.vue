<template>
  <div class="coupons">
    <loading :active.sync="isLoading"></loading>
    <div class="mt-3 text-right">
      <button
        type="button"
        class="btn btn-primary font-weight-bold"
        data-toggle="modal"
        data-target="#couponModal"
        @click="submit = 'add';couponTemp = {};due_date = '';due_time = ''"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table table-striped mt-3">
      <thead>
        <tr class="thead-dark">
          <th scope="col">優惠碼</th>
          <th scope="col">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col" class="text-center">是否啟用</th>
          <th scope="col" class="text-center">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <th scope="row">{{ item.code }}</th>
          <td>{{ item.percent }} %</td>
          <td>{{ item.deadline.datetime }}</td>
          <td class="text-success text-center font-weight-bold" v-if="item.enabled">啟用</td>
          <td class="text-secondary text-center" v-else>不啟用</td>
          <td class="text-center">
            <button
            type="button"
            class="btn btn-outline-primary btn-sm mr-2"
            data-toggle="modal"
            data-target="#couponModal"
            @click="submit = 'edit';getCouponTemp(item)">
              <font-awesome-icon icon="edit" />
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-toggle="modal"
              data-target="#delCouponModal"
              @click="getCouponTemp(item)"
            >
              <font-awesome-icon icon="trash-alt" />
            </button>
          </td>
        </tr>
      </tbody>

      <!-- Modal -->
      <!-- 新增編輯modal -->
      <div
        class="modal fade"
        id="couponModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 class="modal-title text-white" id="exampleModalLabel">建立優惠券</h5>
              <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancel()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="title">名稱</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入名稱"
                  v-model="couponTemp.title"
                  required
                />
              </div>
              <div class="form-group">
                <label for="code">優惠碼</label>
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  placeholder="請輸入優惠碼"
                  v-model="couponTemp.code"
                  required
                />
              </div>
              <div class="form-group">
                <label for="due_date">到期日</label>
                <input id="due_date" v-model="due_date" type="date" class="form-control" required />
              </div>
              <div class="form-group">
                <label for="due_time">到期時間</label>
                <input
                id="due_time"
                v-model="due_time"
                step="1"
                type="time"
                class="form-control"
                required />
              </div>
              <div class="form-group">
                <label for="discount_percent">折扣百分比</label>
                <input
                  id="discount_percent"
                  v-model.number="couponTemp.percent"
                  placeholder="請輸入折扣百分比"
                  type="number"
                  class="form-control"
                  required
                />
              </div>
              <div class="form-group form-check">
                <input
                  id="enabled"
                  v-model="couponTemp.enabled"
                  type="checkbox"
                  class="form-check-input"
                />
                <label class="form-check-label" for="enabled">是否啟用</label>
              </div>
            </div>
            <div class="modal-footer">
              <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="cancel()">取消</button>
              <button type="button" class="btn btn-primary" @click="updateCoupon()">確認</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 刪除modal -->
      <div
        class="modal fade"
        id="delCouponModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header bg-danger">
              <h5 class="modal-title text-white" id="exampleModalLabel">刪除優惠券</h5>
              <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cancel()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="h4">
                是否刪除
                <span class="text-danger font-weight-bold">{{ couponTemp.title }}</span>
                優惠券(刪除後將無法回復)
              </p>
            </div>
            <div class="modal-footer">
              <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="cancel()">取消</button>
              <button type="button" class="btn btn-danger" @click="delCoupon()">確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </table>

    <pagination :pages="pagination" @update="getCoupons()"></pagination>
  </div>
</template>

<script>
import $ from 'jquery';
import pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      coupons: [],
      couponTemp: {},
      due_date: '',
      due_time: '',
      pagination: {},
      isLoading: false,
      submit: '',
    };
  },
  components: {
    pagination,
  },
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}`;
      this.$http.get(api).then((res) => {
        this.coupons = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
      });
    },
    getCouponTemp(item) {
      this.couponTemp = { ...item };
      // 使用 split 切割相關時間戳
      const deadlineAt = this.couponTemp.deadline.datetime.split(' ');
      [this.due_date, this.due_time] = deadlineAt;
      // this.due_date = deadlineAt;
      // 下列程式碼使用會出現紅字
      // this.due_date = [...deadlineAt];
      // this.due_time = deadlineAt[1];
    },
    updateCoupon() {
      this.isLoading = true;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let method = 'post';
      if (this.submit === 'edit') {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.couponTemp.id}`;
        method = 'patch';
      }

      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.couponTemp.deadline_at = `${this.due_date} ${this.due_time}`;

      this.$http[method](api, this.couponTemp)
        .then(() => {
          this.isLoading = false;
          this.getCoupons();
          $('#couponModal').modal('hide');
        });
    },
    delCoupon() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.couponTemp.id}`;
      this.$http.delete(api).then(() => {
        this.isLoading = false;
        this.getCoupons();
        $('#delCouponModal').modal('hide');
      });
    },
    cancel() {
      this.couponTemp = {};
    },
  },
};
</script>
