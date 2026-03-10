import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const queryClient = new QueryClient();

function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <Provider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
