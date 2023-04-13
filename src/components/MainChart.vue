<script setup lang="ts">
import { ref } from "vue";
import { format, addSeconds } from "date-fns";
import VChart from "vue-echarts";
import type { EChartsOption } from "echarts";
import DeviceVector from "../controls/DeviceVector.vue";

const legend = ref<
  {
    name: string;
    color: string;
    hidden?: boolean;
    disabled?: boolean;
  }[]
>([
  {
    name: "占用",
    color: "#D32F2F",
    disabled: true,
  },
  {
    name: "出清",
    color: "#1565C0",
    disabled: true,
  },
  {
    name: "控岔",
    color: "#FF8F00",
    disabled: true,
  },
  {
    name: "锁闭",
    color: "#FBC02D",
    disabled: true,
  },
  {
    name: "解锁",
    color: "#039BE5",
    disabled: true,
  },
  {
    name: "开放",
    color: "#43A047",
    disabled: true,
  },
  {
    name: "关闭",
    color: "#880E4F",
    disabled: true,
  },
  {
    name: "入口时间",
    color: "#00897B",
  },
  {
    name: "出清时间",
    color: "#F4511E",
  },
  {
    name: "入口速度",
    color: "#8BC34A",
  },
  {
    name: "出口速度",
    color: "#2196F3",
  },
]);

const distanceList = [
  ["0", 350],
  ["100", 300],
  ["200", 350],
  ["300", 300],
];
const slopeDesignList = [
  {
    width: 30,
    climb: false,
    value: [30, 45],
    empty: false,
  },
  {
    width: 54,
    climb: false,
    value: [54, 11.2],
    empty: false,
  },
  {
    width: 113,
    climb: false,
    value: [113.5, 9.0],
    empty: false,
  },
  {
    width: 82,
    climb: false,
    value: [82, 2.1],
    empty: false,
  },
  {
    width: 84,
    climb: false,
    value: [84, 1.2],
    empty: false,
  },
];
const slopeCaculateList = [
  {
    width: 30,
    climb: false,
    value: [30, 43.6],
    empty: false,
  },
  {
    width: 54,
    climb: false,
    value: [54, 8.9],
    empty: false,
  },
  {
    width: 113,
    climb: false,
    value: [113.5, 1.7],
    empty: false,
  },
  {
    width: 82,
    climb: true,
    value: [82, -0.7],
    empty: false,
  },
  {
    width: 84,
    climb: true,
    value: [84, -0.5],
    empty: false,
  },
];

const startTime = new Date("2023-02-15 14:49:57");

const deviceList: {
  name: string;
  type:
    | "section"
    | "switch"
    | "switch_reverse"
    | "switch_backward"
    | "switch_backward_reverse"
    | "retarder"
    | "";
}[] = [
  { name: "03G", type: "section" },
  { name: "510", type: "switch_reverse" },
  { name: "512", type: "switch_backward_reverse" },
  { name: "J12", type: "retarder" },
  { name: "520", type: "switch_reverse" },
  { name: "J23", type: "retarder" },
  { name: "550", type: "switch_reverse" },
  { name: "558", type: "switch" },
  { name: "562", type: "switch" },
  { name: "23G", type: "section" },
  { name: "J307", type: "retarder" },
  { name: "7", type: "section" },
  { name: "", type: "" },
];

