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

export type Ledger = {
  id: string;
  subcategory: Subcategory
  account: Account
  transactionType: string
  title: string
  description: string
  date: string
  amount: number
}

export type Subcategory = {
  id: number
  title: string
}

export type ApiClient = {
  getUsers: () => Promise<User[]>;
  deleteUser: (id: any) => Promise<User[]>;
  saveOrUpdateUser: (user: User) => Promise<User[]>;
  getUserById: (user: any) => Promise<User[]>;
  getUserByUsername: (username: string) => Promise<User[]>;
  getUser: (username: string, password: string) => Promise<User[]>;
  getUserAccounts: (username: string) => Promise<Account[]>;
  putNewAccount: (account: Account, username: string) => void;
  updateAccounts: (accounts: Account[], username: string) => void;
  deleteAccounts: (accounts: Account[], username: string) => void;
  getLedgers: () => Promise<Ledger[]>;
  getSubcategoryByCategoryName: (categoryName: string) => Promise<Subcategory[]>;
  saveLedger: (ledger: Ledger) => Promise<User[]>;
  deleteLedger: (id: string) => void;
  updateLedgers: (ledgers: Ledger[]) => void;

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

    getUserByUsername: async (username: string) => {
      const res = await axios.get(`/api/users/username/${username}`);
      return res.data;; 
    },

    getUser: async (username: string, password: string) => {
      const res = await axios.get(
        `/api/users/username/${username}`,
        {
          auth: {
            username: username,
            password: password
          },
        }
      );

      return res.data;
    },

    getUserAccounts: async (username: string) => {
      const res = await axios.get(`/api/accounts/username/${username}`);
      return res.data;
    },

    putNewAccount: async (account: Account, username: string) => {
      console.log("api: ", account);
    
      await axios.put(`/api/accounts/username/${username}`, account).then(function (response) {
        if (response.status === 200) {
          console.log("Update Success");
        }
      })
      .catch(function (response) {
        console.log(response);
      });
    },

    updateAccounts: async (accounts: Account[], username: string) => {
      await axios.put(`/api/accounts/update/username/${username}`, accounts).then(function (response) {
        if (response.status === 200) {
          console.log("Update Success");
        }
      })
      .catch(function (response) {
        console.log(response);
      });;
    },

    deleteAccounts: async (accounts: Account[], username: string) => {
      await axios.put(`/api/accounts/update/username/${username}`, accounts).then(function (response) {
        if (response.status === 200) {
          console.log("Update Success");
        }
      })
      .catch(function (response) {
        console.log(response);
      });;
    },

    getLedgers: async () => {
      const res = await axios.get("/api/ledgers");
      return res.data;
    },

    getSubcategoryByCategoryName: async (categoryName: string) => {
      const res = await axios.get(`/api/ledgers/categoryName/${categoryName}/subcategories`);
      return res.data;
    },

    saveLedger: async (ledger: Ledger) => {
      const res = await axios.post("/api/ledgers", ledger);
      console.log(res.data);
      return res.data;
    },

    deleteLedger: async (id: string) => {
      const res = await axios.delete(`/api/ledgers/${id}`);
      console.log(res.data);
      return res.data;
    },

    updateLedgers: async (ledgers: Ledger[]) => {
      await axios.post("/api/ledgers", ledgers).then(function (response) {
        if (response.status === 200) {
          console.log("Update Success");
        }
      })
      .catch(function (response) {
        console.log(response);
      });;
    }
  }
};
