import { APITester } from "./APITester";
import "./assets/style.css";
import { Hero } from "./components/hero";

export function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center relative z-10">
      <Hero />

      <APITester />
    </div>
  );
}

export default App;
