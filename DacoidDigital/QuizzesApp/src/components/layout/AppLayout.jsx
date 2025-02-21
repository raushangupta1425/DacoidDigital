// Importing essential components from React Router and local files
import { Outlet } from "react-router-dom"; // Outlet renders the matched child route
import { Footer } from "./Footer"; // Footer component for consistent layout
import { Header } from "./Header"; // Header component for navigation

// AppLayout component acts as a wrapper for all pages
export const AppLayout = () => {
    return (
        <>
            {/* Header: Contains navigation bar and logo */}
            <Header />

            {/* Main content area where routed pages will be displayed */}
            <main className="min-h-120">
                {/* Outlet serves as a placeholder for nested routes */}
                <Outlet />
            </main>

            {/* Footer: Stays consistent across all pages */}
            <Footer />
        </>
    );
}
