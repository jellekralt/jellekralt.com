<template>
  <div>
    <link-dump v-bind:links="links"/>
  </div>
</template>

<script>
import { parse, format } from 'date-fns';
import About from '~/components/About.vue';
import LinkDump from '~/components/LinkDump.vue';

export default {
  components: {
    About,
    LinkDump
  },
  data () {
    return { links: [] };
  },
  async asyncData ({ app, params, error, $axios }) {
    let url = '/api/links';

    if (params.tag) {
      url += `?tag=${params.tag}`;
    }

    try {
      let data = await $axios.$get(url);

      return {
        links: data.map(link => {
          link.dateFormatted = format(parse(link.time), 'MMM Do YYYY');

          return link;
        })
      };
    } catch (e) {
      return error({ statusCode: 404, message: 'Links not found' });
    }
  },
  head () {
    return {
      title: 'Jelle Kralt'
    };
  }
};
</script>