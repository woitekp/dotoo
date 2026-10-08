import { useState } from "react";
import dayjs from "dayjs";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarHeader from "@/components/Date/CalendarHeader";
import EditableText from "./EditableText";

function Task(props) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [dateButton, setDateButton] = useState(null);

  function handleDueDateChange(value) {
    if (!value?.isValid()) return;

    props.onDueDateEdit(props.id, value.toISOString());
  }

  function toggleImportant() {
    props.onImportantToggle(props.id);
  }

  function toggleDone() {
    props.onDoneToggle(props.id);
  }

  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <div
      className={`task ${props.isImportant ? "task-important" : ""} ${props.isDone ? "task-done" : ""}`}
    >
      <EditableText
        tag="h1"
        value={props.title}
        onChange={(value) => props.onTitleEdit(props.id, value)}
      />

      <EditableText
        tag="p"
        value={props.content}
        onChange={(value) => props.onContentEdit(props.id, value)}
      />

      <button
        type="button"
        className="task-date"
        ref={setDateButton}
        onClick={() => setIsPickerOpen(true)}
      >
        {dayjs(props.dueDate).format("L")}
      </button>

      <DatePicker
        open={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        value={dayjs(props.dueDate)}
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
          className={`icon-button done-button ${props.isDone ? "done-active" : ""}`}
          onClick={toggleDone}
        >
          <CheckIcon />
        </button>

        <button
          className={`icon-button important-button ${props.isImportant ? "important-active" : ""}`}
          onClick={toggleImportant}
        >
          !
        </button>

        <button className="icon-button delete-button" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default Task;
