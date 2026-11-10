import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const TITLE_MIN_LENGTH = 2;
const CONTENT_MAX_LENGTH = 200;

function CreateTask(props) {
  const [draftTask, setDraftTask] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setDraftTask((prevDraftTask) => {
      return {
        ...prevDraftTask,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (draftTask.title.trim().length < TITLE_MIN_LENGTH) {
      setError(`Title must be at least ${TITLE_MIN_LENGTH} characters`);
      return;
    }

    setError("");
    setIsSubmitting(true);
    const added = await props.onAdd(draftTask);
    setIsSubmitting(false);
    if (added) {
      setDraftTask({ title: "", content: "" });
    }
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
          maxLength={CONTENT_MAX_LENGTH}
          rows={3}
        />

        {error && <p className="form-error">{error}</p>}

        <button
          className="icon-button submit-button"
          type="submit"
          disabled={isSubmitting}
        >
          <AddIcon fontSize="medium" />
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
