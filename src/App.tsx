import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import AnimeDetailPage from "./pages/AnimeDetailPage";
import Navbar from "./components/Navbar"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/anime/:id" element={<AnimeDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
