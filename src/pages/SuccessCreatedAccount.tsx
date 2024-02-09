import React from "react";
import Link from "next/link";

const SuccessCreatedAccount = () => {
  return (
    <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10    ">
      <div className="  pt-96 flex justify-center">
        <div className=" flex  justify-center bg-green-500 text-white  w-96 font-bold py-2 px-4 rounded-md">
          <p className=" p-10 text-3xl text-center w-96">
            Successfully Account Created!
          </p>
        </div>
      </div>
      <div className=" flex justify-center gap-5 my-5">
        <Link href="/">
          <button className="  hover:bg-red-800 rounded-md bg-red-600 py-3 px-5 text-white">
            Back
          </button>
        </Link>
        <Link href="/Login">
          <button className="  hover:bg-blue-800 rounded-md bg-blue-600 py-3 px-5 text-white">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessCreatedAccount;
