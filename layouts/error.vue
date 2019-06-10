<template>
  <div class="content index width mx-auto px2 my4">
    <page-header/>
    <div>
      <h1 class="title">
        {{ error.statusCode }}
      </h1>
      <h2 class="info">
        {{ error.message }}
      </h2>
      <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
        Homepage
      </nuxt-link>
    </div>
    <page-footer/>
  </div>
</template>

<script>
import PageFooter from '~/components/Footer.vue';
import PageHeader from '~/components/Header.vue';

export default {
  components: {
    PageFooter,
    PageHeader
  },
  props: {
    'error': {
      type: Object,
      required: true
    }
  }
};
</script>