import { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Task from "../components/Task/Task";
import CreateTask from "../components/Task/CreateTask";

function MainPage() {
  const [tasks, setTasks] = useState([]);

  function addTask(newTask) {
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  function deleteTask(id) {
    setTasks((prevTasks) =>
      prevTasks.filter((taskItem, index) => index !== id)
    );
  }

  return (
    <div className="app">
      <Header />

      <CreateTask onAdd={addTask} />

      <div className="main">
        {tasks.map((task, index) => (
          <Task
            key={index}
            id={index}
            title={task.title}
            content={task.content}
            onDelete={deleteTask}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default MainPage;
