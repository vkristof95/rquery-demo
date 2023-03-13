import React from "react";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";
import { getUsers, ResponseList, User } from "../mock/users";
import "./List.css";

const Simple = () => {
  const [data, setData] = useState<ResponseList<User> | undefined>(undefined);

  useEffect(() => {
    const _getUsers = async (page: number = 0) => {
      try {
        const response = await getUsers(page);
        setData(response);
      } catch (err) {
        console.error(err);
      }
    };
    _getUsers();
  }, []);

  if (data) {
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
export default Simple;
