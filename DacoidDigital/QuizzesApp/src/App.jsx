// Importing global styles
import './App.css';

// Importing layout and page components
import { AppLayout } from './components/layout/AppLayout'; // Main layout with header & footer
import { AttemptHistory } from './pages/AttemptHistory';   // Page to view quiz attempt history
import { Home } from './pages/Home';                       // Home page with the quiz

// Importing React Router for handling routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // Setting up the Router for navigation
    <Router>
      <Routes>
        {/* Main layout wraps all pages for consistent header/footer */}
        <Route path="/" element={<AppLayout />}>
          
          {/* Home page route - displayed at the root path */}
          <Route index element={<Home />} />
          
          {/* Attempt history route - accessible via /history */}
          <Route path="history" element={<AttemptHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
