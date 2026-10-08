import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function CalendarHeader(props) {
  const { currentMonth, onMonthChange, view, onViewChange, labelId, disabled } =
    props;

  const isDayView = view === "day";

  function goToPreviousMonth() {
    onMonthChange(currentMonth.subtract(1, "month"));
  }

  function goToNextMonth() {
    onMonthChange(currentMonth.add(1, "month"));
  }

  function toggleYearView() {
    onViewChange(isDayView ? "year" : "day");
  }

  return (
    <div className="calendar-header">
      <button
        type="button"
        className="calendar-header-arrow"
        disabled={disabled || !isDayView}
        onClick={goToPreviousMonth}
        aria-label="Previous month"
      >
        <ChevronLeftIcon fontSize="small" />
      </button>

      <button
        type="button"
        id={labelId}
        className="calendar-header-label"
        disabled={disabled}
        onClick={toggleYearView}
      >
        {currentMonth.format("MMMM YYYY")}
      </button>

      <button
        type="button"
        className="calendar-header-arrow"
        disabled={disabled || !isDayView}
        onClick={goToNextMonth}
        aria-label="Next month"
      >
        <ChevronRightIcon fontSize="small" />
      </button>
    </div>
  );
}

export default CalendarHeader;
