import { useNavigate } from "react-router-dom";

export function useNavigateWithMetrika() {
  const navigate = useNavigate();

  return (scrollTo = null) => {
    if (window.ym) {
      window.ym(101296472, "hit", "/?fromProject=1");
      window.ym(101296472, "notBounce");
    }

    setTimeout(() => {
      navigate("/", { state: scrollTo ? { scrollTo } : {} });
    }, 100);
  };
}
