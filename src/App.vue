<script setup lang="ts">
import { ref, provide, onBeforeMount, onBeforeUnmount } from "vue";
import { format, setDefaultOptions } from "date-fns";
import { zhCN } from "date-fns/locale";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart, ScatterChart, PictorialBarChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  DatasetComponent,
  MarkLineComponent,
  VisualMapComponent,
} from "echarts/components";
import { THEME_KEY } from "vue-echarts";
import DateSelector from "./components/DateSelector.vue";
import CutSelector from "./components/CutSelector.vue";
import RetarderSelector from "./components/RetarderSelector.vue";
import TrainSelector from "./components/TrainSelector.vue";
import MainChart from "./components/MainChart.vue";
import DeviceChart from "./components/DeviceChart.vue";

setDefaultOptions({ locale: zhCN });

use([
  LineChart,
  ScatterChart,
  PictorialBarChart,
  GridComponent,
  TitleComponent,
  DatasetComponent,
  TooltipComponent,
  MarkLineComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

provide(THEME_KEY, "light");

const refreshPage = () => {
  window.location.reload();
};

const toggleFullscreen = () => {
  const doc = document;
  if (doc.fullscreenElement) {
    doc.exitFullscreen();
  } else {
    doc.documentElement.requestFullscreen();
  }
};

const time = ref(new Date());
let timer = 0;

onBeforeMount(() => {
  timer = setInterval(() => (time.value = new Date()), 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template>
  <header class="global">
    <div class="icon-app">
      <img src="@/assets/images/app.png" alt="app logo" />
    </div>
    <h1>列车溜放进路速度曲线查询界面</h1>
    <span class="version">V0.0.1</span>
    <span class="attension">当前程序仅供演示，请勿用于商业用途！</span>
    <span class="blank"></span>
    <div class="controls-global">
      <button class="button-flat button-refresh" @click="refreshPage" />
      <button class="button-flat button-fullscreen" @click="toggleFullscreen" />
      <button class="button-flat button-close" />
    </div>
  </header>
  <div class="container workarea">
    <aside>
      <section class="selector-date">
        <DateSelector />
      </section>
      <section class="control-data">
        <button>查看原始事件</button>
      </section>
      <section class="selector-train">
        <TrainSelector />
      </section>
      <section class="selector-cut">
        <CutSelector />
      </section>
      <section class="selector-retarder">
        <RetarderSelector />
      </section>
    </aside>
    <main>
      <section class="graph-main">
        <MainChart />
      </section>
      <section class="graph-device">
        <DeviceChart />
      </section>
    </main>
  </div>
  <footer class="global">
    <div class="status-bar">
      <span>准备就绪</span>
      <span>{{ format(time, "yyyy-MM-dd HH:mm:ss") }}</span>
    </div>
    <div class="icon-brand">
      <img src="@/assets/images/crsc.png" alt="brand logo" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
header.global {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1565c0;
  color: white;
  border-bottom: 1px solid #ddd;

  .icon-app {
    margin-left: 1rem;
    width: 1.4rem;
    height: 1.4rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  h1 {
    font-size: 1rem;
    padding: 0.5rem;
    margin: 0 0.2rem;
  }

  .version,
  .attension {
    margin: 0 0.2rem;
  }

  .blank {
    flex: 1;
  }

  .button-refresh {
    margin-left: 0.5rem;
    background-image: var(--icon-refresh);
  }

  .button-fullscreen {
    margin-left: 0.5rem;
    background-image: var(--icon-fullscreen);
  }

  .button-close {
    margin-left: 0.5rem;
    background-image: var(--icon-close);
  }
}

footer.global {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #eceff1;
  border-top: 1px solid #ddd;

  .status-bar {
    flex: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.5rem;

    span {
      flex: 1;
      display: block;
      font-size: 0.9rem;
      padding: 0.3rem 0.5rem;
      border-right: 1px solid #ddd;
      &:first-child {
        flex: 5;
      }
    }
  }

  .icon-brand {
    flex: none;

    img {
      display: block;
      height: 2rem;
    }
  }
}

.workarea {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  aside {
    min-width: 18rem;
    max-width: 24rem;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    background-color: #fafafa;
    border-right: 1px solid #ddd;

    section.selector-train {
      flex: 2;
    }

    section.selector-cut {
      flex: 3;
    }

    section.selector-date {
      flex: none;
    }

    section.control-data {
      flex: none;
      margin: 0 auto;
    }

    section.selector-retarder {
      flex: none;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    flex: 4;
    padding: 0.5rem;
    height: 100%;

    .graph-main {
      flex: 10;
    }

    .graph-device {
      flex: 5;
      max-height: 26rem;
    }
  }
}
</style>
