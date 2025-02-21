import './App.css'
import { AppLayout } from './components/layout/AppLayout'
import { AttemptHistory } from './pages/AttemptHistory'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="history" element={<AttemptHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
