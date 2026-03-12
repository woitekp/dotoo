import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Task from "./Task/Task";

function App() {
  return (
    <div>
      <Header />
      <Task title="tit" content="con"/>
      <Footer />
      
    </div>
  );
}

export default App;
