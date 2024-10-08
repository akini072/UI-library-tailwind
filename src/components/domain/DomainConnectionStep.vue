<template>
  <div>
    <div v-if="errorMessage" class="alert__box error mb-4">
      <div>
        <v-icon name="warning" height="28px" />
      </div>
      <span v-html="errorMessage" />
    </div>
    <div class="text--gray-600">
      <p class="mb-2">
        In order to connect your domain “<b>{{ domainName }}</b
        >“ with
        <b>Funnelish</b>
        edit the following DNS settings:
      </p>
      <ul class="mt-4">
        <li class="d-flex">
          <div class="number mr-3">1</div>
          <p>Log in to your domain provider’s website</p>
        </li>
        <li class="d-flex my-3">
          <div class="number mr-3">2</div>
          <p>Change your DNS CNAME record settings to this address</p>
        </li>
        <li class="d-flex">
          <div class="number mr-3">3</div>
          <p>
            When you’re done, come back here and press the
            <b>Verify Changes</b> button
          </p>
        </li>
      </ul>
      <p class="mt-4">
        Depending on which DNS provider you use it might take up to 24 hours for
        your changes to propagate. 
      </p>
      <p class="mt-3">
        It can take <u>up to 5 minutes</u> for Funnelish certification authority
        to generate an SSL certificate for your new domain.
      </p>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    VField: defineAsyncComponent(() => import('@/components/base/VField')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
  },
  props: {
    domainName: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.number {
  width: 24px;
  height: 24px;
  border: 1px solid var(--gray-300);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
