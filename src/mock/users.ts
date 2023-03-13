import { faker } from "@faker-js/faker";

export interface ResponseList<T> {
  items: T[];
  itemsCount: number;
  page: number;
  pageSize: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

function createRandomUser(): User {
  return {
    _id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    /*     _id: "123",
    firstName: "Feri",
    lastName: "Nagy", */
  };
}

const _users = [...Array(500)].map(() => createRandomUser());
const userMutable = [createRandomUser()];
const userFail: any = [];

export const getUsers = (page: number = 0) => {
  const chunked = _users.reduce((resultArray: any, item, index) => {
    const chunkIndex = Math.floor(index / 10);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return new Promise<ResponseList<User>>((resolve) =>
    setTimeout(
      () =>
        resolve({
          items: chunked[page],
          itemsCount: _users.length,
          page: 0,
          pageSize: 10,
        }),
      2000
    )
  );
};

export const getMutableUsers = () => {
  return new Promise<User[]>((resolve) => {
    resolve(userMutable);
  });
};

export const getFail = () => {
  return new Promise((resolve) => {
    resolve(userFail);
  });
};

export const postUser = (firstName: string, lastName: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      userMutable.push({
        _id: faker.datatype.uuid(),
        firstName,
        lastName,
      });
      resolve();
    }, 1000);
  });
};

export const rejectUser = (firstName: string, lastName: string) => {
  return new Promise<void>((_, reject) => {
    setTimeout(() => {
      reject("Server down");
    }, 2000);
  });
};
