import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsers } from "../mock/users";
import { Triangle } from "react-loader-spinner";
import "./List.css";

const SimpleQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(5),
  });

  if (data && !isLoading) {
    return (
      <div className="grid">
        <div className="header">Id</div>
        <div className="header">First name</div>
        <div className="header">Last name</div>
        {data?.items.map((user) => (
          <React.Fragment key={user._id}>
            <div style={{ textAlign: "center" }}>{user._id}</div>
            <div style={{ textAlign: "center" }}>{user.firstName}</div>
            <div style={{ textAlign: "center" }}>{user.lastName}</div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <>
      {isLoading && !data ? (
        <Triangle
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperClass="dna-wrapper"
          color="white"
        />
      ) : null}
    </>
  );
};
export default SimpleQuery;
