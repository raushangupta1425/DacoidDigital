// Progress component to visually display quiz progress
export const Progress = ({ value, maxLength }) => {
    return (
        <>
            <div>
                {/* HTML5 progress bar to indicate quiz completion */}
                <progress 
                    value={value}               // Current progress (e.g., current question number)
                    max={maxLength}             // Total number of questions
                    className="mt-4 w-full rounded text-white" // Styling for spacing, width, and appearance
                />
            </div>
        </>
    );
}
