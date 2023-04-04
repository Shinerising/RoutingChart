<script setup lang="ts">
import { ref } from 'vue'
import ListView from '../controls/ListView.vue';

const list = ref({
  header: [{
    id: 'id',
    name: '序号',
    width: 100
  }, {
    id: 'name',
    name: '车次',
    width: 200
  }, {
    id: 'type',
    name: '类型',
    width: 100
  }],
  data: [{
    id: 1,
    name: '3663',
    type: '解体'
  }, {
    id: 2,
    name: '126',
    type: '解体'
  }, {
    id: 3,
    name: '2264',
    type: '解体'
  }, {
    id: 4,
    name: '864',
    type: '解体'
  }]
})
</script>

<template>
  <div class="selector">
    <header class="header-section">
      车次选择
    </header>
    <div class="list">
      <ListView :header="list.header" :data="list.data" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selector {
  display: flex;
  flex-direction: column;
  height: 100%;

  .list {
    position: relative;
    flex: 1;
    overflow: auto;
    padding: 0 .5rem;
    margin: 0 -.5rem;
  }
}
</style>
