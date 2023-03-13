import React from "react";
import { Triangle } from "react-loader-spinner";

const UserList = ({
  mutate,
  firstName,
  lastName,
  setFirstName,
  setLastName,
  data,
  isLoading,
  disabled,
}: any) => {
  return (
    <div className="mutate-contianer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            firstName: firstName,
            lastName: lastName,
          });
        }}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
      >
        <input
          type="text"
          placeholder="first name"
          style={{ height: "2rem", fontSize: "1rem" }}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="last name"
          style={{ height: "2rem", fontSize: "1rem" }}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button disabled={disabled} type="submit">
          Add new user
        </button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          width: "15rem",
          border: "1px solid white",
          padding: "1rem",
          overflow: "scroll",
          alignItems: "center",
        }}
      >
        {data?.map((user: any) => (
          <React.Fragment key={user._id}>
            <div style={{ display: "flex", gap: "1rem", fontSize: "24px" }}>
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
            </div>
          </React.Fragment>
        ))}
        {isLoading ? (
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
    </div>
  );
};
export default UserList;
