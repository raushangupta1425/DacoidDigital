// Importing essential React hooks and external libraries
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCw, Timer } from 'lucide-react'; // Icons for feedback and timer
import { openDB } from 'idb'; // IndexedDB for storing quiz attempts locally
import { Progress } from '../components/ui/Progress'; // Progress bar component

// Quiz data: includes both multiple-choice and integer-based questions
export const quizzes = [
  { id: 1, question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], answer: 'Mercury', type: 'mcq' },
  { id: 2, question: 'Which data structure organizes items in a First-In, First-Out (FIFO) manner?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 'Queue', type: 'mcq' },
  { id: 3, question: 'Which of the following is primarily used for structuring web pages?', options: ['Python', 'Java', 'HTML', 'C++'], answer: 'HTML', type: 'mcq' },
  { id: 4, question: 'Which chemical symbol stands for Gold?', options: ['Au', 'Gd', 'Ag', 'Pt'], answer: 'Au', type: 'mcq' },
  { id: 5, question: 'Which of these processes is not typically involved in refining petroleum?', options: ['Fractional distillation', 'Cracking', 'Polymerization', 'Filtration'], answer: 'Filtration', type: 'mcq' },
  { id: 6, question: 'What is the value of 12 + 28?', answer: '40', type: 'integer' },
  { id: 7, question: 'How many states are there in the United States?', answer: '50', type: 'integer' },
  { id: 8, question: 'In which year was the Declaration of Independence signed?', answer: '1776', type: 'integer' },
  { id: 9, question: 'What is the value of pi rounded to the nearest integer?', answer: '3', type: 'integer' },
  { id: 10, question: 'If a car travels at 60 mph for 2 hours, how many miles does it travel?', answer: '120', type: 'integer' }
];

// Main Home component that controls the quiz flow
export function Home() {
  // State variables to manage quiz progress and user interaction
  const [currentQuiz, setCurrentQuiz] = useState(0); // Tracks current question index
  const [userAnswer, setUserAnswer] = useState(''); // Stores user's input
  const [timer, setTimer] = useState(30); // Countdown timer for each question
  const [score, setScore] = useState(0); // Tracks user score
  const [showResult, setShowResult] = useState(true); // Toggles between quiz and result screen
  const [feedback, setFeedback] = useState(null); // Provides immediate feedback (correct/incorrect)

  // Set page title on component mount
  document.title = "DacoidDigital - Quiz App";

  // Countdown timer effect: triggers every second
  useEffect(() => {
    if (timer > 0 && !showResult) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000); // Decrease timer every second
      return () => clearInterval(countdown); // Clear timer when component unmounts or timer resets
    } else if (timer === 0) {
      handleAnswer(); // Auto-submit when timer hits zero
    }
  }, [timer, showResult]);

  // Function to save quiz attempts to IndexedDB
  const saveAttempt = async (attempt) => {
    const db = await openDB('QuizDB', 1); // Open database
    await db.add('attempts', attempt); // Add new attempt
  };

  // Handles answer submission and feedback logic
  const handleAnswer = () => {
    // Check if the user's answer is correct (case-insensitive)
    const isCorrect = userAnswer.trim().toLowerCase() === quizzes[currentQuiz].answer.toLowerCase();
    if (isCorrect) {
      setScore(score + 1); // Increment score for correct answer
      setFeedback('correct'); // Provide positive feedback
    } else {
      setFeedback('incorrect'); // Indicate wrong answer
    }

    // Move to the next question or end the quiz after a short delay
    setTimeout(() => {
      if (currentQuiz < quizzes.length - 1) {
        setCurrentQuiz(currentQuiz + 1); // Load next question
        setUserAnswer(''); // Reset user input
        setFeedback(null); // Clear feedback
        setTimer(30); // Reset timer
      } else {
        // End of quiz: save attempt and show result
        const newAttempt = { date: new Date().toLocaleString(), score: score + (isCorrect ? 1 : 0) };
        saveAttempt(newAttempt);
        setShowResult(true);
      }
    }, 1000); // 1-second delay to show feedback
  };

  // Resets quiz state for a new attempt
  const restartQuiz = () => {
    setCurrentQuiz(0);
    setScore(0);
    setUserAnswer('');
    setShowResult(false);
    setFeedback(null);
    setTimer(30);
  };

  // Initialize quiz on component mount
  useEffect(() => {
    restartQuiz();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Quiz App</h2>

      {/* Quiz Section */}
      {!showResult ? (
        <div className="bg-white text-black rounded-2xl shadow-md p-3">
          {/* Progress bar showing quiz progression */}
          <Progress value={currentQuiz + 1} maxLength={quizzes.length} />

          {/* Current question and timer */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Question {currentQuiz + 1}</h2>
            <div className="flex items-center text-red-500">
              <Timer className="mr-2" /> {timer}s {/* Countdown timer */}
            </div>
          </div>

          {/* Display current quiz question */}
          <p className="mb-4 text-lg">{quizzes[currentQuiz].question}</p>

          {/* Render input based on question type */}
          {quizzes[currentQuiz].type === 'mcq' ? (
            // Multiple-choice options
            <div className="mb-4">
              {quizzes[currentQuiz].options.map((option, idx) => (
                <label key={idx} className="flex items-center mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mcq-option"
                    value={option}
                    checked={userAnswer === option}
                    onChange={() => setUserAnswer(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            // Integer-type questions (text input)
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter your answer"
            />
          )}

          {/* Submit answer button */}
          <button
            onClick={handleAnswer}
            disabled={!userAnswer}
            className="w-full bg-black text-white text-sm py-1 rounded cursor-pointer"
          >
            Submit Answer
          </button>

          {/* Instant feedback for the user */}
          {feedback === 'correct' && (
            <div className="flex items-center mt-4 text-green-600">
              <CheckCircle className="mr-2" /> Correct!
            </div>
          )}
          {feedback === 'incorrect' && (
            <div className="flex items-center mt-4 text-red-600">
              <XCircle className="mr-2" /> Incorrect!
            </div>
          )}
        </div>
      ) : (
        // Result screen after quiz completion
        <div className="text-center">
          <h2 className="text-3xl font-bold">🎉 Quiz Completed!</h2>
          <p className="mt-4 text-xl">Your Score: {score} / {quizzes.length}</p>

          {/* Final progress bar */}
          <Progress value={score} maxLength={quizzes.length} />

          {/* Retry button */}
          <button onClick={restartQuiz} className="mt-6 bg-yellow-500 text-white flex items-center justify-center p-2 cursor-pointer rounded">
            <RotateCw className="mr-2" /> Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
}
