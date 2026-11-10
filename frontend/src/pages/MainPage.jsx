import { useState, useEffect } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Task from "@/components/Task/Task";
import CreateTask from "@/components/Task/CreateTask";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/api/tasks";

function MainPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data.tasks))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  async function patchTask(id, changes) {
    setError("");

    try {
      const data = await updateTask(id, changes);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data.task : task)),
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleAdd(draftTask) {
    setError("");

    try {
      const data = await createTask(draftTask);
      setTasks((prevTasks) => [...prevTasks, data.task]);
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    }
  }

  async function handleDelete(id) {
    setError("");

    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  function handleTitleEdit(id, title) {
    patchTask(id, { title });
  }

  function handleContentEdit(id, content) {
    patchTask(id, { content });
  }

  function handleDueDateEdit(id, dueDate) {
    patchTask(id, { dueDate });
  }

  function handleImportantToggle(id) {
    const task = tasks.find((task) => task.id === id);
    patchTask(id, { isImportant: !task.isImportant });
  }

  function handleDoneToggle(id) {
    const task = tasks.find((task) => task.id === id);
    patchTask(id, { isDone: !task.isDone });
  }

  return (
    <div className="app">
      <Header />

      <CreateTask onAdd={handleAdd} />

      {error && <p className="form-error">{error}</p>}

      <div className="main">
        {!isLoading &&
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              content={task.content}
              dueDate={task.dueDate}
              isImportant={task.isImportant}
              isDone={task.isDone}
              onDelete={handleDelete}
              onContentEdit={handleContentEdit}
              onTitleEdit={handleTitleEdit}
              onDueDateEdit={handleDueDateEdit}
              onImportantToggle={handleImportantToggle}
              onDoneToggle={handleDoneToggle}
            />
          ))}
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
