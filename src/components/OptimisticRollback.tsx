import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getFail, rejectUser } from "../mock/users";
import "./List.css";
import UserList from "./UserList";

const OptimisticRollback = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const queryClient = useQueryClient();
  const [error, setError] = useState<any>("");

  const { data: simpleData } = useQuery({
    queryKey: ["fail"],
    queryFn: () => getFail(),
  });

  const { mutate, isLoading } = useMutation(
    (variables: { firstName: string; lastName: string }) => {
      return rejectUser(variables.firstName, variables.lastName);
    },
    {
      onMutate: async (newUser) => {
        // Cancel any outgoing refetches
        await queryClient.cancelQueries({
          queryKey: ["fail"],
        });
        // Snapshot the previous value
        const prev = queryClient.getQueryData(["fail"]);
        // Optimistically update to the new value
        queryClient.setQueryData(["fail"], (old: any) => {
          return [...old, { ...newUser, _id: "fakeId" }];
        });
        // Return a context object with the snapshotted value
        return { prev };
      },
      onError: (err, _, context) => {
        if (context) {
          queryClient.setQueryData(["fail"], context.prev);
        }
        setError(err);
        console.error(err);
      },
      // Refetch data to get the real data from server if our optimistic update failed
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["fail"] });
      },
    }
  );

  return (
    <>
      <UserList
        mutate={mutate}
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        data={simpleData}
        isLoading={isLoading}
        disabled={isLoading}
      />
      Error message:{" "}
      <div style={{ color: "red", paddingLeft: "1rem" }}>{error}</div>
    </>
  );
};

export default OptimisticRollback;
