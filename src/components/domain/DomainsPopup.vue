<template>
  <v-popup title="Your domain names" width="740px">
    <template v-slot:body>
      <loading v-if="loading" />
      <div v-else class="pa-5">
        <div class="domains__box">
          <div
            v-for="domain in domains"
            :key="domain.id"
            class="domain__item border-b"
          >
            <p class="text--gray-500">
              {{ domain.name }}
            </p>
            <i v-if="domain.generated" class="text--gray-400">
              [your default domain]
            </i>
            <v-button
              v-else
              color="red"
              variant="text"
              size="medium"
              icon
              @click="setDomainToDelete(domain)"
            >
              <v-icon name="trash" height="16px" />
            </v-button>
          </div>
          <v-button
            class="new-domain__button"
            label="Connect new domain"
            color="primary"
            block
            @click="$emit('show:new-domain')"
          />
        </div>
      </div>
      <teleport to="body">
        <confirmation-popup
          v-if="showDelete"
          :loading="loadingDelete"
          confirm-button="Disconnect domain"
          title="Are you sure you want to disconnect this domain name?"
          :content="domainToDelete.name"
          @confirm="confirmDelete"
          @cancel="showDelete = false"
        />
      </teleport>
    </template>
    <template v-slot:actions>
      <v-button
        label="Cancel"
        @click="closePopup"
      />
    </template>
  </v-popup>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    VPopup: defineAsyncComponent(() => import('@/components/base/VPopup')),
    Loading: defineAsyncComponent(() => import('@/components/base/Loading')),
    VButton: defineAsyncComponent(() => import('@/components/base/VButton')),
    ConfirmationPopup: defineAsyncComponent(() =>
      import('@/components/base/ConfirmationPopup'),
    ),
    VIcon: defineAsyncComponent(() => import('@/components/base/VIcon')),
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    domains: {
      type: Array,
    }
  },
  data() {
    return {
      showDelete: false,
      loadingDelete: false,
      domainToDelete: {},
    }
  },
  methods: {
    setDomainToDelete(domain) {
      this.domainToDelete = domain
      this.showDelete = true
    },
    async confirmDelete() {
      this.loadingDelete = true
      new Promise((resolve, reject) => {
        this.$emit('delete:domain', this.domainToDelete, resolve, reject)
      })
        .then(() => (this.showDelete = false))
        .catch((error) => {
          this.$error(error)
        })
        .finally(() => {
          this.loadingDelete = false
          this.domainToDelete = {}
        })
    },
    closePopup() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.domains__box {
  border: 1px solid var(--primary-500);
  border-radius: 6px;

  .domain__item {
    border-radius: inherit;
    padding: 4px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;

    &:hover {
      background-color: var(--gray-50);
    }
  }
  .new-domain__button {
    border: none;
    border-radius: 0 0 4px 4px;
  }
}
</style>
