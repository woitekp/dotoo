import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Task from "./Task/Task";

const tasks = [
  { id: 1, title: "Learn JavaScript", content: "Practice arrays and objects" },
  { id: 2, title: "Go for a walk", content: "30 minutes" },
  { id: 3, title: "Learn React", content: "Today: useState" },
];

function App() {
  return (
    <div className="app">
      <Header />

      <div className="main">
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} content={task.content} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default App;