const xAxis = deviceList.map((item) => item.name);
const occupyData = [-1, 2, -1, -1, 11, -1, 20, 25, -1, -1, -1, -1, -1];
const speedInData = [
  -1, 17.0, -1, 21, 23, 23.2, 18.2, 18.2, 18.7, 20.1, 18.3, -1, -1,
];
const speedOutData = [
  -1, 19.3, -1, 23, 22.1, 19.1, 18.7, 18.8, 18.5, 18.8, 5.5, -1, -1,
];
const timeInData = [
  -1, 0, -1, 10.3, 15.2, 21.5, 24.7, 29.2, 33.7, 38, 61.2, -1, -1,
];
const timeOutData = [
  -1, 4.7, -1, 13.9, 19.1, 26.1, 29.7, 34.1, 40, 54.6, 83.2, -1, -1,
];
const getSpeedLineData = () => {
  const timeTotalData = [...timeInData, ...timeOutData];
  const speedTotalData = [...speedInData, ...speedOutData];
  const deviceTotalData = [
    ...deviceList.map((item) => item.name),
    ...deviceList.map((item) => item.name),
  ];
  return timeTotalData
    .map(
      (item, index) =>
        [
          item,
          speedTotalData[index],
          index >= deviceList.length ? "" : deviceTotalData[index],
          index < deviceList.length ? "" : deviceTotalData[index],
        ] as [number, number, string, string]
    )
    .filter((item) => item[0] !== -1)
    .sort((a, b) => a[0] - b[0]);
};
const speedLineData = getSpeedLineData();

const occupyDataList = ref<string[]>([]);

const getSpeedData = (tick: number) => {
  for (let i = 0; i < speedLineData.length; i++) {
    if (tick < speedLineData[i][0]) {
      return i === 0 ? null : speedLineData[i - 1];
    }
  }
  return speedLineData[speedLineData.length - 1];
};

const getMarker = (legendName: string) => {
  return `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${
    legend.value.find((item) => item.name === legendName)?.color
  };"></span>`;
};
const lineLegend: {
  marker: string;
  name: string;
  data: number[];
  type: "speed" | "time";
  hidden?: boolean;
}[] = [
  {
    name: "入口时间",
    type: "time",
    data: timeInData,
    hidden: true,
    marker: getMarker("入口时间"),
  },
  {
    name: "出清时间",
    type: "time",
    data: timeOutData,
    hidden: true,
    marker: getMarker("出清时间"),
  },
  {
    name: "入口速度",
    type: "speed",
    data: speedInData,
    marker: getMarker("入口速度"),
  },
  {
    name: "出口速度",
    type: "speed",
    data: speedOutData,
    marker: getMarker("出口速度"),
  },
];

const timeInGraphData = timeInData.reduce((acc, cur, idx) => {
  if (cur >= 0) {
    acc.push([idx + 0.5, cur]);
  }
  return acc;
}, [] as [number, number][]);
const timeOutGraphData = timeOutData.reduce((acc, cur, idx) => {
  if (cur >= 0) {
    acc.push([idx + 0.5, cur]);
  }
  return acc;
}, [] as [number, number][]);
const speedInGraphData = speedInData.reduce((acc, cur, idx) => {
  if (cur >= 0) {
    acc.push([idx + 0.5, cur]);
  }
  return acc;
}, [] as [number, number][]);
const speedOutGraphData = speedOutData.reduce((acc, cur, idx) => {
  if (cur >= 0) {
    acc.push([idx + 0.5, cur]);
  }
  return acc;
}, [] as [number, number][]);

const currentView = ref<"speed" | "time">("speed");

