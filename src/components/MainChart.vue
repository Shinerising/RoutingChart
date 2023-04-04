<script setup lang="ts">
import { ref } from 'vue'
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts";
import DeviceVector from '../controls/DeviceVector.vue';

const legend = [{
      name: '占用',
      color: 'red'
    }, {
      name: '出清',
      color: 'blue'
    }, {
      name: '控岔',
      color: 'orange'
    }, {
      name: '锁闭',
      color: 'yellow'
    }, {
      name: '解锁',
      color: 'cyan'
    }, {
      name: '开放',
      color: 'green'
    }, {
      name: '关闭',
      color: 'darkred'
    }, {
      name: '入口速度',
      color: 'lightgreen'
    },{
      name: '出口速度',
      color: 'skyblue'
    }];

const deviceList:{name:string, type: 'section' | 'switch' | 'switch_reverse' | 'retarder' | ''}[] = [
  {name: '03G', type: 'section'},
  {name: '602', type: 'switch_reverse'},
  {name: '608', type: 'switch_reverse'},
  {name: 'J11', type: 'retarder'},
  {name: '610', type: 'switch_reverse'},
  {name: 'J22', type: 'retarder'},
  {name: '624', type: 'switch_reverse'},
  {name: '626', type: 'switch'},
  {name: '7G', type: 'section'},
  {name: 'SQ7', type: 'section'},
  {name: 'J307', type: 'retarder'},
  {name: '7', type: 'section'},
  {name:'', type: ''}
];

const xAxis = deviceList.map(item => item.name);
const speedInData = [0, 14.33, 0, 18.99, 11.34, 10.99, 19.13, 14.35, 16.81, 0, 18.3, 0, 0];
const speedOutData = [0, 14.28, 0, 14.20, 10.28, 8.28, 16.48, 10.99, 16.77, 0, 5.5, 0, 0];
const timeInData = [0, 12, 0, 17, 20, 23, 26, 27, 30, 0, 46, 0, 0];
const timeOutData = [0, 14, 0, 20, 23, 26, 30, 35, 44, 0, 70, 0, 0];

const timeInGraphData = timeInData.reduce(
  (acc, cur, idx) => {
    if (cur) {
      acc.push([idx + 1, cur]);
    }
    return acc;
  },
  [[0,0]] as [number, number][]
);
const timeOutGraphData = timeOutData.reduce(
  (acc, cur, idx) => {
    if (cur) {
      acc.push([idx + 1, cur]);
    }
    return acc;
  },
  [[0,0]] as [number, number][]
);
const speedInGraphData = speedInData.reduce(
  (acc, cur, idx) => {
    if (cur) {
      acc.push([idx, cur]);
    }
    return acc;
  },
  [] as [number, number][]
);
const speedOutGraphData = speedOutData.reduce(
  (acc, cur, idx) => {
    if (cur) {
      acc.push([idx, cur]);
    }
    return acc;
  },
  [] as [number, number][]
);

