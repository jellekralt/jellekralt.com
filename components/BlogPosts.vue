<template>
  <div>
    <section class="post-latest" v-if="posts.length > 0 ">
      <h2 class="post-latest__title">Latest Post: {{ posts[0].title }}</h2>
      <p v-html="posts[0].content.match(/<(p)>(.*?)<\/\1>/)[2]"></p>
      <span>
        <nuxt-link class="post-latest__item-link" :to="{ path: posts[0].link }">Read more...</nuxt-link>
      </span>
    </section>
    <section class="post-list">
      <h2 class="post-list__title">
        <a href="/blog" class="post-list__title-link">More Blogposts</a>
      </h2>
      <ul class="post-list__items">
        <li class="post-list__item" v-for="post in posts" v-bind:key="post.slug">
          <div class="post-list__item-meta">
            <time
              datetime="2017-01-01T00:01:00"
              itemprop="datePublished"
              v-html="$options.filters.dateSuperscript(post.dateFormatted)"
            ></time>
          </div>
          <span>
            <nuxt-link
              class="post-list__item-link"
              :to="{ path: post.link }"
            >{{ post.meta.concept ? '[CONCEPT] ' : '' }}{{ post.title }}</nuxt-link>
          </span>
        </li>
      </ul>
      <span v-if="readMore" class="post-list__read-more">
        <i class="post-list__read-more-icon fa fa-arrow-circle-right"></i>
        <nuxt-link to="/blog" class="post-list__read-more-link">Archive...</nuxt-link>
      </span>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    'posts': {
      type: Array,
      required: true
    }, 
    'read-more': {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.post-latest {
  &__title {
    // TODO: Remove important after .content fix
    letter-spacing: 0.01em !important;
    font-size: 1.5em !important;
    font-style: normal !important;
    font-weight: 700 !important;
    color: $color-accent !important;
    margin-top: 3rem !important;
    margin-bottom: 1rem !important;
    display: block !important;
    @include antialias();
  }

  &__item-link {
    color: $color-accent !important;
  }
}

.post-list {
  &__items {
    padding: 0;
  }

  &__title {
    // TODO: Remove important after .content fix
    letter-spacing: 0.01em !important;
    font-size: 1.5em !important;
    font-style: normal !important;
    font-weight: 700 !important;
    color: $color-accent !important;
    margin-top: 3rem !important;
    margin-bottom: 1rem !important;
    display: block !important;
    @include antialias();
  }

  &__title-link {
    color: inherit;
    text-decoration: none;
    background: none;
  }

  &__item {
    list-style-type: none;
    margin-left: 0;
    margin-bottom: 1rem;

    &-meta {
      display: block;
      font-size: 14px;
      color: #666;
      min-width: 100px;
      margin-right: 16px;
    }

    &-link {
      @include link();
    }
  }

  &__read-more {
    &-link {
      // TODO: Get rid of important
      color: $color-accent !important;
    }

    &-icon {
      margin-right: 10px;
    }
  }

  @media (min-width: 480px) {
    &__item {
      display: flex;
      margin-bottom: 5px;

      &-meta {
        min-width: 110px;
        text-align: left;
      }
    }
  }
}
</style>
