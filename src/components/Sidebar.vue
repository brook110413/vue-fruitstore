<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="sidebar-sticky pt-3">
      <h6
        class="sidebar-heading d-flex justify-content-between
            align-items-center px-3 mt-3 mb-1 text-muted font-weight-bold"
      >
        <span>管理員操作</span>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link font-weight-bold">
            <i class="fas fa-box-open"></i>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orders" class="nav-link font-weight-bold">
            <i class="fas fa-list-alt"></i>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupons" class="nav-link font-weight-bold">
            <i class="fas fa-ticket-alt"></i>
            優惠券列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/storages" class="nav-link font-weight-bold">
            <i class="fas fa-images"></i>
            產品圖片管理
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .router-link-exact-active,
.sidebar .nav-link:hover {
  color: #00796b;
  padding-left: 2rem;
}

.sidebar-heading {
  font-size: 1rem;
}
</style>
