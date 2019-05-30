<template>
  <div>
    <section class="link-list">
      <h1 class="link-list__title"><a href="/blog" class="link-list__title-link">Interesting Links</a></h1>
      <ul class="link-list__items">
        <li class="link-list__item" v-for="link in links" v-bind:key="link.href">
          <div class="link-list__item-meta">
            <time datetime="2017-01-01T00:01:00" itemprop="datePublished" v-html="$options.filters.dateSuperscript(link.dateFormatted)"></time>
          </div>
          <span><a class="link-list__item-link" :href="link.href" target="_blank" rel="noopener">{{ link.description }}</a></span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      'links': {
        type: Array,
        required: true
      }
    },
    head () {
      return {
        title: 'Jelle Kralt'
      };
    }
  };
</script>

<style lang="scss" scoped>
.link-latest {
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

.link-list {
  
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