const speedOption = ref({
  title: [
    {
      text: "速度(km/h)",
      left: 0,
      padding: 12,
      textStyle: {
        fontSize: 12,
      },
    },
  ],
  grid: {
    left: 84,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      axis: "x",
    },
    formatter: (args: unknown) => {
      const [data] = args as [
        {
          data: [number, number, string, string];
          name: string;
          seriesName: string;
        }
      ];
      return `时间：${format(addSeconds(startTime, data.data[0]), "HH:mm:ss")}
          <br>${data.seriesName}：${data.data[1]}`;
    },
  },
  yAxis: [
    {
      name: "速度",
      type: "value",
      min: 0,
      max: 30,
      minorSplitLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        showMaxLabel: false,
        showMinLabel: false,
        formatter: (value: number) => value.toFixed(1),
      },
    },
  ],
  xAxis: [
    {
      type: "value",
      name: "时间",
      nameLocation: "end",
      min: 0,
      max: 100,
      axisLabel: {
        inside: true,
        align: "right",
        padding: [0, 8],
      },
    },
  ],
  visualMap: [
    {
      show: false,
      dimension: 0,
      showLabel: true,
      pieces: [
        {
          min: 0,
          max: 0,
          color: legend.value[9].color,
        },
        {
          min: 0,
          max: 100,
          color: legend.value[10].color,
        },
      ],
    },
  ],
  series: [
    {
      type: "line",
      name: "速度",
      data: speedLineData,
      smooth: false,
      symbol: "emptyCircle",
      symbolSize: [8, 8],
      color: legend.value[9].color,
      markLine: {
        silent: true,
        symbol: ["none", "none"],
        label: { show: false },
        animation: false,
        data: [
          {
            xAxis: 0,
            name: "速度动画指示",
            label: {
              show: true,
              position: "end",
              distance: [0, -48],
              lineHeight: 16,
              padding: 8,
              align: "left",
              formatter: (args: unknown) => {
                const { value } = args as { value: number };
                const data = getSpeedData(value);
                let text = `时间：${format(
                  addSeconds(startTime, value),
                  "HH:mm:ss"
                )}`;
                if (data) {
                  text += `\n速度：${data[1]}`;
                } else {
                  text += `\n速度：0`;
                }
                return text;
              },
            },
          },
        ],
      },
      endLabel: {
        show: true,
        padding: [4, 8],
        backgroundColor: "rgba(255, 255, 255, .8)",
        formatter: () => "速度变化曲线",
      },
    },
  ],
} satisfies EChartsOption);

