<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: pages.current_page === item }"
        v-for="(item, key) in pages.total_pages"
        :key="key"
      >
        <a class="page-link" href="#" @click.prevent="changePage(item)"> {{ item }} </a>
      </li>
      <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Object,
    },
  },
  methods: {
    changePage(page) {
      this.$emit('update', page);
    },
  },
};
</script>
