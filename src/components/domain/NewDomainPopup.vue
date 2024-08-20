<template>
  <v-popup title="Connect new domain" width="810px" style="z-index: 100">
    <template v-slot:body>
      <div class="px-5 py-4 border-b steps-header__layout">
        <div
          v-for="({ name, done, description, id }, index) in steps"
          :key="index"
        >
          <div
            v-if="name"
            :class="{
              'text--primary': id === currentStep.id || done,
            }"
          >
            <b>{{ name }}</b>
            <p class="text--gray-600">{{ description }}</p>
          </div>
          <v-icon
            v-else
            name="form_steps_icon_step"
            height="20px"
            :color="
              steps[index - 1].done ? 'var(--primary-500)' : 'var(--gray-300)'
            "
          />
        </div>
      </div>
      <div v-if="currentStep.id === 3">
        <div class="ma-5 d-flex align-center flex-column">
          <v-icon
            name="check-circle"
            color="var(--success-600)"
            height="40px"
          />
          <h5 class="font-weight-bold text--gray-600 mt-3">Congratulations!</h5>
          <p class="text--gray-600 mt-1">
            Your domain connection has been verified
          </p>
        </div>
        <div class="d-flex border-t justify-end py-3 px-5">
          <v-button
            class="ml-3"
            label="Complete setup"
            color="primary"
            @click="closePopup"
          />
        </div>
      </div>
      <component
        v-else
        :is="currentStep.component"
        :error-message="errorMessage"
        :loading="loading"
        :domain-name="domain"
        @verify:domain="verifyDomain"
        @validate:domain="validateDomain"
        @cancel="closePopup"
        @back="backStep"
      />
    </template>
  </v-popup>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VPopup: defineAsyncComponent(() => import('@/components/base/VPopup')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
    DomainNameStep: defineAsyncComponent(() => import('./DomainNameStep.vue')),
    DomainConnectionStep: defineAsyncComponent(() =>
      import('./DomainConnectionStep.vue'),
    ),
  },
  data() {
    return {
      errorMessage: '',
      loading: false,
      domain: '',
      steps: [],
      currentStep: {},
    }
  },
  methods: {
    resetData() {
      this.steps = [
        {
          id: 1,
          name: 'Domain Information',
          description: 'Enter your domain name',
          done: false,
          component: 'DomainNameStep',
        },
        '',
        {
          id: 2,
          name: 'Domain Connection',
          description: 'Start connect to your domain',
          done: false,
          component: 'DomainConnectionStep',
        },
        '',
        {
          id: 3,
          name: 'Complete Setup',
          description: 'Domain ready to use',
          done: false,
        },
      ]
      this.domain = ''
      this.currentStep = this.steps[0]
    },
    async verifyDomain() {
      this.errorMessage = ''
      this.loading = true

      new Promise((resolve, reject) => {
        this.$emit('verify:domain', this.domain, resolve, reject)
      })
        .then(() => this.nextStep())
        .catch((error) => {
          this.errorMessage = error?.response?.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    async validateDomain(domain) {
      this.domain = domain
      this.errorMessage = ''
      this.loading = true

      new Promise((resolve, reject) => {
        this.$emit('validate:domain', this.domain, resolve, reject)
      })
        .then(() => this.nextStep())
        .catch((error) => {
          this.errorMessage = error?.response?.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    nextStep() {
      const steps = this.steps
      const index = steps.findIndex(({ id }) => id === this.currentStep.id)

      steps[index].done = true

      this.steps = steps
      this.currentStep = steps.find(({ id }) => id === this.currentStep.id + 1)
    },
    backStep() {
      const steps = this.steps
      const index = steps.findIndex(({ id }) => id === this.currentStep.id)

      steps[index].done = false

      this.steps = steps
      this.currentStep = steps.find(({ id }) => id === this.currentStep.id - 1)
    },
    closePopup() {
      this.$emit('close')
      this.resetData()
    },
  },
  mounted() {
    this.resetData()
  },
}
</script>

<style lang="scss" scoped>
.steps-header__layout {
  display: grid;
  grid-template-columns: 1fr 16px 1fr 16px 1fr;
  grid-gap: 32px;
  align-items: center;
}
</style>
