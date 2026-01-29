import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT") return;

      if (e.key === "/") {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }

      if (e.key.toLowerCase() === "f") {
        navigate("/favorites");
      }

      if (e.key.toLowerCase() === "c") {
        navigate("/cart");
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);
};

export default useKeyboardShortcuts;
