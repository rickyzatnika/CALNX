/* eslint-disable @typescript-eslint/no-unused-vars */
import { type CalendarState } from "react-stately";
import { FocusableElement, DOMAttributes } from "@react-types/shared";
import { CalendarButton } from "./CalendarButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AriaButtonProps, useDateFormatter, VisuallyHidden } from "react-aria";


export function CalendarHeader({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}: {
  state: CalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevButtonProps: AriaButtonProps<"button">;
  nextButtonProps: AriaButtonProps<"button">;
}) {
  const monthDateFormatter = useDateFormatter({
    month: "short",
    year: "numeric",
    timeZone: state.timeZone,
  });

  const [monthName, _, year] = monthDateFormatter
    .formatToParts(state.visibleRange.start.toDate(state.timeZone))
    .map((part) => part.value);

  return (
    <div className="flex items-center pb-4 ">
      <VisuallyHidden>
        <h2>{(calendarProps as { "aria-label": string })["aria-label"]}</h2>
      </VisuallyHidden>

      <h2 className="font-semibold flex-1">
        {monthName}{" "}
        <span className="text-muted-foreground text-sm font-medium">
          {year}
        </span>
      </h2>

      <div className="flex items-center gap-2">
        <CalendarButton {...prevButtonProps}>
          <ChevronLeft className="size-4" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRight className="size-4" />
        </CalendarButton>
      </div>
    </div>
  );
}
