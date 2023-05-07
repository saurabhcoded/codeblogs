import Footer from "@/layout/components/Footer";
import Navbar from "@/layout/components/Navbar";
import SideDrawer from "./SideDrawer";
import { useGlobalContext } from "@/context/globalContext";
export default function Layout({ children }) {
    const { user } = useGlobalContext();
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