import { useState, useEffect, useRef } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Task from "@/components/Task/Task";
import CreateTask from "@/components/Task/CreateTask";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/api/tasks";

function MainPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const pendingIds = useRef(new Set());

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data.tasks))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  async function patchTask(id, changes) {
    if (pendingIds.current.has(id)) return;

    setError("");
    pendingIds.current.add(id);

    try {
      const data = await updateTask(id, changes);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data.task : task)),
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      pendingIds.current.delete(id);
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
    if (pendingIds.current.has(id)) return;

    setError("");
    pendingIds.current.add(id);

    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      pendingIds.current.delete(id);
    }
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
              task={task}
              onChange={patchTask}
              onDelete={handleDelete}
            />
          ))}
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
