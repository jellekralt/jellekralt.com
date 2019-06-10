<template>
  <header class="header" role="banner">
    <a href="/" class="header__link">
      <div id="logo"><img src="~/assets/img/jk.svg" alt="Logo" /></div>
      <span class="header__title">Jelle Kralt</span>
    </a>
    <nav class="navigation" role="navigation">
      <ul class="navigation__list">      
        <li class="navigation__item" v-for="link in navigation" v-bind:key="link.href">
          <a class="navigation__link" :href="link.href">{{ link.title }}</a>
        </li>
      </ul>
    </nav>
  </header>

</template>

<script>
  export default {
    props: {
      'navigation': {
        type: Array,
        required: false,
        default: () => []
      }
    }
  };
</script>

<style lang="scss" scoped>
.header {
  max-width: 710px;
  width: 100%;
  margin: 0 auto 50px auto;

  @media screen and (max-width: $breakpoint-small) {
    margin: 0 auto 30px auto;
  }

  &__link {
    text-decoration: none;
  }

  &__title {
    text-decoration: none;
    letter-spacing: 0.01em;
    font-size: 24px;
    line-height: 32px;
    font-style: normal;
    font-weight: 700;
    color: $color-text;
    margin-top: 0;
    margin-bottom: 0;
    @include antialias();
  }

  #logo {
    float: left;
    margin-right: 20px;
    width: $logo-width;
    height: $logo-height;
    background-repeat: no-repeat;
    background-size: $logo-width $logo-height;
    border-radius: 5px;
  }
}

.navigation {
  letter-spacing: 0.01em;
  font-size: 13px;
  font-style: normal;
  font-weight: 200;
  color: $color-accent;

  @media screen and (max-width: $breakpoint-small) {
    clear: both;
  }

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    line-height: 15px;

    @media screen and (max-width: $breakpoint-small) {
      padding-top: 30px;
      
      li {
        font-size: 15px;
      }
    }
  }

  &__item {
    display: inline-block;
    vertical-align: middle;
    margin-right: 15px;
    border-right: 1px dotted $color-accent;
    
    &:last-child {
      border-right: 0;
      margin-right: 0;
      a {
        margin-right: 0;
      }
    }

    @media screen and (max-width: $breakpoint-small) {
      border-right: 0;
    }
  }

  &__link {
    @include link();
    margin-right: 15px;
    color: $color-accent;
    background: none;

    &:hover {
      @include underline(5px, $color-accent);
    }

    @media screen and (max-width: $breakpoint-small) {
      padding: 2px 5px;
      margin: 0;
      background-color: white;
      color: black;
    }
  }

  &__switch {
    display: none;

    @media screen and (max-width: $breakpoint-small) {
      display: inline-block;
      position: absolute;
      top: 46px;
      right: 46px;
      background: none;
      border: none;
      color: $color-text;
      cursor: pointer;
      padding: 0;
    }
  }
}
</style>
