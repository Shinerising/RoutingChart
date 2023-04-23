<script setup lang="ts">
import { ref, computed } from "vue";
import {
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  startOfMonth,
  lastDayOfMonth,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";

const date = ref<Date | "">(new Date());
const currMonth = ref<Date>(new Date());
const focused = ref(false);

const focusOut = (event: Event) => {
  focused.value = false;
  const element = event.target as HTMLInputElement;
  if (element.value === "") {
    date.value = "";
    return;
  }
  const newValue: Date | "Invalid Date" | number = new Date(element.value);
  if (newValue instanceof Date && !isNaN(newValue.getTime())) {
    date.value = newValue;
  } else {
    element.value =
      date.value === "" ? date.value : format(date.value, "yyyy-MM-dd");
  }
};

const focusIn = (event: Event) => {
  event.preventDefault();
  focused.value = true;
  if (date.value !== "") {
    currMonth.value = date.value;
  } else {
    currMonth.value = new Date();
  }
};

const leave = (event: Event) => {
  const element = event.target as HTMLInputElement;
  element?.blur();
};

const prevMonth = (event: Event) => {
  event.preventDefault();
  const date = currMonth.value;
  currMonth.value = new Date(date.getFullYear(), date.getMonth() - 1, 1);
};
const nextMonth = (event: Event) => {
  event.preventDefault();
  const date = currMonth.value;
  currMonth.value = new Date(date.getFullYear(), date.getMonth() + 1, 1);
};
const prevYear = (event: Event) => {
  event.preventDefault();
  const date = currMonth.value;
  currMonth.value = new Date(date.getFullYear() - 1, date.getMonth(), 1);
};
const nextYear = (event: Event) => {
  event.preventDefault();
  const date = currMonth.value;
  currMonth.value = new Date(date.getFullYear() + 1, date.getMonth(), 1);
};

const currWeeks = computed(() =>
  eachWeekOfInterval({
    start: startOfMonth(currMonth.value),
    end: lastDayOfMonth(currMonth.value),
  }).map((week) =>
    eachDayOfInterval({
      start: week,
      end: addDays(week, 6),
    })
  )
);

const shift = ref<"day" | "night">("day");
</script>

<template>
  <div class="date-selector">
    <label for="date-input">日期：</label>
    <div class="date-container" :class="{ focused }">
      <input
        id="date-input"
        class="date-input"
        type="text"
        placeholder="请选择查询日期"
        :value="date === '' ? date : format(date, 'yyyy-MM-dd')"
        @focusin="focusIn($event)"
        @focusout="focusOut($event)"
        @keydown.enter="leave($event)"
        @keydown.esc="leave($event)"
      />
      <i class="icon-calendar"></i>
      <button class="button-flat button-clear" @click="date = ''" />
      <Transition>
        <div class="date-pick-panel" v-show="focused">
          <div class="date-pick-header">
            <div class="date-pick-year">
              <button
                class="button-flat button-prev"
                @mousedown="prevYear($event)"
              />
              <span class="date-pick-title">{{
                format(currMonth, "yyyy")
              }}</span>
              <button
                class="button-flat button-next"
                @mousedown="nextYear($event)"
              />
            </div>
            <div class="separator" />
            <div class="date-pick-month">
              <button
                class="button-flat button-prev"
                @mousedown="prevMonth($event)"
              />
              <span class="date-pick-title">{{ format(currMonth, "MM") }}</span>
              <button
                class="button-flat button-next"
                @mousedown="nextMonth($event)"
              />
            </div>
          </div>
          <table class="date-pick-table">
            <thead>
              <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="week in currWeeks" :key="week[0].getDate()">
                <td
                  v-for="day in week"
                  :key="day.getDate()"
                  :class="{
                    selected: date && isSameDay(day, date),
                    highlight: isSameMonth(day, currMonth),
                    today: isSameDay(day, new Date()),
                  }"
                  @click="date = day"
                >
                  {{ day.getDate() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Transition>
    </div>
    <div class="shift-selector">
      <button :class="{ active: shift === 'day' }" @click="shift = 'day'">
        白班
      </button>
      <button :class="{ active: shift === 'night' }" @click="shift = 'night'">
        夜班
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-selector {
  display: flex;
  align-items: center;

  > label {
    flex: none;
  }
}

.date-container {
  flex: 1;
  position: relative;

  &:focus {
    border-color: #00a1d6;
  }

  > input.date-input {
    appearance: none;
    cursor: pointer;
    width: 100%;
    padding: 0.4em 2.2em;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    font-size: 1rem;
    line-height: 1.2;
    border: 1px solid var(--color-border);
    background-color: #fff;
    color: var(--color-text);

    &:focus {
      border-color: #00a1d6;
    }
  }

  .icon-calendar {
    position: absolute;
    width: 1.2em;
    left: 0.6em;
    top: 0;
    bottom: 0.1em;
    margin: auto;
    opacity: 0.6;
    pointer-events: none;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: var(--icon-calendar);
  }

  .button-clear {
    position: absolute;
    width: 1.8em;
    height: 1.8em;
    right: 0.5em;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.6;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80%;
    background-image: var(--icon-cross);
  }

  .date-pick-panel {
    position: absolute;
    z-index: 100;
    top: 100%;
    width: 100%;
    margin: 0.5rem 0;
    font-size: 0.9rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    transform-origin: top;
    box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.15);

    .date-pick-header {
      display: flex;
      border-bottom: 1px solid #ddd;

      > * {
        display: flex;
        align-items: center;

        > .date-pick-title {
          flex: 1;
          text-align: center;
        }
      }

      > .date-pick-year {
        flex: 4;
      }

      > .date-pick-month {
        flex: 3;
      }

      > .separator {
        flex: none;
        width: 1px;
        height: 2rem;
        background-color: #ddd;
      }
    }

    .date-pick-table {
      user-select: none;
      padding: 0.2rem;
      width: 100%;
      table-layout: fixed;
      border-spacing: 0.2em;

      > thead {
        > tr {
          > th {
            color: #666;
          }
        }
      }

      > tbody {
        > tr {
          > td {
            cursor: pointer;
            border: 1px solid transparent;
            border-radius: 0.5em;
            color: #9e9e9e;

            &:hover {
              background-color: #eeeeee;
            }

            &.highlight {
              color: #212121;
            }

            &.today {
              color: #0288d1;
            }

            &.selected {
              border-color: #1e88e5;
            }
          }
        }
      }

      th,
      td {
        padding: 0.3em 0;
        padding: calc((100% - 1.6em) / 14 - 0.5em - 1px) 0;
        line-height: 1;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
      }
    }
  }

  .button-prev,
  .button-next {
    width: 1.6em;
    height: 1.6em;
    margin: 0.2em 0.4em;
    padding: 0;
    opacity: 0.6;
    border-radius: 50%;
    background-size: 120%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .button-prev {
    margin: 0.2em 0em 0.2em 0.4em;
    background-image: var(--icon-left);
  }

  .button-next {
    margin: 0.2em 0.4em 0.2em 0em;
    background-image: var(--icon-right);
  }
}

.shift-selector {
  display: flex;
  margin-left: 1rem;
  font-size: 0.9rem;
  align-items: center;
  border-radius: 0.5rem;
  line-height: 1.2;
  background-color: #fff;

  > button {
    border: 1px solid #ccc;
    margin: 0;
    background-color: transparent;
  }
  > button:first-child {
    border-radius: 0.5rem 0 0 0.5rem;
    border-right: none;
    padding: 0.4rem 0.5rem 0.4rem 0.6rem;
  }
  > button:last-child {
    border-radius: 0 0.5rem 0.5rem 0;
    border-left: none;
    padding: 0.4rem 0.6rem 0.4rem 0.5rem;
  }
  > button:hover {
    background-color: #eeeeee;
  }
  > button.active {
    border: 1px solid #ccc;
    background-color: #1e88e5;
    color: #fff;
  }
}

.date-container.focused {
  .icon-calendar,
  .button-clear {
    opacity: 1;
  }
}

.v-enter-active.date-pick-panel,
.v-leave-active.date-pick-panel {
  transition: opacity 0.25s 0.15s, transform 0.25s 0.15s;
}

.v-enter-from.date-pick-panel,
.v-leave-to.date-pick-panel {
  opacity: 0;
  transform: translateY(-0.5rem) scale(1, 0.8);
}
</style>