const chartOption = {
    grid:{
      left: 84,
      right: 0,
      top: 0,
      bottom: 0
    },
    xAxis: [{
      type: "category",
      splitLine: {
        show: true,
      },
      minorSplitLine: {
        show: true,
      },
      data: xAxis
    },
    {
      type: "value",
      min: 0,
      max: xAxis.length,
      splitLine: {
        show: false,
      },
      minorSplitLine: {
        show: false,
      }
    }],
    yAxis: [
      {
        name: "速度",
        type: "value",
        max: 20,
        min: 0,
        axisLabel: {
          showMaxLabel: false,
          showMinLabel: false,
          formatter: (value: number) => value.toFixed(1),
        },
      },
      {
        name: "时间",
        type: "value",
        max: 80,
        min: 0,
        maxInterval: 10,
        alignTicks: true,
        axisLabel: {
          showMaxLabel: false,
          showMinLabel: false,
          inside: true,
          formatter: (value: number) => value.toFixed(0),
        },
      },
    ],
    series: [
      {
        type: "pictorialBar",
        name: "出清时间",
        label:{
          show:true,
          position: 'top',
        },
        barCategoryGap: '0%',
        symbol: 'rect',
        symbolPosition: 'end',
        symbolSize: ['100%', 2],
        symbolOffset: [0, '-100%'],
        data: timeOutData.map(item => item ? item : '-'),
        yAxisIndex: 1,
      },
      {
        type: "pictorialBar",
        name: "进入时间",
        label:{
          show:true,
          position: 'insideTop'
        },
        barCategoryGap: '0%',
        symbol: 'rect',
        symbolPosition: 'end',
        symbolSize: ['100%', 2],
        symbolOffset: [0, '-100%'],
        data: timeInData.map(item => item ? item : '-'),
        barGap: '-100%',
        yAxisIndex: 1,
      },
      {
        type: "line",
        name: "入口时间",
        data: timeInGraphData,
        xAxisIndex: 1,
        smooth: true,
        symbol: 'none',
        yAxisIndex: 1,
        endLabel: {
          show: true,
          formatter: () => '入口时间'
        }
      },
      {
        type: "line",
        name: "出清时间",
        data: timeOutGraphData,
        xAxisIndex: 1,
        smooth: true,
        symbol: 'none',
        yAxisIndex: 1,
        endLabel: {
          show: true,
          formatter: () => '出清时间'
        }
      },
      {
        type: "line",
        name: "入口速度",
        data: speedInGraphData,
        xAxisIndex: 1,
        smooth: true,
        symbol: 'none',
        endLabel: {
          show: true,
          formatter: () => '入口速度'
        }
      },
      {
        type: "line",
        name: "出口速度",
        data: speedOutGraphData,
        xAxisIndex: 1,
        smooth: true,
        symbol: 'none',
        endLabel: {
          show: true,
          formatter: () => '出口速度'
        }
      },
    ],
  } satisfies EChartsOption;
</script>

<template>
  <div class="main">
    <div class="sheet">
      <div class="chart-container">
        <div class="chart">
          <div class="chart-row vchart">
            <v-chart class="chart" :option="chartOption" autoresize />
          </div>
          <div class="chart-row slope-design">
            <div class="row-label">设计坡度
            </div>
          </div>
          <div class="chart-row slope-caculate">
            <div class="row-label">折算坡度
            </div>
          </div>
          <div class="chart-row distance">
            <div class="row-label">百米标
            </div>
          </div>
          <div class="chart-row device">
            <div class="row-label">平面
            </div>
            <div class="row-content">
              <ul>
                <li v-for="(item, i) in deviceList" :key="i">
                  <DeviceVector :device="item" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="controls">
        <button><i class="icon-previous">前进</i></button>
        <button><i class="icon-next">后退</i></button>
      </div>
      <div class="legend">
        <ul class="group">
          <li v-for="(item, i) in legend" :key="i">
            <label :style="{ color: item.color }">{{ item.name }}</label>
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

  .chart-container {
    height: 100%;
    padding: 1rem;
    .chart{
      height: 100%;
    }
  }
}
.chart{
    display:flex;
    flex-direction: column;
  .chart-row{
    display:flex;
    flex-direction: row;
    align-items: center;
    border:1px solid #EEE;
    border-top:none;
    .row-label{
      width: 6rem;
      padding: 0 .5rem;
      text-align: right;
    }
    .row-content{
      flex:1;
      border-left:1px solid #EEE;
      height:3rem;
      ul{
        display:flex;
        flex-direction: row;
        height: 100%;
        li{
          flex:1;
        }
      }
    }
  }
  .chart-row.vchart{
    flex:1;
    border-top:1px solid #EEE;
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
    flex: none;
    padding: .25rem;

    button {
      margin: .25rem;
    }
  }

  .legend {
    overflow: hidden;
    margin-left: 1rem;
    flex: 1;
    font-size: .9rem;

    ul {
      display: flex;
      flex-direction: row;
        align-items: center;
    }

    .group {
      li {
        margin-right: 1rem;
      }

      label {
        font-weight: bold;
        color: red;
      }

      label::before {
        content: '';
        width: 1.2em;
        height: 1.2em;
        margin-right: .5rem;
        border-radius: .3rem;
        vertical-align: text-top;
        display:inline-block;
        background: currentColor;
      }
    }
  }
}

</style>
