import { useState } from "react";

function CreateTask(props) {
  const [isExpanded, setExpanded] = useState(false);

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

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-task" onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={draftTask.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={draftTask.content}
          placeholder="Add a task..."
          rows={isExpanded ? 3 : 1}
        />
        {isExpanded && (
          <button type="submit">+</button>
        )}
      </form>
    </div>
  );
}

export default CreateTask;
