import { fetchUsers } from "@/components/fetchers";
import { UserSchema } from "@/model/user";
import { create } from "zustand";

export type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  salary: number;
  birthday: string;
  status: string;
  avatar: string;
};

type ItemProp = {
  name: string;
  avatar: string;
  email: string;
  salary: number;
  date: string;
  status: string;
};

type Store = {
  isEdit: boolean;
  editId: string;
  isOpen: boolean;
  defValue: FormData;
  data: UserSchema[];
  toggleAdd: () => void;
  toggleEdit: (data: UserSchema) => void;
  closeModal: () => void;
  fetchData: () => void;
  convertData: (data: FormData) => UserSchema;
};

const useUserStore = create<Store>((set, get) => ({
  isEdit: false,
  isOpen: false,
  editId: "",
  defValue: {
    firstname: "",
    lastname: "",
    email: "",
    salary: 0,
    birthday: "",
    status: "",
    avatar: "",
  },
  data: [],
  toggleAdd() {
    set((state) => ({
      ...state,
      isOpen: true,
      isEdit: false,
      editId: "",
    }));
  },
  toggleEdit(data) {
    const { _id: id, avatar, name, date, email, salary, status } = data;
    set((state) => ({
      ...state,
      isEdit: true,
      isOpen: true,
      defValue: {
        firstname: name.split(" ")[0],
        lastname: name.split(" ")[1],
        email,
        salary,
        birthday: date,
        status,
        avatar,
      },
      editId: id,
    }));
  },
  closeModal() {
    set((state) => ({
      ...state,
      isEdit: false,
      isOpen: false,
      defValue: {
        birthday: "",
        email: "",
        firstname: "",
        lastname: "",
        salary: 0,
        status: "",
        avatar: "",
      },
    }));
  },
  fetchData() {
    fetchUsers()
      .then((data) => {
        set((state) => ({
          ...state,
          data: data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  convertData(data) {
    const isEdit = get().isEdit;
    const {
      avatar,
      birthday: date,
      email,
      firstname,
      lastname,
      salary,
      status,
    } = data;
    return {
      avatar: isEdit
        ? avatar
        : `https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 10
          )}.jpg`,
      date,
      email,
      name: firstname + " " + lastname,
      salary,
      status,
    };
  },
}));

export default useUserStore;
