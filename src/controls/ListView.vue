<script setup lang="ts">
import { ref } from "vue";
type propTypes<
  P extends Array<{ id: string }> = Array<{
    id: string;
    name: string;
    width: number;
  }>
> = {
  header: P;
  data: {
    [key in P[number]["id"]]: string | number;
  }[];
};
const props = defineProps<propTypes>();
const selectList = ref<boolean[]>(props.data.map(() => false));

const row_select = (item: unknown, idx: number) => {
  selectList.value = selectList.value.map((_, i) => i === idx);
};

row_select(props.data[0], 0);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in props.header" :key="col.id" :width="col.width">
          {{ col.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in props.data"
        :key="i"
        :class="selectList[i] ? 'selected' : ''"
        @click="row_select(item, i)"
      >
        <td v-for="col in header" :key="col.id" :width="col.width">
          {{ item[col.id] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  margin: 1rem 0;
  width: 100%;
}

th {
  background-color: var(--color-background-soft);
}

td {
  cursor: pointer;
  background-color: var(--color-background);
}

table,
th,
td {
  position: relative;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--color-border);
  border-collapse: collapse;
}
table {
  font-size: 0.9rem;
  border-radius: 0.5rem;
  border-style: hidden;
  box-shadow: 0 0 0 1px var(--color-border);
}
th:first-of-type {
  border-top-left-radius: 0.5rem;
}
th:last-of-type {
  border-top-right-radius: 0.5rem;
}
tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 0.5rem;
}
tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 0.5rem;
}
tr.selected td {
  background-color: #1e88e5;
  color: white;
}
</style>
