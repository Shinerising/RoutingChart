<script setup lang="ts">
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts";

const legend = [{
  name: '轨道',
  list: [
    {
      name: '占用',
      color: 'red'
    }, {
      name: '出清',
      color: 'yellow'
    }
  ]
}, {
  name: '手动',
  list: [
    {
      name: '手动',
      color: 'red'
    }, {
      name: '自动',
      color: 'yellow'
    }
  ]
}, {
  name: '命令',
  list: [
    {
      name: '双台缓解',
      color: 'lightgreen'
    }, {
      name: '前台制动',
      color: 'lightpink'
    }, {
      name: '后台制动',
      color: 'pink'
    }, {
      name: '双台制动',
      color: 'red'
    }
  ]
}, {
  name: '表示',
  list: [
    {
      name: '缓表',
      color: 'yellow'
    }, {
      name: '制表',
      color: 'red'
    }, {
      name: '双有',
      color: 'blue'
    }, {
      name: '双无',
      color: 'lightgrey'
    }
  ]
}];
const brief = [
  "三部位减速器控制信息（J307）",
  "进入时间：2023-02-15 14:50:45",
  "离开时间：2023-02-15 14:51:10",
  "定速：4.5",
  "入口速度：18.3",
  "出口速度：5.5",
  "放头量：0",
  "辆数：0",
  "测长：0",
];

const actions = legend.map(item => item.name);
const actionList = [[{
  time: 0,
  action: 0,
}, {
  time: 22,
  action: 0,
}], [{
  time: 0,
  action: 1,
}, {
  time: 22,
  action: 1,
}], [{
  time: 0,
  action: 0,
}, {
  time: 0.2,
  action: 1,
}, {
  time: 4,
  action: 3,
}, {
  time: 15,
  action: 2,
}, {
  time: 15.4,
  action: 3,
}, {
  time: 18,
  action: 2,
}, {
  time: 22,
  action: 0,
}], [{
  time: 0,
  action: 3,
}, {
  time: 22,
  action: 3,
}]];
const actionData: [number, number, number][] = [];
actionList.forEach((action, i) => {
  let idx = 0;
  let time = 0;
  while (idx < action.length) {
    if (time > action[idx].time) {
      idx++;
    } else {
      actionData.push([time, i, action[idx].action]);
      time += 0.02;
    }
  }
});
const speedData = [
  [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
  [19, 18.9, 18.8, 17.6, 14.5, 13, 10, 8.5, 8, 7, 5.5, 5.3],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
];
const chartOption = {
  grid: [{ left: '46', right: '14', top: '14', bottom: '60%' }, { left: '46', right: '14', top: '40%', bottom: '26' }],
  tooltip: [{
    trigger: "axis",
    axisPointer: {
      axis: "x",
    },
  }],
  xAxis: [
    {
      type: "time",
      min: 0,
      max: (value) => {
        return Math.max(value.max, 30);
      },
      splitLine: {
        show: true,
      },
      minorSplitLine: {
        show: true,
      },
      maxInterval: 2,
      axisLabel: {
        show: false,
        formatter: (value: unknown) => (value as number).toFixed(0),
      },
      gridIndex: 0
    }, {
      type: "time",
      min: 0,
      max: (value) => {
        return Math.max(value.max, 30);
      },
      splitLine: {
        show: true,
      },
      minorSplitLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      maxInterval: 2,
      axisLabel: {
        formatter: (value: unknown) => (value as number).toFixed(0),
      },
      gridIndex: 1
    }],
  yAxis: [
    {
      name: "",
      type: 'category',
      data: actions,
      inverse: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
      },
      gridIndex: 0,
    },
    {
      name: "",
      type: "value",
      min: 0,
      max: (value) => {
        return Math.max(value.max, 30);
      },
      axisLabel: {
        showMaxLabel: false,
        formatter: (value: number) => value.toFixed(0),
      },
      splitLine: {
        show: true,
      },
      gridIndex: 1
    },
  ],
  dataset: {
    dimensions: [
      { name: "time", type: "time" },
      { name: "realSpeed", type: "float" },
      { name: "targetSpeed", type: "float" }
    ],
    source: speedData,
  },
  series: [
    {
      name: '动作',
      type: 'scatter',
      symbol: "rect",
      symbolSize: [2, 8],
      symbolOffset: [1, 0],
      itemStyle: {
        color: (params: unknown) => {
          const [x, y, value] = (params as { value: [number, number, number] }).value;
          return legend[y].list[value].color;
        }
      },
      data: actionData,
    },
    {
      type: "line",
      name: "测速",
      encode: {
        x: "time",
        y: "realSpeed",
      },
      seriesLayoutBy: "row",
      showSymbol: false,
      smooth: true,
      sampling: "average",
      xAxisIndex: 1,
      yAxisIndex: 1
    },
    {
      type: "line",
      name: "定速",
      encode: {
        x: "time",
        y: "targetSpeed",
      },
      seriesLayoutBy: "row",
      showSymbol: false,
      smooth: true,
      sampling: "average",
      xAxisIndex: 1,
      yAxisIndex: 1
    },
  ],
} satisfies EChartsOption;

</script>

<template>
  <div class="main">
    <div class="sheet">
      <div class="brief">
        <ul>
          <li v-for="(item, i) in brief" :key="i">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="chart">
        <v-chart class="chart" :option="chartOption" autoresize />
      </div>
    </div>
    <footer>
      <div class="controls">
        <button><i class="icon-previous">前进</i></button>
        <button><i class="icon-next">后退</i></button>
        &nbsp;
        <button>查看原始事件</button>
      </div>
      <div class="legend">
        <ul class="group">
          <li v-for="(item, i) in legend" :key="i">
            <label>{{ item.name }}</label>
            <ul class="action">
              <li v-for="(_item, j) in item.list" :key="j">
                <label>{{ _item.name }}</label>
                <span :style="{ backgroundColor: _item.color }"></span>
              </li>
            </ul>
            <ul class="action" v-if="item.list.length > 2">
              <li v-for="(_item, j) in item.list.slice(2)" :key="j">
                <label>{{ _item.name }}</label>
                <span :style="{ backgroundColor: _item.color }"></span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sheet {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: .5rem .5rem 0 0;
  display: flex;
  flex-direction: row;

  .brief {
    flex: 1;
    min-width: 14rem;
    padding: .5rem 0;
    border-right: 1px solid #ccc;

    ul {
      li {
        margin: .3rem 1rem;
      }
    }
  }

  .chart {
    flex: 4;
    height: 100%;
  }
}

footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #F8F8F8;
  border: 1px solid #ccc;
  border-top: 0;
  border-radius: 0 0 .5rem .5rem;

  .controls {
    flex: 1;
    padding: .25rem;

    button {
      margin: .25rem;
    }
  }

  .legend {
    overflow: hidden;
    font-size: .9rem;

    ul,
    li {
      display: flex;
      flex-direction: row;
    }

    .group {
      li {
        margin-left: 1rem;
        align-items: center;
      }

      label {
        font-weight: bold;
        color: red;
      }

      label::after {
        content: '：';
      }
    }

    .action {
      flex-direction: column;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-content: flex-start;
      align-items: start;
      justify-content: center;
      max-height: 3rem;
      margin-right: 1rem;

      li {
        margin-left: 0;
        align-items: center;
        justify-content: center;
      }

      label {
        font-weight: normal;
        color: black;
        margin: 0 .4rem;
      }

      span {
        display: block;
        width: 3.2rem;
        height: .4rem;
      }
    }
  }
}

</style>
