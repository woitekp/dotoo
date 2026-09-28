import { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Task from "@/components/Task/Task";
import CreateTask from "@/components/Task/CreateTask";

function MainPage() {
  const [tasks, setTasks] = useState([]);

  function addTask(newTask) {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...newTask,
        id: Date.now(),
      }
    ]);
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function editTaskContent(id, content) {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, content } : task)));
  }

  function editTaskTitle(id, title) {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, title } : task)));
  }

  return (
    <div className="app">
      <Header />

      <CreateTask onAdd={addTask} />

      <div className="main">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            content={task.content}
            onDelete={deleteTask}
            onContentEdit={editTaskContent}
            onTitleEdit={editTaskTitle}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
