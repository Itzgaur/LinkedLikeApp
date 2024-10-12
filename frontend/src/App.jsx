import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Demo from "./Demo";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Demo />
    </QueryClientProvider>
  );
}

export default App;
