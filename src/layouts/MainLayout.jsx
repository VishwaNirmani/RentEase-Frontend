
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  const location = useLocation();

  const isDashboard =
    location.pathname.startsWith("/tenant") ||
    location.pathname.startsWith("/owner") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}

      <main className="flex-grow">{children}</main>

      {!isDashboard && <Footer />}
    </div>
  );
}

export default MainLayout;
