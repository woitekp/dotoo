import { useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Task from "./Task/Task";
import CreateTask from "./Task/CreateTask";

function App() {
  const [tasks, setTasks] = useState([]);

  function addTask(newTask) {
    setTasks(prevTasks => {
      return [...prevTasks, newTask];
    });
  }

  return (
    <div className="app">
      <Header />

      <CreateTask onAdd={addTask} />

      <div className="main">
        {tasks.map((task, index) => (
          <Task key={index} title={task.title} content={task.content} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default App;
