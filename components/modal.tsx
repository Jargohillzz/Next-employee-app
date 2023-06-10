import React from "react";
import { BiPlus, BiBrush } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore, { FormData } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "react-query";
import { BodyProp, addUser, updateUser } from "./fetchers";

const schema = z.object({
  firstname: z
    .string()
    .nonempty("Please provide a first name")
    .min(3, "Name must be at least 3 letters"),
  lastname: z
    .string()
    .nonempty("Please provide a last name")
    .min(3, "Name must be at least 3 letters"),
  email: z
    .string()
    .nonempty("email cannot be empty")
    .email("please provide a valid email address"),
  salary: z.number().min(1000, "Below minimum wages"),
  birthday: z.string(),
  status: z.string(),
  avatar: z.string().optional(),
});

const Modal = () => {
  const { defValue, closeModal, isEdit, convertData, editId } = useUserStore();

  const { avatar, birthday, email, firstname, lastname, salary, status } =
    defValue;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    values: {
      firstname,
      lastname,
      salary,
      email,
      status,
      birthday,
      avatar,
    },
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { mutate: updateUserMutate } = useMutation(
    (data: BodyProp) => updateUser(editId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  const { mutate: addUserMutate } = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
  const onSubmit = (data: FormData) => {
    console.log({ data, isEdit });
    const newData = convertData(data);
    isEdit ? updateUserMutate(newData) : addUserMutate(newData);
    closeModal();
  };

  return (
    <div className="modal absolute grid place-items-center inset-0 h-[100vh] bg-transparent">
      <div
        className="overlay absolute inset-0 bg-gray-500 opacity-20"
        onClick={closeModal}
      ></div>
      <div className="modal-container shadow-lg shadow-green-300 rounded-2xl relative z-[2] bg-white min-w-[50vw] min-h-[50vh] ">
        <div
          onClick={closeModal}
          className="absolute cursor-pointer right-3 top-3"
        >
          <FaTimes size={24} color="rgb(255,25,40)" />
        </div>

        <form
          className="mt-[3rem] mb-5 px-3 grid lg:grid-cols-2 gap-4 text-black font-semibold"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="input-type">
            <input
              type="text"
              {...register("firstname")}
              className={`border-2 border-gray-200 bg-gray-100 w-full px-5 py-3  rounded-md 
                        ${
                          errors.firstname
                            ? "focus:outline-red-300 bg-white"
                            : "focus:outline-blue-300"
                        }  `}
              placeholder="FirstName"
            />
            {errors.firstname && (
              <p className="px-3 bg-red-200 text-red-400 tracking-widest">
                {errors.firstname?.message}
              </p>
            )}
          </div>
          <div className="input-type">
            <input
              type="text"
              {...register("lastname")}
              className={`border-2 border-gray-200 bg-gray-100 w-full px-5 py-3  rounded-md 
                        ${
                          errors.lastname
                            ? "focus:outline-red-300 bg-white"
                            : "focus:outline-blue-300"
                        }  `}
              placeholder="LastName"
            />
            {errors.lastname && (
              <p className="px-3 bg-red-200 text-red-400 tracking-widest">
                {errors.lastname.message}
              </p>
            )}
          </div>
          <div className="input-type">
            <input
              type="text"
              {...register("email")}
              className={`border-2 border-gray-200 bg-gray-100 w-full px-5 py-3  rounded-md 
                        ${
                          errors.email
                            ? "focus:outline-red-300 bg-white"
                            : "focus:outline-blue-300"
                        }  `}
              placeholder="Email"
            />
            {errors.email && (
              <p className="px-3 bg-red-200 text-red-400 tracking-widest">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="input-type">
            <input
              type="number"
              {...register("salary", { valueAsNumber: true })}
              className={`border-2 border-gray-200 bg-gray-100 w-full px-5 py-3  rounded-md 
                        ${
                          errors.salary
                            ? "focus:outline-red-300 bg-white"
                            : "focus:outline-blue-300"
                        }  `}
              placeholder="Salary"
            />
            {errors.salary && (
              <p className="px-3 bg-red-200 text-red-400 tracking-widest">
                {errors.salary.message}
              </p>
            )}
          </div>
          <div className="input-type">
            <div className="flex gap-4 items-center pl-5">
              <label htmlFor="birthday">Birthday: </label>
              <input
                id="birthday"
                type="date"
                {...register("birthday")}
                className="border px-5 py-3 focus:outline-none rounded-md"
                placeholder="Birthday"
              />
            </div>
            {errors.birthday && (
              <p className="px-3 bg-red-200 text-red-400 tracking-widest">
                {errors.birthday.message}
              </p>
            )}
          </div>

          <div className="flex gap-10 items-center pl-5 ">
            <div className="form-check">
              <input
                type="radio"
                value="Active"
                id="radioDefault1"
                {...register("status")}
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                htmlFor="radioDefault1"
                className="inline-block tet-gray-800"
              >
                Active
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                value="Inactive"
                id="radioDefault2"
                {...register("status")}
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300  bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label
                htmlFor="radioDefault2"
                className="inline-block tet-gray-800"
              >
                Inactive
              </label>
            </div>
          </div>

          {isEdit ? (
            <button
              type="submit"
              disabled={!isValid}
              className="flex justify-center text-md w-2/6 bg-blue-500 text-white px-4 py-2 
                        border rounded-md hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 
                        disabled:opacity-70 disabled:hover:text-white disabled:bg-gray-500 disabled:hover:bg-gray-500"
            >
              Update
              <span className="px-2">
                <BiBrush size={24} />
              </span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isValid}
              className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 
                        border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500 
                        disabled:opacity-70 disabled:hover:text-white disabled:bg-gray-500 disabled:hover:bg-gray-500"
            >
              Add
              <span className="px-2">
                <BiPlus size={24} />
              </span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Modal;
