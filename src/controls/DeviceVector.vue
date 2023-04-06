<script setup lang="ts">
const props = defineProps<{device:{name:string, type: 'section' | 'switch' | 'switch_reverse' | 'switch_backward' | 'switch_backward_reverse' | 'retarder' | ''}}>();
</script>

<template>
  <div class="vector">
    <div class="line" v-if="props.device.type"></div>
    <div :class="props.device.type"></div>
    <span :class="props.device.type">{{ props.device.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.vector{
  position:relative;
  width:100%;
  height:100%;
  div{
    position: relative;
    width:100%;
    height:100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .line{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color:#000;
    transform:scale(1, calc(1 / 24));
  }
  div.section{
    background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 48 24" width="48"><path stroke="black" stroke-width="1" d="M0 12l48 0"/></svg>');
  }
  div.switch{
    background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 48 24" width="48"><path stroke="black" stroke-width="1" d="M0 12l48 0M16 12l16 -12"/></svg>');
  }
  div.switch_reverse{
    background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 48 24" width="48"><path stroke="black" stroke-width="1" d="M0 12l48 0M16 12l16 12"/></svg>');
  }
  div.switch_backward{
    background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 48 24" width="48"><path stroke="black" stroke-width="1" d="M0 12l48 0M32 12l-16 -12"/></svg>');
  }
  div.switch_backward_reverse{
    background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 48 24" width="48"><path stroke="black" stroke-width="1" d="M0 12l48 0M32 12l-16 12"/></svg>');
  }
  div.retarder{
    background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 48 24" width="48"><path fill="white" stroke="black" stroke-width="1" d="M1 9l0 6l46 0l0 -6Z"/></svg>');
  }
  span{
    display: block;
    position: absolute;
    text-align: center;
    font-size: .8rem;
    left: 0;
    right: 0;
    bottom: .2em;
  }
  span.switch_reverse{
    bottom: 2em;
  }
  span.switch_backward_reverse{
    bottom: 2em;
  }
  span.retarder{
    bottom: 0em;
  }
}
</style>
