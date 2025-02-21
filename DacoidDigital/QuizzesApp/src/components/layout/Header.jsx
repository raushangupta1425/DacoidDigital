import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div className="bg-gray-100">
          <nav className="bg-black p-4 text-white flex">
            <span><img width={40} height={40} src="https://w7.pngwing.com/pngs/67/887/png-transparent-trivia-crack-tv-show-king-game-show-logo-show-quiz-game-competition-thumbnail.png" alt="Logo" /></span>
            <ul className="flex space-x-4 mx-auto">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/history">Attempt History</Link></li>
            </ul>
          </nav>
        </div>
    )
}