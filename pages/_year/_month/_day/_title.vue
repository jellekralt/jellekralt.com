<template>
  <blog-post :post="post"/>
</template>

<script>
import { isValid, parse, format } from 'date-fns';
import BlogPost from '~/components/BlogPost.vue';

export default {
  components: {
    BlogPost
  },
  validate ({ params }) {
    let date = parse(`${params.year}-${params.month}-${params.day}T00:00:00Z`);

    return isValid(date);
  },
  async asyncData ({ params, error, $axios }) {
    try {
      let data = await $axios.$get(`/api/blog/${params.year}/${params.month}/${params.day}/${params.title}`);

      data.dateFormatted = format(parse(data.date), 'MMM Do YYYY');

      if (data.meta && data.meta.tags && typeof data.meta.tags === 'string') {
        data.meta.tags = data.meta.tags.split(',').map(tag => tag.trim());
      }

      return {
        post: data
      };
    } catch (e) {
      console.error(e.message);
      return error({ statusCode: 404, message: 'Post not found' });
    }
  },
  head () {
    return {
      title: `${this.post ? this.post.title || '' : ''} · Jelle Kralt`
    };
  }
};
</script>