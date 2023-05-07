import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Review from "./components/Review"

function App() {
  return <div className="App p-5">
    <BrowserRouter>
      <Routes>
        <Route path="/:value/:sender/:recipient" element={<Review />} />
      </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
