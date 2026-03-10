// @ts-expect-error - Bun handles this fine even though TS language server doesn't like it
import logo from "../assets/package-search.png";

/**
 * The hero section of the app.
 */
export function Hero() {
  return (
    <>
      <img
        src={logo}
        alt="Pack Map Logo"
        className="inline p-2 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] bg-neutral-50 rounded-full"
      />

      <h1 className="text-5xl font-bold my-4 leading-tight">Pack Map</h1>
    </>
  );
}
