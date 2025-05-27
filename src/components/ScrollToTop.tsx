
import { useScrollToTop } from "@/hooks/useScrollAnimation";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const { showScrollTop, scrollToTop } = useScrollToTop();

  if (!showScrollTop) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-charis-blue hover:bg-charis-blue-dark text-white shadow-lg transition-all duration-300 hover:scale-110 animate-fade-in"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default ScrollToTop;
