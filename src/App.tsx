import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Home } from './pages/home'
import { Agendamentos } from './pages/agendamentos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agendamentos" element={<Agendamentos />} />
    </Routes>
  );
}

export default App
