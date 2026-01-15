import Navbar from "@/components/Shared/Navbar";
import "./globals.css";
import Footer from "@/components/Shared/Footer";

export const metadata = {
    title: "Care.io",
    description: "Created by Mohammad Rashel",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
            <header>
                <Navbar />
            </header>
                
                {children}
                
            <footer>
                <Footer />
            </footer>
                </body>
        </html>
    );
}
