import { useEffect, useState } from "react";
import Link from "next/link";

const MyComponent = () => {
  return (
    <div className=" h-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  ">
      <div className="nav-bar flex justify-end  font-bold text-white ">
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
      <div className=" mt-20">
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
          The organization that aids to provide financial assistance. A death is
          assistance <br /> payable to the benificiary of a deceased person. Our
          mission is to help one another
          <br /> in times of unfortunate and greate loss.
        </p>
      </div>
      <div className=" flex justify-center my-10">
        <button className=" bg-yellow-300 py-2.5 px-6 rounded-full  font-bold hover:text-white ">
          More info
        </button>
      </div>
      <div className=" mt-20">
        <div className=" grid grid-cols-12  mt-10 ">
          <div className=" col-span-6">
            <div
              className="relative block mx-32  rounded-lg  h-64 
                      bg-gray-900 group"
            >
              <div
                className="absolute text-center rounded-lg  pt-28  bg-white inset-0 
                            w-full h-64 group-hover:opacity-50"
              >
                <p className=" uppercase mb-20 bg-yellow-300 text-center mx-2 py-2 px-5 text-white font-bold">
                  Trasparency
                </p>
              </div>
              <div className="relative p-10">
                <div className="mt-2">
                  {/* Hidden content */}
                  <div
                    className="transition-all transform 
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0"
                  >
                    <div className="p-2">
                      <p className="text-xl cursor-pointer text-center text-white">
                        We make sure everything <br /> including transaction and
                        <br />
                        disbursement be transform
                        <br /> for more trusted funding.
                      </p>
                    </div>
                  </div>
                  {/* End of hidden content */}
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-6">
            <div
              className="relative block mx-32  rounded-lg  h-64 
                      bg-gray-900 group"
            >
              <div
                className="absolute text-center rounded-lg  pt-28  bg-white inset-0 
                            w-full h-64 group-hover:opacity-50"
              >
                <p className=" uppercase mb-20 bg-yellow-300 text-center mx-2 py-2 px-5 text-white font-bold">
                  Efficiency
                </p>
              </div>
              <div className="relative p-10">
                <div className="mt-2">
                  {/* Hidden content */}
                  <div
                    className="transition-all transform 
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0"
                  >
                    <div className="p-2">
                      <p className="text-xl cursor-pointer text-center text-white">
                        We show how efficient this <br /> death fund
                        organization is <br />
                        through report of how the
                        <br /> process are effective.
                      </p>
                    </div>
                  </div>
                  {/* End of hidden content */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center my-10">
          <div
            className="relative block w-1/4 rounded-lg  h-64 
                      bg-gray-900 group"
          >
            <div
              className="absolute text-center rounded-lg  pt-28  bg-white inset-0 
                            w-full h-64 group-hover:opacity-50"
            >
              <p className=" uppercase mb-20 bg-yellow-300 text-center mx-2 py-2 px-5 text-white font-bold">
                Empathy
              </p>
            </div>
            <div className="relative p-10">
              <div className="mt-2">
                {/* Hidden content */}
                <div
                  className="transition-all transform 
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0"
                >
                  <div className="p-2">
                    <p className="text-xl cursor-pointer text-center text-white">
                      We offer understanding <br />
                      emotional aspects as well <br />
                      as support.
                    </p>
                  </div>
                </div>
                {/* End of hidden content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