const chartOption = ref({
  title: [
    {
      text: "速度(km/h)",
      left: 0,
      padding: 12,
      textStyle: {
        fontSize: 12,
      },
    },
    {
      text: "时间(秒)",
      right: 0,
      padding: 12,
      textStyle: {
        fontSize: 12,
      },
    },
  ],
  grid: {
    left: 84,
    right: 0,
    top: 0,
    bottom: 0,
  },
  tooltip: [
    {
      trigger: "axis",
      axisPointer: {
        axis: "x",
      },
      formatter: (args: unknown) => {
        const data = args as {
          data: number | string | [number, number];
          marker: string;
          name: string;
          seriesName: string;
          dataIndex: number;
        }[];
        const index = data[0].dataIndex;
        let text = `设备名：${data[0].name}`;
        for (const item of data) {
          const marker = getMarker(item.seriesName);
          if (typeof item.data === "string") {
            text += `<br>${marker}${item.seriesName}时间：无`;
          } else if (typeof item.data === "number") {
            text += `<br>${marker}${item.seriesName}时间：${format(
              addSeconds(startTime, item.data),
              "HH:mm:ss"
            )}`;
          }
        }
        for (const item of lineLegend) {
          if (item.hidden) {
            continue;
          }
          const value = item.data[index];
          const str =
            value < 0
              ? "无"
              : item.type === "speed"
              ? value.toFixed(2)
              : format(addSeconds(startTime, value), "HH:mm:ss");
          text += `<br>${item.marker}${item.name}：${str}`;
        }
        return text;
      },
    },
  ],
  xAxis: [
    {
      type: "category",
      splitLine: {
        show: true,
      },
      minorSplitLine: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      data: xAxis,
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
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        type: "none",
      },
    },
  ],
  yAxis: [
    {
      name: "速度",
      type: "value",
      max: 25,
      min: 0,
      minorSplitLine: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        showMaxLabel: false,
        showMinLabel: false,
        formatter: (value: number) => value.toFixed(1),
      },
    },
    {
      name: "时间",
      type: "value",
      min: 0,
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
      name: "占用",
      label: {
        show: true,
        color: "transparent",
        position: "insideTop",
      },
      barCategoryGap: "0%",
      symbol: "rect",
      symbolPosition: "end",
      symbolSize: ["100%", 2],
      symbolOffset: [0, "-100%"],
      color: "transparent",
      data: timeInData.map((item) => (item >= 0 ? item : "-")),
      barGap: "-100%",
      yAxisIndex: 1,
    },
    {
      type: "pictorialBar",
      name: "出清",
      label: {
        show: true,
        color: "transparent",
        position: "top",
      },
      barCategoryGap: "0%",
      symbol: "rect",
      symbolPosition: "end",
      symbolSize: ["100%", 2],
      symbolOffset: [0, "-100%"],
      color: "transparent",
      data: timeOutData.map((item) => (item >= 0 ? item : "-")),
      yAxisIndex: 1,
    },
    {
      type: "pictorialBar",
      name: "锁闭",
      label: {
        show: false,
        color: "transparent",
        position: "top",
      },
      barCategoryGap: "0%",
      symbol: "rect",
      symbolPosition: "end",
      symbolSize: ["100%", 2],
      symbolOffset: [0, "-100%"],
      color: "transparent",
      data: occupyData.map((item) => (item >= 0 ? item : "-")),
      yAxisIndex: 1,
    },
    {
      type: "line",
      name: "入口时间",
      data: timeInGraphData,
      xAxisIndex: 1,
      smooth: true,
      symbol: "emptyCircle",
      symbolSize: [8, 8],
      yAxisIndex: 1,
      color: legend.value[7].color,
      endLabel: {
        show: true,
        padding: [4, 8],
        backgroundColor: "rgba(255, 255, 255, .8)",
        formatter: () => "入口时间",
      },
    },
    {
      type: "line",
      name: "出清时间",
      data: timeOutGraphData,
      xAxisIndex: 1,
      smooth: true,
      symbol: "emptyCircle",
      symbolSize: [8, 8],
      yAxisIndex: 1,
      color: legend.value[8].color,
      endLabel: {
        show: true,
        padding: [4, 8],
        backgroundColor: "rgba(255, 255, 255, .8)",
        formatter: () => "出清时间",
      },
    },
    {
      type: "line",
      name: "入口速度",
      data: speedInGraphData,
      xAxisIndex: 1,
      smooth: false,
      symbol: "emptyCircle",
      symbolSize: [8, 8],
      color: legend.value[9].color,
      endLabel: {
        show: true,
        padding: [4, 8],
        backgroundColor: "rgba(255, 255, 255, .8)",
        formatter: () => "入口速度",
      },
    },
    {
      type: "line",
      name: "出口速度",
      data: speedOutGraphData,
      xAxisIndex: 1,
      smooth: false,
      symbol: "emptyCircle",
      symbolSize: [8, 8],
      color: legend.value[10].color,
      endLabel: {
        show: true,
        padding: [4, 8],
        backgroundColor: "rgba(255, 255, 255, .8)",
        formatter: () => "出口速度",
      },
    },
  ],
} satisfies EChartsOption);

const refreshChart = (seconds: number) => {
  speedOption.value.visualMap[0].pieces[0].max = seconds;
  speedOption.value.series[0].markLine.data[0].xAxis = seconds;
  if (seconds === 0) {
    occupyDataList.value = [];
  } else {
    const item = getSpeedData(seconds);
    if (!item) {
      return;
    }
    if (item[2] && occupyDataList.value.indexOf(item[2]) === -1) {
      occupyDataList.value = [...occupyDataList.value, item[2]];
    }
    if (item[3] && occupyDataList.value.indexOf(item[3]) !== -1) {
      occupyDataList.value = occupyDataList.value.filter(
        (_item) => _item !== item[3]
      );
    }
  }
};

const isAnimating = ref(false);
const animationTick = ref<number>(0);
const animationTimer = ref<number>(0);

