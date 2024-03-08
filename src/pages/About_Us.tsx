import { useEffect, useState } from "react";
import Link from "next/link";
import { FaAnglesDown } from "react-icons/fa6";

const MyComponent = () => {
  return (
    <div>
      <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  ">
        <div className="nav-bar  flex justify-end  font-bold text-white ">
          <Link href="/">
            <button className="mx-3 hover:text-yellow-300">Home</button>
          </Link>
          <button className="mx-3 hover:text-yellow-300">About Us</button>
          <Link href="/Services">
            <button className="mx-3 hover:text-yellow-300"> Services</button>
          </Link>
          <Link href="/Contact_Us">
            <button className="mx-3 hover:text-yellow-300"> Contact</button>
          </Link>
          <Link href="/Login">
            <button className="mx-3 hover:text-yellow-300"> Login</button>
          </Link>
        </div>
        <div className=" my-40">
          <div className="  text-center mr-60  text-4xl font-bold  text-yellow-200">
            WERE HERE
          </div>

          <div className=" text-center  ml-20 text-4xl font-bold text-white">
            AS ONE!
          </div>
        </div>
        <div>
          <div>
            <p className=" text-yellow-300 py-5 text-center uppercase text-xl font-semibold">
              In your darkest Times, we offer you our helping hand.
            </p>
          </div>
        </div>
        <div className=" flex justify-center ">
          <p className=" rounded-md  bg-slate-100 py-20 font-bold text-xl px-20 text-center">
            The organization that aids to provide financial assistance. A death
            is assistance <br /> payable to the benificiary of a deceased
            person. Our mission is to help one another
            <br /> in times of unfortunate and greate loss.
          </p>
        </div>
        <div className=" flex justify-center my-10">
          <button className=" animate-bounce  bg-yellow-300 py-2.5 px-6 rounded-full  font-bold hover:text-white ">
            <FaAnglesDown />
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen py-40">
        <div className=" ">
          <div className=" grid grid-cols-12  ">
            <div className=" col-span-6">
              <div
                className="relative block mx-32  rounded-lg  h-64 
                      bg-white group"
              >
                <p className=" uppercase text-center py-5 text-2xl font-bold">
                  Trasparency
                </p>
                <p className="text-xl  text-center text-gray-500  py-5">
                  We make sure everything <br /> including transaction and
                  <br />
                  disbursement be transform
                  <br /> for more trusted funding.
                </p>
              </div>
            </div>
            <div className=" col-span-6">
              <div
                className="relative block mx-32  rounded-lg  h-64 
                      bg-white group"
              >
                <p className=" uppercase text-center py-5 text-2xl font-bold">
                  Efficiency
                </p>
                <p className="text-xl  text-center text-gray-500  py-5">
                  We show how efficient this <br /> death fund organization is{" "}
                  <br />
                  through report of how the
                  <br /> process are effective.
                </p>
              </div>
            </div>
          </div>
          <div className=" flex justify-center my-10">
            <div
              className="relative block px-40  rounded-lg  h-64 
                      bg-white group"
            >
              <p className=" uppercase text-center py-5 text-2xl font-bold">
                Empathy
              </p>
              <p className="text-xl cursor-pointer text-gray-500 text-center py-5">
                We offer understanding <br />
                emotional aspects as well <br />
                as support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
