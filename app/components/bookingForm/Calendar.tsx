/* eslint-disable prefer-const */

"use client";

import { useLocale } from "react-aria-components";
import { useCalendar } from "react-aria";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import { CalendarProps, DateValue } from "@react-types/calendar";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";

export function Calendar(
  props: CalendarProps<DateValue> & {
    isDateUnavailable?: (date: DateValue) => boolean;
  }
) {
  const { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: 1 },
    locale,
    createCalendar,
  });


  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );
  return (
    <div {...calendarProps} className="inline-block w-full">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />

      <div className="flex gap-8">
        <CalendarGrid
          state={state}
          isDateUnavailable={props.isDateUnavailable}
        />
      </div>
    </div>
  );
}
