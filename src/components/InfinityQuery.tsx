import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { Triangle } from "react-loader-spinner";
import { getUsers } from "../mock/users";
import "./List.css";

const InfinityQuery = () => {
  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["inf"],
      queryFn: ({ pageParam = 0 }) => getUsers(pageParam),
      getNextPageParam: (lastPage) => lastPage.page + 1,
    });

  if (data && !isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="grid infinity">
          <div className="header">Id</div>
          <div className="header">First name</div>
          <div className="header">Last name</div>
          {data.pages.map((page) =>
            page.items.map((user) => (
              <React.Fragment key={user._id}>
                <div style={{ textAlign: "center" }}>{user._id}</div>
                <div style={{ textAlign: "center" }}>{user.firstName}</div>
                <div style={{ textAlign: "center" }}>{user.lastName}</div>
              </React.Fragment>
            ))
          )}
          {isFetchingNextPage ? (
            <Triangle
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperClass="dna-wrapper"
              color="white"
            />
          ) : null}
        </div>
        <button onClick={() => fetchNextPage()} style={{ width: "25%" }}>
          Load more
        </button>
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
export default InfinityQuery;
