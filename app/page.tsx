"use client";
import Table from "@/components/table";
import Modal from "@/components/modal";
import { BiUserPlus } from "react-icons/bi";
import useUserStore from "@/store/useUserStore";
import { QueryClient, QueryClientProvider } from "react-query";
// import type { InferGetStaticPropsType, NextPage } from "next";

const queryClient = new QueryClient();

export type StateProp = {
  isEdit: boolean;
  isOpen: boolean;
  defValue: FormData;
};

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  salary: number;
  birthday: string;
  status: string;
};

// const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({}) => {
const Home = () => {
  const { toggleAdd, isOpen } = useUserStore();

  return (
    <QueryClientProvider client={queryClient}>
      <section className="relative">
        <main className="py-5 container w-[90%] mx-auto">
          <h1 className="text-xl md:text-5xl text-center font-bold py-10">
            Employee Management
          </h1>
          <div className="py-5 border-b-4">
            <div className="">
              <button
                onClick={toggleAdd}
                className="bg-blue-500 flex items-center p-2 rounded-md text-white transition-all duration-300 hover:bg-blue-700"
              >
                Add Employee <BiUserPlus size={24} className="pl-2" />
              </button>
            </div>
          </div>
          <div className={` ${isOpen ? "" : "hidden"}`}>
            <Modal />
          </div>
          <div className=" overflow-x-auto">
            <Table />
          </div>
        </main>
      </section>
    </QueryClientProvider>
  );
};

// export async function getStaticProps(){
//   return{
//     props:{
//       name: "hillz",
//       age: 24
//     }
//   }
// }

export default Home;
