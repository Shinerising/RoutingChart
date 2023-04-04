<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(Date.now());
</script>

<template>
  <div class="date-selector">
    <label>
      查询日期：
    </label>
    <VueDatePicker
      v-model="date"
      locale="zh"
      format="yyyy-MM-dd"
      placeholder="请选择查询日期"
      :auto-apply="true"
      :enable-time-picker="false"
    />
  </div>
</template>

<style lang="scss" scoped>
.date-selector{
  display: flex;
  align-items: center;
  label{
    flex:none;
  }
}
</style>