const startAnimation = () => {
  if (isAnimating.value) {
    return;
  }
  refreshChart(0);
  isAnimating.value = true;
  animationTimer.value = window.setInterval(() => {
    animationTick.value += 0.1;
    if (animationTick.value > speedLineData[speedLineData.length - 1][0]) {
      animationTick.value = 0;
      clearInterval(animationTimer.value);
      isAnimating.value = false;
    }
    refreshChart(animationTick.value);
  }, 1000 / 30);
};
const stopAnimation = () => {
  clearInterval(animationTimer.value);
  isAnimating.value = false;
  animationTick.value = 0;
  refreshChart(0);
};
const toggleAnimation = () => {
  if (isAnimating.value) {
    stopAnimation();
  } else {
    startAnimation();
  }
};

const backOptions = [] as {
  name: string;
  data: [number, number][] | (number | "-")[];
}[];

const toggleLegend = (item: {
  name: string;
  color: string;
  hidden?: boolean;
}) => {
  item.hidden = !item.hidden;
  if (item.hidden) {
    const target = chartOption.value.series.find((s) => s.name === item.name);
    if (target) {
      backOptions.push({ name: item.name, data: target.data });
      target.data = [];
    }
  } else {
    const target = chartOption.value.series.find((s) => s.name === item.name);
    if (target) {
      const back = backOptions.find((s) => s.name === item.name);
      if (back) {
        target.data = back.data;
        backOptions.splice(backOptions.indexOf(back), 1);
      }
    }
  }
};
</script>

