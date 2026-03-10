import "./assets/style.css";
import { Hero } from "./components/Hero";
import { ImportMapPanel } from "./components/ImportMapPanel";

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <Hero />

      <ImportMapPanel />
    </div>
  );
}

export default App;
