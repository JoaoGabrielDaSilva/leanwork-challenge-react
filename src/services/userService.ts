import { User } from "../models/User";

const USER_LIST_KEY = "@leanwork:users";

export const userService = {
  getUsers: () => {
    const rawUsers = localStorage.getItem(USER_LIST_KEY);
    const parsedUsers = (rawUsers ? JSON.parse(rawUsers) : []) as User[];
    return parsedUsers;
  },
  getUser: (cpf: string) => {
    const users = userService.getUsers();

    return users.find((user) => user.cpf === cpf);
  },
  registerUser: (user: User) => {
    const users = userService.getUsers();
    localStorage.setItem(USER_LIST_KEY, JSON.stringify([...users, user]));
  },
  editUser: (cpf: string, data: Partial<Omit<User, "cpf">>) => {
    const users = userService.getUsers();
    const editedUsers = users.map((user) => {
      if (user.cpf === cpf) {
        return {
          ...user,
          ...data,
        };
      }
    });
    localStorage.setItem(USER_LIST_KEY, JSON.stringify(editedUsers));
  },
  deleteUser: (cpf: string) => {
    const users = userService.getUsers();
    const newUsers = users.filter((user) => user.cpf !== cpf);
    localStorage.setItem(USER_LIST_KEY, JSON.stringify(newUsers));
    return newUsers;
  },
};
