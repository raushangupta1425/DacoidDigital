// Importing the Link component from react-router-dom to handle client-side navigation
import { Link } from "react-router-dom";

// Header component that renders the navigation bar
export const Header = () => {
    return (
        <div className="bg-gray-100"> {/* Wrapper with a light gray background */}
          <nav className="bg-black p-4 text-white flex"> {/* Navbar with black background, padding, and white text */}
            
            {/* Logo section */}
            <span>
              <img 
                width={40} 
                height={40} 
                src="https://w7.pngwing.com/pngs/67/887/png-transparent-trivia-crack-tv-show-king-game-show-logo-show-quiz-game-competition-thumbnail.png" 
                alt="Logo" 
              />
            </span>

            {/* Navigation links centered using flex and space-x-4 for spacing */}
            <ul className="flex space-x-4 mx-auto">
              <li>
                {/* Link to the Home page */}
                <Link to="/">Home</Link>
              </li>
              <li>
                {/* Link to the Attempt History page */}
                <Link to="/history">Attempt History</Link>
              </li>
            </ul>
          </nav>
        </div>
    )
}
