<script setup lang="ts">
const props = defineProps<{
  device: {
    name: string;
    type:
      | "section"
      | "switch"
      | "switch_reverse"
      | "switch_backward"
      | "switch_backward_reverse"
      | "retarder"
      | "";
  };
  occupied?: boolean;
}>();

const vectorData = (() => {
  switch (props.device.type) {
    case "section":
      return "M0 12l48 0";
    case "switch":
      return "M0 12l48 0M16 12l16 -12";
    case "switch_reverse":
      return "M0 12l48 0M16 12l16 12";
    case "switch_backward":
      return "M0 12l48 0M32 12l-16 -12";
    case "switch_backward_reverse":
      return "M0 12l48 0M32 12l-16 12";
    case "retarder":
      return "M1 9l0 6l46 0l0 -6Z";
    default:
      return "";
  }
})();
</script>

<template>
  <div class="vector" :class="{ occupied: !!props.occupied }">
    <svg
      preserveAspectRatio="xMidYMid meet"
      height="24"
      viewBox="0 0 48 24"
      width="48"
    >
      <path
        v-if="props.device.type !== ''"
        stroke-width="1"
        :stroke="props.occupied ? 'red' : 'black'"
        d="M-100 12l248 0"
      />
      <path
        stroke-width="1"
        fill="white"
        :stroke="props.occupied ? 'red' : 'black'"
        :d="vectorData"
      />
    </svg>
    <span :class="props.device.type">{{ props.device.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.vector {
  position: relative;
  width: 100%;
  height: 100%;
  clip-path: border-box;
  svg {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .line {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    transform: scale(1, calc(1 / 24));
  }
  span {
    display: block;
    position: absolute;
    text-align: center;
    font-size: 0.8rem;
    left: 0;
    right: 0;
    bottom: 0.2em;
  }
  span.switch_reverse {
    bottom: 2em;
  }
  span.switch_backward_reverse {
    bottom: 2em;
  }
  span.retarder {
    bottom: 0em;
  }
}
</style>
