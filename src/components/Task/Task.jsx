import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableText from "./EditableText";


function Task(props) {
    const [isImportant, setIsImportant] = useState(false);
    const [isDone, setIsDone] = useState(false);

    function toggleImportant() {
        setIsImportant(!isImportant);
    }

    function toggleDone() {
        setIsDone(!isDone);
    }

    function handleDelete() {
        props.onDelete(props.id);
    }

    return (
        <div
            className={`task ${isImportant ? "task-important" : ""} ${isDone ? "task-done" : ""}`}
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

            <div className="task-actions">
                <button
                    className={`icon-button done-button ${isDone ? "done-active" : ""}`}
                    onClick={toggleDone}
                >
                    <CheckIcon />
                </button>

                <button
                    className={`icon-button important-button ${isImportant ? "important-active" : ""}`}
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
