import Footer from "@/layout/components/Footer";
import Navbar from "@/layout/components/Navbar";
export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}