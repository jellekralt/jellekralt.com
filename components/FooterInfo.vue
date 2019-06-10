<template>
  <div class="footer-info">
    <section class="footer-info-links">
      <h2 class="footer-info__title">Links</h2>
      <ul class="footer-info-links__list">
        <li class="footer-info-links__list-item"><a class="footer-info-links__link" href="https://github.com/jellekralt">GitHub</a></li>
        <li class="footer-info-links__list-item"><a class="footer-info-links__link" href="https://twitter.com/jellekralt">Twitter</a></li>
        <li class="footer-info-links__list-item"><a class="footer-info-links__link" href="http://nl.linkedin.com/in/jellekralt">LinkedIn</a></li>
        <li class="footer-info-links__list-item"><a class="footer-info-links__link" href="https://keybase.io/jellekralt/">Keybase</a></li>
      </ul>
    </section>
    <section class="footer-info-license">
      <h2 class="footer-info__title">License</h2>
      <p>All content by Jelle Kralt is under <a class="footer-info__link" href="https://creativecommons.org/licenses/by-nc-sa/2.0/nl/deed.en">creative commons</a> and code under <a class="footer-info__link" href="https://jellekralt.mit-license.org/">MIT license</a>.</p>
      <p>All code and content for this blog is available as open source on <a class="footer-info__link" href="https://github.com/jellekralt/jellekralt.com/">GitHub</a>.</p>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .footer-info {
    display: flex;

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

    &__link {
      color: $color-accent !important;
    }
  }

  .footer-info-links,
  .footer-info-license {
    flex: 1 0 50%;
  }

  .footer-info-links {
    &__list {
      list-style: square inside;
      padding-left: 0px;
    }

    &__link {
      @include link();
    }
  }
</style>
