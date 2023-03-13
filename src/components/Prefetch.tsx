import { useQuery } from "@tanstack/react-query";
import { Triangle } from "react-loader-spinner";
import { getBtc } from "../http/api";

const Prefetch = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["btc"],
    queryFn: () => getBtc(),
  });

  if (!isLoading && data) {
    return (
      <div>
        <div>BTC Price: </div>
        <div>{data?.bpi.USD.rate} $</div>
        {data.time.updated}
      </div>
    );
  }

  return (
    <Triangle
      visible={true}
      height="100"
      width="100"
      ariaLabel="dna-loading"
      wrapperClass="dna-wrapper"
      color="white"
    />
  );
};

export default Prefetch;
