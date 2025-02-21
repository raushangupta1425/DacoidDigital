import React, { useState, useEffect } from 'react';
import { Clock, Trophy} from 'lucide-react';
import { openDB } from 'idb';
import { quizzes } from './Home';

export const AttemptHistory = () => {
    const [attemptHistory, setAttemptHistory] = useState([]);

    document.title="DacoidDigital - Attempt History";

    useEffect(() => {
        loadHistory();
      }, []);

    const loadHistory = async () => {
        const db = await openDB('QuizDB', 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('attempts')) {
              db.createObjectStore('attempts', { keyPath: 'id', autoIncrement: true });
            }
          }
        });
        const allAttempts = await db.getAll('attempts');  
        setAttemptHistory(allAttempts);
    };

    return (
        <>
        <div className="max-w-xl mx-auto p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Quiz App</h2>
            <div className="mt-6 p-4 bg-white text-black rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-center"><Trophy className="mr-2 text-yellow-500" /> Attempt History</h3>
                {attemptHistory.length === 0 ? (
                    <p className="text-center">No attempts yet.</p>
                ) : (
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
    )
}