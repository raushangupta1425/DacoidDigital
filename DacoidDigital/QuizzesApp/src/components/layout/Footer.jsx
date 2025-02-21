// Footer component for the quiz app
export const Footer = () => {
    return (
        // Simple footer with background color, padding, and centered text
        <div className="bg-gray-600 p-3 rounded text-center text-white">
            {/* Footer content */}
            © {new Date().getFullYear()} DacoidDigital. All rights reserved.
        </div>
    );
}
