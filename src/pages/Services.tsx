import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  ">
      <div className="nav-bar flex justify-end  font-bold text-white ">
        <Link href="/">
          <button className="mx-3 hover:text-yellow-300">Home</button>
        </Link>
        <Link href="/About_Us">
          <button className="mx-3 hover:text-yellow-300">About Us</button>
        </Link>

        <button className="mx-3 hover:text-yellow-300"> Services</button>
        <Link href="/Contact_Us">
          <button className="mx-3 hover:text-yellow-300"> Contact</button>
        </Link>
        <Link href="/Login">
          <button className="mx-3 hover:text-yellow-300"> Login</button>
        </Link>
      </div>
      <div className=" mt-20">
        <div className="  text-left mx-72 my-2 text-4xl font-bold text-white">
          WEB-BASED
        </div>
        <div className=" flex justify-center  text-4xl my-2 font-bold ">
          <p className=" px-12 py-2 text-yellow-200">DEATH FUND MANAGEMENT</p>
        </div>
        <div className=" text-right mx-60 text-4xl my-2 font-bold text-white">
          SERVICES
        </div>
      </div>
      <div className="  my-10 mt-20  pt-10 flex justify-center">
        <div>
          <Link href="/Account_Creation_Management ">
            <button className=" py-32  mx-10 w-96 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm dark:bg-blue-600 font-bold dark:hover:bg-blue-700 focus:outline-none  dark:focus:ring-blue-800 uppercase">
              account creation and management
            </button>
          </Link>
          <Link href="/Benificiary_Management">
            <button className="  mx-10 w-96 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm  py-32  dark:bg-blue-600 font-bold dark:hover:bg-blue-700 focus:outline-none  dark:focus:ring-blue-800 uppercase">
              benificiary management
            </button>
          </Link>
          <Link href="/Notification">
            <button className="  mx-10 w-96 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm  py-32  dark:bg-blue-600 font-bold dark:hover:bg-blue-700 focus:outline-none  dark:focus:ring-blue-800 uppercase">
              notification
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
