import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Task from "./Task/Task";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="main">
        <Task title="title" content="content"/>
      </div>

      <Footer />
    </div>
  );
}

export default App;
