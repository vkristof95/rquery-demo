import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import InfinityQuery from "./components/InfinityQuery";
import { Menu } from "./components/Menu";
import Mutate from "./components/Mutate";
import OptimisticRollback from "./components/OptimisticRollback";
import Prefetch from "./components/Prefetch";
import Simple from "./components/Simple";
import SimpleQuery from "./components/SimpleQuery";

const Layout = () => (
  <div className="App">
    <Menu />
    <Outlet />
  </div>
);

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/simple" element={<Simple />}></Route>
        <Route path="/simple-query" element={<SimpleQuery />}></Route>
        <Route path="/prefetch" element={<Prefetch />}></Route>
        <Route path="/inf" element={<InfinityQuery />}></Route>
        <Route path="/mutate" element={<Mutate />}></Route>
        <Route path="/fail" element={<OptimisticRollback />}></Route>
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
