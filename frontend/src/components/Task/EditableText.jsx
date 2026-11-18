import { useState } from "react";

function fitToContent(element) {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
}

function EditableText({ tag: Tag, value, onChange }) {
  const [isEdited, setIsEdited] = useState(false);
  const [draft, setDraft] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  const displayed = isSaving ? draft : value;

  function startEditing() {
    if (isEdited || isSaving) return;

    setDraft(value);
    setIsEdited(true);
  }

  async function commit() {
    setIsEdited(false);

    if (draft === value) return;

    setIsSaving(true);
    await onChange(draft);
    setIsSaving(false);
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
        displayed
      )}
    </Tag>
  );
}

export default EditableText;
