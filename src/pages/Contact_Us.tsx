import { useEffect, useState } from "react";
import Link from "next/link";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const MyComponent = () => {
  return (
    <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  ">
      <div className="nav-bar flex justify-end  font-bold text-white ">
        <Link href="/">
          <button className="mx-3 hover:text-yellow-300">Home</button>
        </Link>
        <Link href="/About_Us">
          <button className="mx-3 hover:text-yellow-300">About Us</button>
        </Link>
        <Link href="/Services">
          <button className="mx-3 hover:text-yellow-300"> Services</button>
        </Link>
        <button className="mx-3 hover:text-yellow-300"> Contact</button>
        <Link href="/Login">
          <button className="mx-3 hover:text-yellow-300"> Login</button>
        </Link>
      </div>
      <div className=" mt-20">
        <div className=" uppercase  text-center mr-28  text-4xl font-bold  text-yellow-200">
          Contact
        </div>

        <div className=" text-center  ml-20 text-4xl font-bold text-white">
          US
        </div>
      </div>
      <div>
        <div>
          <p className=" text-white  text-xl py-5 my-10 text-center uppercase  font-semibold">
            if you need assistance, do not hisatate to call
            <br /> and chat with the admin
          </p>
        </div>
      </div>
      <div className=" flex justify-center gap-10  my-20 ">
        <div
          className="relative block rounded-lg w-1/4 h-64 
                      bg-gray-900 group"
        >
          <div
            className="absolute rounded-lg cursor-pointer  text-center pt-28 bg-blue-700 inset-0 
                            w-full h-64 group-hover:opacity-50"
          >
            <LocalPhoneIcon
              className=" text-white"
              sx={{
                fontSize: 40, // Set the font size to control the height
              }}
            />
          </div>
          <div className="relative p-10">
            <div className="mt-2">
              {/* Hidden content */}
              <div
                className="transition-all
                 transform 
                 bg-blue-700
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0"
              >
                <div className="p-2">
                  <p className="text-xl text-center cursor-pointer text-white">
                    +63-998-765-4321
                  </p>
                </div>
              </div>
              {/* End of hidden content */}
            </div>
          </div>
        </div>
        <div
          className="relative block w-1/4 rounded-lg  h-64  cursor-pointer
                      bg-gray-900 group"
        >
          <div
            className="absolute text-center rounded-lg  pt-28  bg-blue-700 inset-0 
                            w-full h-64 group-hover:opacity-50"
          >
            <EmailIcon
              className=" text-white"
              sx={{
                fontSize: 40, // Set the font size to control the height
              }}
            />
          </div>
          <div className="relative p-10">
            <div className="mt-2">
              {/* Hidden content */}
              <div
                className="transition-all transform 
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0
                                bg-blue-700
                                "
              >
                <div className="p-2">
                  <p
                    className="text-xl text-center cursor-pointer text-white
                  
                  "
                  >
                    rosemariego@gmail.com
                  </p>
                </div>
              </div>
              {/* End of hidden content */}
            </div>
          </div>
        </div>
        <div
          className="relative block w-1/4 cursor-pointer rounded-lg   h-64 
                      bg-gray-900 group"
        >
          <div
            className="absolute rounded-lg  text-center pt-28  bg-blue-700 inset-0 
                            w-full h-64 group-hover:opacity-50"
          >
            <LocationOnIcon
              className=" text-white"
              sx={{
                fontSize: 40, // Set the font size to control the height
              }}
            />
          </div>
          <div className="relative p-10">
            <div className="mt-2">
              {/* Hidden content */}
              <div
                className="transition-all transform 
                                translate-y-8 opacity-0 
                                group-hover:opacity-100 
                                group-hover:translate-y-0
                                bg-blue-700"
              >
                <div className="p-2">
                  <p className="text-xl text-center cursor-pointer text-white">
                    Purok 4 Lungsudaan,Candijay, Bohol
                  </p>
                </div>
              </div>
              {/* End of hidden content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
