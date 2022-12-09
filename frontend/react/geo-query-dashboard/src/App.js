import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.page";
import Layout from "./pages/Layout/Layout.page";
import Dashboard from "./pages/Dashboard/Dashboard.page";
import NoPage from "./pages/404/NoPage.page";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="home" element={<Home />} />
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
