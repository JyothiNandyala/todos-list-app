import "./App.css";
import Timer from "./Timer";
import RenderTodos from "./FetchTodos";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="App">
        <Timer />
        <RenderTodos />
      </div>
      <div className="footer-comp">
        <Footer />
      </div>
    </>
  );
}

export default App;
