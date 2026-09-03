import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function CreateTask(props) {
  const [draftTask, setDraftTask] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setDraftTask((prevDraftTask) => {
      return {
        ...prevDraftTask,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (draftTask.title.trim() === "" && draftTask.content.trim() === "") return;

    props.onAdd(draftTask);
    setDraftTask({
      title: "",
      content: "",
    });
  }

  return (
    <div>
      <form className="form-card create-task" onSubmit={handleSubmit}>
        <input
          name="title"
          onChange={handleChange}
          value={draftTask.title}
          placeholder="Title"
        />

        <textarea
          name="content"
          onChange={handleChange}
          value={draftTask.content}
          placeholder="Add a task..."
          rows={3}
        />

        <button className="icon-button submit-button" type="submit">
          <AddIcon fontSize="medium" />
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
