import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePgae/HomePage";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}>
            {/* <Route exact path="/homepage" element={<HomePage />}> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
