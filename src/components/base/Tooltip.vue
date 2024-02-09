<template>
  <el-tooltip
      effect="customized"
      :content="tooltipText"
      :placement="tooltipPlacement"
      :show-arrow="false"
  >
    <slot></slot>
  </el-tooltip>
</template>

<script>
import { ElTooltip } from 'element-plus';

export default {
  components: {
    ElTooltip
  },
  props: {
    text: {
      type: String,
      required: true
    },
    effect: {
      type: String,
      default: 'dark'
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  computed: {
    tooltipText() {
      return this.text;
    },
    tooltipPlacement() {
      return this.placement;
    },
  }
};
</script>

<style>
.el-popper.is-customized {
  padding: 2px 8px;
  background-color: #404042;
  color: #fff;
}
</style>

<!--transition works but cuts off the content when i change top: 125% to top: -125%-->

<!--<template>-->
<!--  <div :data-tooltip="tooltipName" class="custom-tooltip">-->
<!--    <slot></slot>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  props: {-->
<!--    tooltipName: {-->
<!--      type: String,-->
<!--      required: true-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.custom-tooltip {-->
<!--  position: relative;-->
<!--}-->

<!--.custom-tooltip::after {-->
<!--  position: absolute;-->
<!--  top: 125%;-->
<!--  text-align: center;-->
<!--  box-sizing: border-box;-->
<!--  content: attr(data-tooltip);-->
<!--  color: #fff;-->
<!--  background: black;-->
<!--  z-index: 100;-->
<!--  padding: 0.4rem 0.8rem;-->
<!--  border-radius: 0.5rem;-->
<!--  font-size: 0.9em;-->
<!--  font-weight: 300;-->
<!--  visibility: hidden;-->
<!--  opacity: 0;-->
<!--  transform: translateY(0);-->
<!--  transition: opacity 0.3s, transform 0.5s;-->
<!--}-->

<!--.custom-tooltip:hover::after {-->
<!--  opacity: 1;-->
<!--  visibility: visible;-->
<!--  transform: translateY(3px);-->
<!--}-->
<!--</style>-->
