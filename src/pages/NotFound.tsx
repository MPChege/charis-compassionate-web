
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      
      <div className="min-h-[70vh] flex items-center justify-center bg-charis-neutral-light py-20">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-charis-blue-dark mb-6">404</h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-charis-blue hover:bg-charis-blue-dark flex items-center">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-charis-blue text-charis-blue hover:bg-charis-blue/10 flex items-center">
              <Link to="/contact">
                <Search className="mr-2 h-5 w-5" />
                Find What You Need
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NotFound;
