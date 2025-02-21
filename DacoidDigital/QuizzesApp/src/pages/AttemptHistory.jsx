// Importing essential libraries and components
import React, { useState, useEffect } from 'react';
import { Clock, Trophy } from 'lucide-react'; // Icons for UI elements
import { openDB } from 'idb'; // IndexedDB helper for storing and retrieving data
import { quizzes } from './Home'; // Importing quizzes to display total score

export const AttemptHistory = () => {
    // State to store past quiz attempts
    const [attemptHistory, setAttemptHistory] = useState([]);

    // Setting the page title for better user experience
    document.title = "DacoidDigital - Attempt History";

    // Load attempt history from IndexedDB when component mounts
    useEffect(() => {
        loadHistory();
    }, []);

    // Function to load attempt history from IndexedDB
    const loadHistory = async () => {
        // Open (or create) the database
        const db = await openDB('QuizDB', 1, {
            upgrade(db) {
                // Create 'attempts' store if it doesn't exist
                if (!db.objectStoreNames.contains('attempts')) {
                    db.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true });
                }
            }
        });
        // Fetch all attempts and update state
        const allAttempts = await db.getAll('attempts');
        setAttemptHistory(allAttempts);
    };

    return (
        <>
            {/* Main container with styling */}
            <div className="max-w-xl mx-auto p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg text-white">
                {/* Page Heading */}
                <h2 className="text-2xl font-bold mb-4 text-center">Quiz App</h2>

                {/* Attempt History Section */}
                <div className="mt-6 p-4 bg-white text-black rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
                        <Trophy className="mr-2 text-yellow-500" /> Attempt History
                    </h3>

                    {/* Display message if no attempts are found */}
                    {attemptHistory.length === 0 ? (
                        <p className="text-center">No attempts yet.</p>
                    ) : (
                        // List all past attempts with date and score
                        attemptHistory.map((attempt, idx) => (
                            <div key={idx} className="flex justify-between bg-gray-100 p-2 rounded mb-2">
                                <span><Clock className="inline mr-2" />{attempt.date}</span>
                                <span>Score: {attempt.score} / {quizzes.length}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
