import { Routes, Route, useLocation } from "react-router-dom";
import SimpleNav from "./components/SimpleNav.jsx";
import StarField from "./components/StarField.jsx";
import StarFieldDebugPanel from "./debug/StarFieldDebugPanel.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

export default function App() {
  const location = useLocation();
  const isDetailRoute = location.pathname.startsWith("/projects/");

  const mainClasses = isDetailRoute
    ? "flex-1 overflow-y-auto"
    : "flex-1 overflow-y-auto snap-y snap-mandatory";

  return (
    <div className="h-screen flex flex-col">
      <StarField />
      <StarFieldDebugPanel />
      <ScrollToTop selectors={['[data-scroll-container]']} />
      <SimpleNav />
      <main
        className={`${mainClasses} pt-24 md:pt-28 relative z-10`}
        data-scroll-container
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  );
}
