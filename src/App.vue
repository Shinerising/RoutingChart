<script setup lang="ts">
import DateSelector from "./components/DateSelector.vue";
import CutSelector from "./components/CutSelector.vue";
import RetarderSelector from "./components/RetarderSelector.vue";
import TrainSelector from "./components/TrainSelector.vue";
import DeviceChart from "./components/DeviceChart.vue";

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

</script>

<template>
  <header class="global">
    <h1>列车溜放进路速度曲线查询界面</h1>
    <div class="controls-global">
      <button class="button-flat button-refresh" @click="refreshPage"/>
      <button class="button-flat button-fullscreen" @click="toggleFullscreen"/>
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
        <div>进路控制过程</div>
      </section>
      <section class="graph-device">
        <DeviceChart/>
      </section>
    </main>
  </div>
  <footer class="global">
    <div class="status-bar">
      <span>准备就绪</span>
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
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--color-background-soft);

  h1 {
    font-size: 1rem;
    padding: 0.5rem;
    margin-left: 0.5rem;
  }
  .button-refresh{
    margin-left:.5rem;
    background-image: var(--icon-refresh);
  }
  .button-fullscreen{
    margin-left:.5rem;
    background-image: var(--icon-fullscreen);
  }
  .button-close{
    margin-left:.5rem;
    background-image: var(--icon-close);
  }
}

footer.global {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background-soft);

  .status-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 0.5rem;
    span {
      display: block;
      font-size: .9rem;
      padding: 0.3rem 0.5rem;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    background-color: #fafafa;

    section {
      flex: 1;
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
    flex: 1;
    padding: 0.5rem;
    height: 100%;

    .graph-main {
      flex:2;
    }

    .graph-device{
      flex:1;
      max-height:40rem;
    }
  }
}
</style>
