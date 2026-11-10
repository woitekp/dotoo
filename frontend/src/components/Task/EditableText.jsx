import { useState } from "react";

function fitToContent(element) {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
}

function EditableText({ tag: Tag, value, onChange }) {
  const [isEdited, setIsEdited] = useState(false);

  const [draft, setDraft] = useState(value);

  function startEditing() {
    if (isEdited) return;

    setDraft(value);
    setIsEdited(true);
  }

  function commit() {
    setIsEdited(false);

    if (draft !== value) {
      onChange(draft);
    }
  }

  return (
    <Tag onClick={startEditing}>
      {isEdited ? (
        <textarea
          className="task-edit"
          value={draft}
          autoFocus
          ref={(element) => element && fitToContent(element)}
          onChange={(event) => {
            fitToContent(event.target);
            setDraft(event.target.value);
          }}
          onBlur={commit}
        />
      ) : (
        value
      )}
    </Tag>
  );
}

export default EditableText;
