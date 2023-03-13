import { useQueryClient } from "@tanstack/react-query";
import { getBtc } from "../http/api";
import "./Home.css";

export const Home = () => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({ queryKey: ["btc"], queryFn: () => getBtc() });

  return (
    <div className="container">
      <div>
        <div style={{ fontSize: 90 }}>React Query</div>
        <div style={{ fontSize: 32, color: "whitesmoke" }}>
          server side state management
        </div>
      </div>
      <div>
        <div className="top">
          <span className="first">fetch</span>
          <span className="second">cache</span>
        </div>
        <div>
          <span className="third">synchronize</span>
          <span className="forth">update</span>
        </div>
      </div>
    </div>
  );
};
