import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Counter from './Counter';
import Home from './Home';
import Navbar from './Navbar';
import Orders from './Orders';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;