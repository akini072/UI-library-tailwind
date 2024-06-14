<template>
  <div
    ref="target"
    :style="`min-height:${fixedMinHeight ? fixedMinHeight : minHeight}px`"
  >
    <slot v-if="shouldRender" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue"

export default {
  props: {
    unrender: Boolean,
    minHeight: Number,
    unrenderDelay: {
      type: Number,
      default: 10000,
    },
  },
  setup(props) {
    const target = ref(null)
    const shouldRender = ref(false)
    const fixedMinHeight = ref(0)
    let unrenderTimer
    let renderTimer
    let observer

    const stopObserving = () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
    }
    // Callback function for IntersectionObserver
    const onIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // perhaps the user re-scrolled to a component that was set to unrender. In that case stop the unrendering timer
          clearTimeout(unrenderTimer)
          // if we're dealing underndering lets add a waiting period of 200ms before rendering. If a component enters the viewport and also leaves it within 200ms it will not render at all. This saves work and improves performance when user scrolls very fast
          if (props.unrender) {
            renderTimer = setTimeout(
              () => (shouldRender.value = true),
              props.unrender ? 100 : 0
            )
          } else {
            shouldRender.value = true
          }

          if (!props.unrender) {
            stopObserving()
          }
        } else if (props.unrender) {
          // if the component was set to render, cancel that
          clearTimeout(renderTimer)
          unrenderTimer = setTimeout(() => {
            fixedMinHeight.value = target.value?.clientHeight
            shouldRender.value = false
          }, props.unrenderDelay)
        }
      })
    }

    // Create IntersectionObserver when component is mounted
    onMounted(() => {
      observer = new IntersectionObserver(onIntersection, {
        threshold: 0.2, // Configure threshold as needed,
        rootMargin: "600px",
      })
      if (target.value) {
        observer.observe(target.value)
      }

      // Cleanup: Disconnect IntersectionObserver when component is unmounted
      return () => {
        if (target.value) {
          observer.unobserve(target.value)
        }
        observer.disconnect()
      }
    })

    return { target, shouldRender, fixedMinHeight }
  },
}
</script>
