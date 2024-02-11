import { BrowserRouter, Routes, Route } from "react-router-dom";

// import components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import AdminDB from "./components/AdminDB/AdminDB";
import Dashboard from "./components/Dashboard/Dashboard";
import Mealplan from "./components/Mealplan/Mealplan";
import Recipes from "./components/Recipes/Recipes";
import Authentication from "./components/Authentication/Authentication";
import Scheduling from "./components/Scheduling/Scheduling";
import Snackbar from "./components/Snackbar/Snackbar";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Snackbar />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/admin" exact element={<AdminDB />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/mealplan" exact element={<Mealplan />} />
          <Route path="/recipes" exact element={<Recipes />} />
          <Route path="/authentication" exact element={<Authentication />} />
          <Route path="/schedule" exact element={<Scheduling />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
