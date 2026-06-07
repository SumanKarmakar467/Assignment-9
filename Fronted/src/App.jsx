import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import VisitorForm from './pages/VisitorForm';
import Employee from "./pages/Employee";
import Admin from "./pages/Admin";




function App() {
  

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visitor" element={<VisitorForm />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
