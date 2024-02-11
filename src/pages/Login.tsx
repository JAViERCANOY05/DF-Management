import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";
import { useRouter } from "next/navigation"; // Correct import
import LoginAPI from "./api/logi_api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DiamondIcon from "@mui/icons-material/Diamond";
import { notifyError, notifySuccess, notifyWarning } from "./Notifications";

const Home = () => {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submitted credentials:", formData);

    try {
      const response = await LoginAPI.logIn(formData);
      if (response.email === "admin@bisu.com") {
        console.log("Welcome :12", response.email);
        router.push("/admin/Main");
      } else {
        console.log("Welcome : ", response.email);
        router.push("/user");
      }
    } catch (err: any) {
      notifyError("Wrong credentials");
      console.log("Wrong credentials");
    }
  };
  return (
    <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10    ">
      <div className="flex  min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-10">
          <div className="mx-auto flex  justify-center text-white h-10 w-auto">
            <DiamondIcon />
          </div>
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
            Welcome <span className=" text-blue-700"> Back !</span>
          </h2>
        </div>

        <div className="mt-10  sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            action="#"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={formData.email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-white hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full font-bold px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link href="/Create_Account">
              <button className="font-semibold leading-6 text-white hover:text-black">
                Dont have an Account ? Create Account
              </button>
            </Link>
          </p>
        </div>
        <div className=" flex justify-center my-10">
          <Link href="/">
            <button
              type="submit"
              className="flex   justify-center rounded-md bg-green-600 px-5 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Home Page
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
