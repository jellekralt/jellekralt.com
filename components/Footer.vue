<template>
  <footer 
    class="footer" 
    role="contentinfo">
    <div class="footer__block-left">
      Copyright &copy; {{ year }} Jelle Kralt
    </div>
    <nav class="footer__block-right naviation" role="navigation">
      <ul class="navigation__list">
        <li class="navigation__item" v-for="link in navigation" v-bind:key="link.href">
          <a class="navigation__link" :href="link.href">{{ link.title.toLowerCase() }}</a>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  props: {
    'navigation': {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data: () => ({
    year: new Date().getUTCFullYear()
  })
};
</script>

<style lang="scss" scoped>
  .footer {
    padding: 30px 0 0;
    color: #666;
    font-size: 11px;
    max-width: 700px;
    width: 100%;
    margin: 0 auto 18px auto;
    vertical-align: top;
    text-align: center;

    &__block-left {
      height: 20px;
      line-height: 20px;
      vertical-align: middle;
    }

    @media (min-width: $breakpoint-small) {
      &__block-left {
        float: left;
      }
      &__block-right {
        float: right;
      }
    }
  }

  .navigation {
    &__list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__item {
      display: inline-block;
      vertical-align: middle;
      margin-right: 15px;
      border-right: 1px solid #4a4a4a;

      &:last-child {
        border-right: 0;
        margin-right: 0;
        a {
          margin-right: 0;
        }
      }
    }

    &__link {
      margin-right: 15px;
      @include link();
    }
  }
</style>
