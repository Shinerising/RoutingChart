<script setup lang="ts">
import { ref } from 'vue'
import ListView from '../controls/ListView.vue';

const list = ref({
  header: [{
    id: 'id',
    name: '勾序',
    width: 100
  }, {
    id: 'type',
    name: '进路类型',
    width: 200
  }],
  data: [{
    id: 1,
    type: '连溜进路'
  }, {
    id: 2,
    type: '连溜进路'
  }, {
    id: 3,
    type: '连溜进路'
  }, {
    id: 4,
    type: '连溜进路'
  }, {
    id: 5,
    type: '连溜进路'
  }, {
    id: 6,
    type: '连溜进路'
  }, {
    id: 7,
    type: '连溜进路'
  }, {
    id: 8,
    type: '连溜进路'
  }]
})
</script>

<template>
  <div class="selector">
    <header class="header-section">
      勾车选择
    </header>
    <div class="list">
      <ListView :header="list.header" :data="list.data"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selector{
  display:flex;
  flex-direction: column;
  height: 100%;
  .list{
    position:relative;
    flex:1;
    overflow:auto;
    padding:0 .5rem;
    margin:0 -.5rem;
  }
}
</style>
