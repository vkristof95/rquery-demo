import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getMutableUsers, postUser } from "../mock/users";
import "./List.css";
import UserList from "./UserList";

const Mutate = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName2, setFirstName2] = useState("");
  const [lastName2, setLastName2] = useState("");
  const queryClient = useQueryClient();

  const { data: simpleData } = useQuery({
    queryKey: ["mutable-users", 1],
    queryFn: () => getMutableUsers(),
  });

  const { data: optimisticData } = useQuery({
    queryKey: ["mutable-users", 2],
    queryFn: () => getMutableUsers(),
  });

  const { mutate: simpleMutate, isLoading } = useMutation(
    (variables: { firstName: string; lastName: string }) =>
      postUser(variables.firstName, variables.lastName),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["mutable-users", 1] });
        queryClient.invalidateQueries({ queryKey: ["mutable-users", 2] });
      },
    }
  );

  const { mutate: optimisticMutate, isLoading: isOptimisticLoading } =
    useMutation(
      (variables: { firstName: string; lastName: string }) => {
        return postUser(variables.firstName, variables.lastName);
      },
      {
        onMutate: async (newUser) => {
          // Cancel any outgoing refetches
          await queryClient.cancelQueries({ queryKey: ["mutable-users", 2] });
          // Snapshot the previous value
          const prev = queryClient.getQueryData(["mutable-users", 2]);
          // Optimistically update to the new value
          queryClient.setQueryData(["mutable-users", 2], (old: any) => {
            return [...old, { ...newUser, _id: "fakeId" }];
          });
          // Return a context object with the snapshotted value
          return { prev };
        },
        // Refetch data to get the real data from server if our optimistic update failed
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["mutable-users", 2] });
        },
      }
    );

  return (
    <>
      <UserList
        mutate={simpleMutate}
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        data={simpleData}
        isLoading={isLoading}
        disabled={isLoading || isOptimisticLoading}
      />
      <UserList
        mutate={optimisticMutate}
        firstName={firstName2}
        lastName={lastName2}
        setFirstName={setFirstName2}
        setLastName={setLastName2}
        data={optimisticData}
        isLoading={isLoading}
        disabled={isLoading || isOptimisticLoading}
      />
    </>
  );
};

export default Mutate;