<template>
  <div class="main">
    <div class="sheet">
      <div class="chart-container">
        <div class="chart">
          <div class="chart-row vchart" v-if="currentView === 'speed'">
            <v-chart class="chart" :option="speedOption" autoresize />
          </div>
          <div class="chart-row vchart" v-if="currentView === 'time'">
            <v-chart class="chart" :option="chartOption" autoresize />
          </div>
          <div class="chart-row slope-design">
            <div class="row-label">设计坡度</div>
            <div class="row-content">
              <ul>
                <li
                  v-for="(item, i) in slopeDesignList"
                  :key="i"
                  :class="item.climb ? 'climb' : ''"
                  :style="{ flex: item.width }"
                >
                  <svg viewBox="0 0 50 20" preserveAspectRatio="none">
                    <line
                      x1="0"
                      y1="0"
                      x2="50"
                      y2="20"
                      stroke="#1A237E"
                      stroke-width="0.5"
                    />
                  </svg>
                  <span class="number">{{ item.value[0].toFixed(1) }}</span>
                  <span class="number">{{ item.value[1].toFixed(1) }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="chart-row slope-caculate" hidden>
            <div class="row-label">折算坡度</div>
            <div class="row-content">
              <ul>
                <li
                  v-for="(item, i) in slopeCaculateList"
                  :key="i"
                  :class="item.climb ? 'climb' : ''"
                  :style="{ flex: item.width }"
                >
                  <svg viewBox="0 0 50 20" preserveAspectRatio="none">
                    <line
                      x1="0"
                      y1="0"
                      x2="50"
                      y2="20"
                      stroke="#1A237E"
                      stroke-width="0.5"
                    />
                  </svg>
                  <span class="number">{{ item.value[0].toFixed(1) }}</span>
                  <span class="number">{{ item.value[1].toFixed(1) }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="chart-row distance">
            <div class="row-label">百米标</div>
            <div class="row-content">
              <ul>
                <li
                  v-for="(item, i) in distanceList"
                  :key="i"
                  :style="{ flex: item[1] }"
                >
                  <span>{{ item[0] }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="chart-row device">
            <div class="row-label">平面</div>
            <div class="row-content">
              <ul>
                <li v-for="(item, i) in deviceList" :key="i">
                  <DeviceVector
                    :device="item"
                    :occupied="occupyDataList.indexOf(item.name) !== -1"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="controls">
        <button><i class="icon-prev">前进</i></button>
        <button><i class="icon-next">后退</i></button>
        <span>
          &nbsp;
          <button
            @click="toggleAnimation()"
            :class="{ disabled: currentView === 'time' }"
          >
            {{ isAnimating ? "停止动画" : "开始动画" }}
          </button>
        </span>
      </div>
      <div class="toggles">
        <input
          type="radio"
          id="speed-view"
          name="toggle-view"
          value="speed"
          v-model="currentView"
        />
        <label for="speed-view">显示速度 - 时间</label>
        <input
          type="radio"
          id="chart-view"
          name="toggle-view"
          value="time"
          v-model="currentView"
        />
        <label for="chart-view">显示速度 - 设备</label>
      </div>
      <div class="empty"></div>
      <div class="legend">
        <ul class="group">
          <li
            v-for="(item, i) in legend.filter((item) => !item.disabled)"
            :key="i"
          >
            <label
              :style="{ color: item.color }"
              :class="item.hidden ? 'hidden' : ''"
              @click="toggleLegend(item)"
            >
              <span>{{ item.name }}</span>
            </label>
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
  border-radius: 0.8rem 0.8rem 0 0;

  .chart-container {
    height: 100%;
    padding: 1rem;
  }
}

.chart-container > .chart {
  height: 100%;
  display: flex;
  flex-direction: column;

  .chart-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #eee;
    border-top: none;

    .row-label {
      width: 6rem;
      padding: 0 0.5rem;
      text-align: right;
    }

    .row-content {
      flex: 1;
      border-left: 1px solid #eee;
      height: 2rem;

      ul {
        display: flex;
        flex-direction: row;
        height: 100%;

        li {
          flex: 1;
        }
      }
    }
  }

  .chart-row[hidden] {
    display: none;
  }

  .chart-row.vchart {
    flex: 1;
    border-top: 1px solid #eee;
  }

  .chart-row.device .row-content {
    height: 3rem;
  }

  .chart-row.distance .row-content {
    ul {
      display: flex;

      li {
        margin-top: 0.8rem;
        margin-bottom: 0.4rem;
        border-bottom: 1px solid #aaa;
        border-right: 1px solid #aaa;

        span {
          display: block;
          font-size: 0.8rem;
          margin-left: 0.2rem;
          margin-top: -0.5rem;
        }
      }

      li:last-child {
        border-right: 0;
      }
    }
  }

  .chart-row.slope-design .row-content,
  .chart-row.slope-caculate .row-content {
    ul {
      display: flex;

      li {
        position: relative;
        border-right: 1px solid #aaa;

        svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        span {
          position: absolute;
          display: block;
          font-size: 0.8rem;
          margin: 0.1rem 0.2rem;
          left: 0;
          bottom: 0;
        }

        span:last-child {
          left: auto;
          right: 0;
          top: 0;
          bottom: auto;
        }
      }

      li.climb {
        svg {
          transform: scale(1, -1);
        }

        span {
          left: auto;
          top: auto;
          right: 0;
          bottom: 0;
        }

        span:last-child {
          right: auto;
          left: 0;
          top: 0;
          bottom: auto;
        }
      }

      li:last-child {
        border-right: 0;
      }
    }
  }
}

footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f8f8f8;
  border: 1px solid #ccc;
  border-top: 0;
  border-radius: 0 0 0.8rem 0.8rem;

  .controls {
    flex: none;
    padding: 0.25rem;

    button {
      margin: 0.25rem;
    }

    button.disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  }
  .toggles {
    display: flex;
    align-items: center;
    > input {
      margin: 0 0.5rem 0 1rem;
    }
  }

  .empty {
    flex: 1;
  }

  .legend {
    overflow: hidden;
    margin-left: 1rem;
    font-size: 0.9rem;

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
        cursor: pointer;
        user-select: none;
      }

      label.hidden {
        filter: grayscale(100%);
        opacity: 0.6;
      }

      label::before {
        content: "";
        width: 1.2em;
        height: 1.2em;
        margin-right: 0.5rem;
        border-radius: 50%;
        display: inline-block;
        vertical-align: middle;
        background: currentColor;
      }

      label > span {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
