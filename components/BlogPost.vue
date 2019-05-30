<template>
  <article class="article" itemscope itemtype="http://schema.org/BlogPosting">
    <header class="article__header article-header">
      <h1 class="article-header__title" itemprop="name headline" v-if="post.meta.title">{{ post.meta.title }}</h1>
      <div class="article-header__meta">
        <span class="article-header__author" itemprop="author" itemscope itemtype="http://schema.org/Person" v-if="post.meta.author">
          <span itemprop="name">{{ post.meta.author }} </span>
        </span>
        <div class="article-header__date">
          <time datetime="post.date" itemprop="datePublished">{{ post.dateFormatted }}</time>
        </div>
        <span>&nbsp;</span> <!-- TODO: Get rid of these dirty hacks -->
        <div class="article-header__tag" v-if="post.meta.tags && post.meta.tags.length">
          <i class="fa fa-tag"></i>
          <span>&nbsp;</span> <!-- TODO: Get rid of these dirty hacks -->
          <span v-for="(tag, index) in post.meta.tags" v-bind:key="index">
            <a class="tag-link" v-bind:href="`/blog/tags/${tag}`">{{ tag }}</a>
            <span v-if="index !== post.meta.tags.length - 1">, </span>
          </span>
        </div>
      </div>
    </header>
    <div class="article__content content" v-html="post.content"></div>
    <disqus class="content" />
  </article>
</template>

<script>
  import 'highlight.js/styles/vs.css';
  import Disqus from '~/components/Disqus.vue';

  export default {
    components: {
      Disqus
    },
    props: {
      'post': {
        type: Object,
        required: true
      }
    }
  };
</script>

<style lang="scss">
.article {
  &-header {    
    &__title {
      color: $color-accent;
      margin-top: 0;
      margin-bottom: 0;
      text-transform: none;
      font-size: 1.5em;
      line-height: 1.25;
      letter-spacing: .01em;
      margin-top: 0;
      margin-bottom: 0;
    }
    &__meta {
      margin-top: 0;
      margin-bottom: 1rem;
    }
    &__meta * {
      color: $color-light;
      font-size: 0.85rem;
    }
    &__author {
      text-transform: uppercase;
      letter-spacing: 0.01em;
      font-weight: 700;
    }
    &__date {
      display: inline;
      &:before {
        content: "| ";
      }  
    }
    &__tag {
      .tag-link {
        @include link();
        &:before {
          content: "#";
        }
      }

      @media (min-width: 480px) {
        display: inline;
        &:before {
          content: "| ";
        }
      }
    }
  }

  &__content {
    h2:before {
      content: "#";
      color: $color-accent;
      position: absolute;
      left: -1rem;
      top: -4px;
      font-size: 1.2rem;
      font-weight: bold;
    }
    img, video {
      max-width: 100%;
      height: auto;
      display: block;
      margin: auto;
    }
    /* http://webdesignerwall.com/tutorials/css-elastic-videos */;
    .video-container {
      position: relative;
      padding-top: 9 / 16 * 100%;
      height: 0;
      overflow: hidden;
      iframe, object, embed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin-top: 0;
      }
    }
    blockquote {
      background: inherit;;
      color: #ccffb6;
      border-left: 0px solid #ccc;;
      margin: 1rem 10px;;
      padding: 0.5em 10px;;
      quotes: "\201C""\201D""\2018""\2019";
      p {
        margin: 0;
      }
      &:before {
        color: #ccffb6;;
        content: "\201C";;
        font-size: 2em;;
        line-height: 0.1em;;
        margin-right: 0.25em;;
        vertical-align: -0.4em;
      }
      footer {
        color: #666;
        font-size: 11px;
        margin: line-height 0;
        a {
          color: #666;
          background-image: linear-gradient(transparent, transparent 5px, #666 5px, #666);
        }
        a:hover {
          color: #999;
          background-image: linear-gradient(transparent, transparent 4px, #999 4px, #999);
        }
        cite {
          &:before {
            content: "—";
            padding: 0 0.5em;
          }
        }
      }
    }
    .pullquote {
      text-align: left;
      width: 45%;
      margin: 0;
      &.left {
        margin-left: 0.5em;
        margin-right: 1em;
      }
      &.right {
        margin-right: 0.5em;
        margin-left: 1em;
      }
    }
    .caption {
      color: color-grey;
      display: block;
      font-size: 0.9em;
      margin-top: 0.5em;
      position: relative;
      text-align: center;
    }
  }
}
</style>
