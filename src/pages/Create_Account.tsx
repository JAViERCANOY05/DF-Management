import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/navigation"; // Correct import

type Inputs = {
  firtName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  fee: number;
  gender: string;

  exampleRequired: string;
};

export default function App() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    toast.success("Account Created", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(data, "created account");
    // Delay route push by 3 seconds
    setTimeout(() => {
      router.push("/SuccessCreatedAccount");
    }, 3000);
  };
  const password = useRef({});
  password.current = watch("password");
  // console.log(watch("firtName"));

  return (
    <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  ">
      <div className=" my-20  flex justify-center text-4xl font-bold">
        <h2 className=" text-blue-700">
          Create <span className="  text-yellow-400">Account</span>
        </h2>
      </div>
      <div className=" flex justify-center ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          {/* include validation with required or other standard HTML validation rules */}
          <div className=" flex">
            <div>
              <p className=" mx-2 mt-3 mb-1">First Name</p>
              <input
                className=" mx-2 rounded-md py-3 px-10"
                {...register("firtName", { required: true })}
              />
              <div className=" mx-2 text-yellow-500">
                {errors.firtName && <span>This field is required</span>}
              </div>
            </div>
            <div>
              <p className=" mx-2 mt-3 mb-1">Last Name</p>
              <input
                className=" mx-2 rounded-md py-3 px-10"
                {...register("lastName", { required: true })}
              />
              <div className=" mx-2 text-yellow-500">
                {errors.lastName && <span>This field is required</span>}
              </div>
            </div>
          </div>
          <div className=" flex">
            <div>
              <p className=" mx-2 mt-3 mb-1">Enter your email</p>
              <input
                className=" mx-2 rounded-md py-3 px-10"
                {...register("email", { required: true })}
              />
              <div className=" mx-2 text-yellow-500">
                {errors.email && <span>This field is required</span>}
              </div>
            </div>
          </div>
          <div className=" flex">
            <div>
              <p className=" mx-2 mt-3 mb-1">Enter your password</p>
              <input
                // name="password"
                className=" mx-2 rounded-md py-3 px-10"
                type="password"
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password least 8 characters",
                  },
                })}
              />
              <div className=" mx-2 text-yellow-500">
                {errors.password && <p>{errors.password.message}</p>}
              </div>

              {/* <div className=" mx-2 text-yellow-500">
                {errors.password && <span>This field is required</span>}
              </div> */}
            </div>
            <div>
              <p className=" mx-2 mt-3 mb-1">Confirm your password</p>
              <input
                className=" mx-2 rounded-md py-3 px-10"
                type="password"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              <div className=" mx-2 text-yellow-500">
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
                {/* {errors.confirmPassword && <span>This field is required</span>} */}
              </div>
            </div>
          </div>
          <div className=" flex">
            <div>
              <p className=" mx-2 mt-3 mb-1">Registration fee</p>
              <input
                className=" mx-2 rounded-md py-3 px-10"
                {...register("fee", { required: true })}
              />
              <div className=" mx-2 text-yellow-500">
                {errors.fee && <span>This field is required</span>}
              </div>
            </div>
            <div>
              <p className=" mx-2 mt-3 mb-1 ">Gender</p>
              <input
                className=" mx-2 rounded-md py-3 px-10"
                {...register("gender", { required: true })}
              />
              <div className=" mx-2 text-yellow-500">
                {errors.gender && <span>This field is required</span>}
              </div>
            </div>
          </div>
          <div className=" flex justify-end my-8 mx-2 gap-5">
            <Link href="/">
              <button className="  hover:bg-green-800 rounded-md bg-green-600 py-3 px-5 text-white">
                Back
              </button>
            </Link>
            <input
              className=" cursor-pointer hover:bg-blue-800 rounded-md bg-blue-600 py-3 px-5 text-white"
              type="submit"
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
