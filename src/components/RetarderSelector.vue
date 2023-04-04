<script setup lang="ts">
import { ref } from 'vue'

const list = ref([{
  id: 1,
  checked: false,
  name: '一部位',
  devices: ['', 'J11', 'J22', 'J33']
}, {
  id: 2,
  checked: false,
  name: '二部位',
  devices: ['', 'J11', 'J22', 'J33']
}, {
  id: 3,
  checked: true,
  name: '三部位',
  devices: ['', 'J11', 'J22', 'J33']
}])
</script>

<template>
  <header class="header-section">
    减速器选择
  </header>
  <div class="retarder-selector">
    <ul>
      <li
        v-for="item in list"
        :key="item.id"
      >
        <input
          :id="item.name"
          type="checkbox"
          :name="item.name"
          :checked="item.checked"
        >
        <label :for="item.name">{{ item.name }}</label>
        <select>
          <option
            v-for="device in item.devices"
            :key="device"
          >
            {{ device }}
          </option>
        </select>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.retarder-selector {
  ul {
    li {
      margin: 1rem 0;
      display: flex;
      align-items: center;

      input {
        flex: none;
        font-size:1rem;
      }

      label {
        flex: none;
        margin: 0 1rem;
      }

      select {
        flex: 1;
        font-size:1rem;
      }
    }
    li:last-child{
      margin-bottom: 0;
    }
  }
}
</style>
