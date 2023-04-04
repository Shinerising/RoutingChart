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
  <header class="header-section">
    车次选择
  </header>
  <div>
    <ListView :header="list.header" :data="list.data"/>
  </div>
</template>

<style lang="scss" scoped>
</style>
