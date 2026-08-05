import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

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
        <div className={`task ${isImportant ? "task-important" : ""} ${isDone ? "task-done" : ""}`}>
            <h1>{props.title}</h1>
            <p>{props.content}</p>

            <div className="task-actions">
                <button
                    className={`done-button ${isDone ? "done-active" : ""}`}
                    onClick={toggleDone}
                >
                    <CheckIcon />
                </button>


                <button
                    className={`important-button ${isImportant ? "important-active" : ""}`}
                    onClick={toggleImportant}
                >
                    !
                </button>

                <button onClick={handleDelete}>
                    <DeleteIcon />
                </button>
            </div>

        </div>
    );
}

export default Task;
