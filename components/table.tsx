import Image from "next/image";
import { BiTrashAlt, BiEdit } from "react-icons/bi";
import { deleteUser, fetchUsers } from "./fetchers";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useUserStore from "@/store/useUserStore";
import { UserSchema } from "@/model/user";

const Table = () => {
  const { isLoading, isError, data, error } = useQuery("users", fetchUsers);
  const { toggleEdit, fetchData } = useUserStore();

  const queryClient = useQueryClient();
  const { mutate: deleteUserMutate } = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const handleDelete = (id: string) => {
    deleteUserMutate(id);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <div>Got Errors, try refreshing...</div>;
  }
  return (
    <table className="min-w-full table-auto scale-75 origin-left overflow-hidden md:scale-100">
      <thead>
        <tr className="bg-gray-700">
          <th className="py-2 min-w-[230px]">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="py-2 min-w-[220px]">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: UserSchema) => {
          const { _id, avatar, date, email, name, salary, status } = item;
          return (
            <tr className="bg-gray-200" key={_id}>
              <td className="py-8 bg-gray-400 grid place-items-center">
                <span className="flex">
                  <Image
                    loader={() => avatar}
                    src={avatar}
                    height={24}
                    width={24}
                    alt="employee image"
                    className="pr-2 rounded-full object-contain"
                  />
                  <span className="">{name}</span>
                </span>
              </td>
              <td className="py-2 px-16">
                <span>{email}</span>
              </td>
              <td className="py-2 px-16">
                <span>${salary}</span>
              </td>
              <td className="py-2 px-16">
                <span>{date}</span>
              </td>
              <td
                className={`py-2 px-16 ${
                  status == "Active" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div
                  className={`${
                    status == "Active" ? "bg-green-500" : "bg-red-500"
                  } rounded-full text-white  py-1 px-5 cursor-pointer`}
                >
                  {status}
                </div>
              </td>
              <td className="py-2 px-16">
                <span className="flex gap-2 items-center justify-around">
                  <button onClick={() => toggleEdit(item)}>
                    <BiEdit size={24} color="rgb(23,200,100)" />
                  </button>
                  <button onClick={() => handleDelete(item._id!)}>
                    <BiTrashAlt size={24} color="rgb(200,50,41)" />
                  </button>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
