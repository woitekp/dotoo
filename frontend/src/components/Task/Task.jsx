import { useState } from "react";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarHeader from "@/components/Date/CalendarHeader";
import EditableText from "./EditableText";

function Task({
  task: { id, title, content, dueDate, isImportant, isDone },
  onChange,
  onDelete,
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dateButton, setDateButton] = useState(null);

  function handleDueDateChange(value) {
    if (!value?.isValid()) return;

    onChange(id, { dueDate: value.toISOString() });
  }

  return (
    <div
      className={`task ${isImportant ? "task-important" : ""} ${isDone ? "task-done" : ""}`}
    >
      <EditableText
        tag="h1"
        value={title}
        onChange={(value) => onChange(id, { title: value })}
      />

      <EditableText
        tag="p"
        value={content}
        onChange={(value) => onChange(id, { content: value })}
      />

      <button
        type="button"
        className="task-date"
        ref={setDateButton}
        onClick={() => setIsPickerOpen(true)}
      >
        {dayjs(dueDate).format("L")}
      </button>

      <DatePicker
        open={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        value={dayjs(dueDate)}
        onChange={handleDueDateChange}
        slots={{ calendarHeader: CalendarHeader }}
        slotProps={{
          textField: { sx: { display: "none" } },
          popper: { anchorEl: dateButton },
          day: {
            disableRipple: true,
            sx: {
              "&:hover, &:focus": {
                background: "var(--paper-shade)",
              },
              "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
                border: "1px solid var(--pencil-light)",
                background: "var(--paper-shade)",
                color: "inherit",
              },
            },
          },
        }}
      />

      <div className="task-actions">
        <button
          className={`icon-button done-button ${isDone ? "done-active" : ""}`}
          onClick={() => onChange(id, { isDone: !isDone })}
        >
          <CheckIcon />
        </button>

        <button
          className={`icon-button important-button ${isImportant ? "important-active" : ""}`}
          onClick={() => onChange(id, { isImportant: !isImportant })}
        >
          !
        </button>

        <button
          className="icon-button delete-button"
          onClick={() => onDelete(id)}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Task;
