import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

function Task(props) {
    const [isImportant, setIsImportant] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isContentEdited, setIsContentEdited] = useState(false);
    const [isTitleEdited, setIsTitleEdited] = useState(false);

    function toggleImportant() {
        setIsImportant(!isImportant);
    }

    function toggleDone() {
        setIsDone(!isDone);
    }

    function handleDelete() {
        props.onDelete(props.id);
    }

    function fitToContent(element) {
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
}

    return (
        <div
            className={`task ${isImportant ? "task-important" : ""} ${isDone ? "task-done" : ""}`}
        >
            {isTitleEdited ? (
                <textarea
                    className="task-edit"
                    value={props.title}
                    autoFocus
                    ref={(element) => element && fitToContent(element)}
                    onChange={(event) => {
                        fitToContent(event.target);
                        props.onTitleEdit(props.id, event.target.value);
                    }}
                    onBlur={() => setIsTitleEdited(false)}
                />
            ) : (
                <h1 onClick={() => setIsTitleEdited(true)}>{props.title}</h1>
            )}

            {isContentEdited ? (
                <textarea
                    className="task-edit"
                    value={props.content}
                    autoFocus
                    ref={(element) => element && fitToContent(element)}
                    onChange={(event) => {
                        fitToContent(event.target);
                        props.onContentEdit(props.id, event.target.value);
                    }}
                    onBlur={() => setIsContentEdited(false)}
                />
            ) : (
                <p onClick={() => setIsContentEdited(true)}>{props.content}</p>
            )}

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
