import { useState } from "react";

function fitToContent(element) {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
}

function EditableText({ tag: Tag, value, onChange}) {
  const [isEdited, setIsEdited] = useState(false);

  return (
    <Tag onClick={() => setIsEdited(true)}>
    {isEdited ? (
        <textarea
            className="task-edit"
            value={value}
            autoFocus
            ref={(element) => element && fitToContent(element)}
            onChange={(event) => {
            fitToContent(event.target);
            onChange(event.target.value);
            }}
            onBlur={() => setIsEdited(false)}
        />
    ) : (
        value
    )}
    </Tag>
 );
}

export default EditableText;
