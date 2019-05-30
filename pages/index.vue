<template>
  <div>
    <about/>
    <blog-posts v-bind:posts="posts" v-bind:read-more="true" />
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
  async asyncData ({ app, $axios }) {
    let data = await $axios.$get('/api/blog?limit=5');

    return {
      posts: data.map(post => {
        post.dateFormatted = format(parse(post.date), 'MMM Do YYYY');
        post.link = format(parse(post.date), '/YYYY/MM/DD/') + post.slug + '/';

        return post;
      })
    };

  },
  head () {
    return {
      title: 'Jelle Kralt'
    };
  }
};
</script>