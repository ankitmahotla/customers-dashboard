import { create } from 'zustand'

export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    }
    city: string;
    state: string;
    country: string;
  };
  photoPage: number;
}

interface UserStore {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  page: number;
  fetchUsers: () => Promise<void>;
  setSelectedUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,
  page: 1,
  fetchUsers: async () => {
    const { page, users } = get();
    set({ loading: true });
    try {
      const res = await fetch(`https://randomuser.me/api/?page=${page}&results=20&seed=abc`);
      const data = await res.json();
      const newUsers = [
        ...users,
        ...data.results.map((user: any, index: number) => ({
          ...user,
          photoPage: users.length + index + 1
        }))
      ];
      set({
        users: newUsers,
        page: page + 1,
        loading: false,
        selectedUser: newUsers.length > 0 && !get().selectedUser ? newUsers[0] : get().selectedUser
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      set({ loading: false });
    }
  },
  setSelectedUser: (user) => set({ selectedUser: user }),
}))