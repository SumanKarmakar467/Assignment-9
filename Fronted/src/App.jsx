import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import VisitorForm from './pages/VisitorForm';



function App() {
  

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visitor" element={<VisitorForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
