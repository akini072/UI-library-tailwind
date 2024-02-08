<template>
  <router-link class="external-link" target="_blank" :style="{pointerEvents:!href?'none':'auto'}"
     :to="href">
    {{ label }}
    <component :is="LinkIcon"/>
  </router-link>
</template>

<script>
import LinkIcon from "@/assets/img/external_link_icon.svg"

    export default {
      name: "ExternalLink",
      data: function (){
          return {
            LinkIcon
          }
      },
      props: ["label", "href"],
    };
</script>
<style lang="scss">
.external-link {
  position: relative;
  display: flex;
  font-weight: 400;
  font-size: 15px;
  color: #252A32;
  margin: 15px 0;
  >svg {
    margin-left: 10px;
    height: 17px;
    width: 17px;
    path {
      fill: #97AACD;
    }
  }
  &:hover {
    color: #4368E0;
    >svg path {
      fill: #4368E0;
    }
  }
}

</style>
