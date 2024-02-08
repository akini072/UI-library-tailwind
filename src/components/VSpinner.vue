<template>
  <div :class="{'spinner':!dots,'dots-spinner':dots}">
    <svg v-if="dots" x="0px" y="0px" viewBox="0 0 100 100">
      <circle :fill="dotsColor" stroke="none" cx="30" cy="50" r="6">
        <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"/>
      </circle>
      <circle :fill="dotsColor" stroke="none" cx="50" cy="50" r="6">
        <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"/>
      </circle>
      <circle :fill="dotsColor" stroke="none" cx="70" cy="50" r="6">
        <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"/>
      </circle>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg"
         style="margin: auto; background: none; display: block; shape-rendering: auto;"
         width="28px" height="28px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="#4368e0" stroke-width="4" r="34"
              stroke-dasharray="70 25" transform="rotate(73.7169 50 50)">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.6134969325153374s"
                          values="0 50 50;360 50 50" keyTimes="0;1"/>
      </circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'VSpinner',
  props: {
    dots: {
      type:Boolean
    },
    dotsColor:{
      type: String,
      default: "#fff"
    }
  }
}
</script>
<style lang="scss" scoped>
.dots-spinner {
  height: 24px;
  width: 24px;
  display: block;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
