<template>
  <section class="about content">
    <h1 class="about__title">Hi there, and welcome to my blog!</h1>
    <p>
      Hi there, welcome to my personal little spot on the web. My name is Jelle Kralt and I do fun stuff with (emerging) technology at KLM Royal Dutch Airlines.
    </p>
    <p class="about__social">
      <span>Find me on </span>
      <span><a class="about__social-icon icon" target="_blank" rel="noopener" href="https://github.com/jellekralt" title="Github"><i class="fa fa-github"><span>Github</span></i></a></span>,
      <span><a class="about__social-icon icon" target="_blank" rel="noopener" href="https://twitter.com/jellekralt" title="Twitter"><i class="fa fa-twitter"><span>Twitter</span></i></a></span>,
      <span><a class="about__social-icon icon" target="_blank" rel="noopener" href="http://nl.linkedin.com/in/jellekralt" title="LinkedIn"><i class="fa fa-linkedin"><span>LinkedIn</span></i></a></span>,
      and 
      <span><a class="about__social-icon icon" target="_blank" rel="noopener" href="https://keybase.io/jellekralt/" title="Keybase"><i class="fa fa-key"><span>Keybase</span></i></a></span>
    </p>
  </section>
</template>

<style lang="scss" scoped>
.about {
  p {
    text-align: left;
    hyphens: none;
  }

  &__title {
     // TODO: Remove important after .content fix
    letter-spacing: 0.01em !important;
    font-size: 1.1em !important;
    font-style: normal !important;
    font-weight: 700 !important;
    color: $color-text !important;
    margin-top: 0rem !important;
    margin-bottom: 0rem !important;
    display: block !important;
    @include antialias();
  }

  &__social-icon {
    font-size: $font-size * 1.5;
    padding-left: 3px;

    i span {
      visibility: hidden;
      font-size: 0;
    }
  }
}
</style>
