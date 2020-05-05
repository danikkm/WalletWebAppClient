import axios from "axios";
import UserList from "./UserList";

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
  accounts?: Account[];
};

export type Account = {
  id: string;
  name: string;
  type: string;
  currency: string;
};

export type ApiClient = {
  getUsers: () => Promise<User[]>;
  deleteUser: (id: any) => Promise<User[]>;
  saveOrUpdateUser: (user: User) => Promise<User[]>;
  getUserById: (user: any) => Promise<User[]>;
  getUsersWithLogin: (username: string, password: string) => Promise<User[]>;
};

export const createApiClient = (): ApiClient => {
  return {
    getUsers: async () => {
      const res = await axios.get("/api/users");
      return res.data;
    },

    deleteUser: async (username) => {
      const res = await axios.delete(`/api/users/${username}`);

      console.log(res.data);
      return res.data;
    },

    saveOrUpdateUser: async (user) => {
      const res = await axios.post("/api/users", user);
      console.log(res.data);
      return res.data;
    },

    getUserById: async (userId) => {
      const res = await axios.get(`/api/users/id/${userId}`);
      return res.data;
    },

    getUsersWithLogin: async (username: string, password: string) => {
      const res = await axios.get(
        "/api/users",
        {
          auth: {
            username: username,
            password: password
          },
        }
      );

      return res.data;
    }
  }
};
