<template>
  <div>
    <blog-posts v-bind:posts="posts"/>
  </div>
</template>

<script>
import { parse, format } from 'date-fns';
import About from '~/components/About.vue';
import BlogPosts from '~/components/BlogPosts.vue';

export default {
  components: {
    About,
    BlogPosts
  },
  data () {
    return { posts: [] };
  },
  async asyncData ({ app, params, error, $axios }) {
    let url = '/api/blog';

    if (params.tag) {
      url += `?tag=${params.tag}`;
    }

    try {
      let data = await $axios.$get(url);

      return {
        posts: data.map(post => {
          post.dateFormatted = format(parse(post.date), 'MMM Do YYYY');
          post.link = format(parse(post.date), '/YYYY/MM/DD/') + post.slug + '/';

          return post;
        })
      };
    } catch (e) {
      return error({ statusCode: 404, message: 'Posts not found' });
    }
  },
  head () {
    return {
      title: 'Jelle Kralt'
    };
  }
};
</script>