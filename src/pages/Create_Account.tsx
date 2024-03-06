import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PaidIcon from "@mui/icons-material/Paid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "./Notifications";

import { useRouter } from "next/navigation"; // Correct import
import CreateAccount from "./api/create_account";

type Inputs = {
  firtName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  fee: string;
  gender: string;

  exampleRequired: string;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function App() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    gender: "",
    firstName: "",
    lastName: "",
  });

  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const accountCreated = {
      email: data.email,
      password: data.password,
      gender: data.gender,
      firstName: data.firtName,
      lastName: data.firtName,
    };

    setData(accountCreated);
    setOpen(true);
  };
  const handlerCreateAccount = async () => {
    try {
      const response = await CreateAccount.create(data);
      if (response) {
        notifySuccess("Account Created !");
        //  Delay route push by 3 seconds
        setTimeout(() => {
          setOpen(true);
          router.push("/SuccessCreatedAccount");
        }, 2000);
      } else {
        notifyError("Error Creating Account !");

        console.log(data, "2");
      }
    } catch (error: any) {
      notifyError("Network Error !");
    }
  };
  
  const password = useRef({});
  password.current = watch("password");

  return (
    <div className=" h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 py-5  ">
      <div className=" my-20  flex justify-center text-4xl font-bold">
        <h2 className=" text-blue-700">
          Create <span className="  text-yellow-400">Account</span>
        </h2>
      </div>
      <div className=" flex justify-center ">
        <form>
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
            <Link href="/admin/Main">
              <button className="  hover:bg-green-800 rounded-md bg-green-600 py-3 px-5 text-white">
                Back
              </button>
            </Link>
            <button
              // onClick={handleOpen}
              onClick={handleSubmit(onSubmit)}
              className="  hover:bg-blue-800 rounded-md bg-blue-600 py-3 px-5 text-white"
            >
              Continue
            </button>
            {/* <input
              className=" cursor-pointer hover:bg-blue-800 rounded-md bg-blue-600 py-3 px-5 text-white"
              type="submit"
            /> */}
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className=" flex justify-center">
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    <p className=" font-bold text-2xl">Registration Fee</p>
                  </Typography>
                </div>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className=" flex justify-center">
                    <PaidIcon /> <span className=" font-bold">20</span>
                  </div>
                  <div className=" my-5 flex justify-center gap-5">
                    <button
                      onClick={handlerCreateAccount}
                      className="  hover:bg-green-800 rounded-md bg-green-600 py-3 px-5 text-white"
                    >
                      Cash
                    </button>
                    <button
                      onClick={handlerCreateAccount}
                      className="  hover:bg-blue-800 rounded-md bg-blue-600 py-3 px-5 text-white"
                    >
                      GCash
                    </button>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
