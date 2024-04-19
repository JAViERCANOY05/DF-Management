import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddContribution from "../api/addContribution";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import GetContribution from "../api/getcontribution";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../Notifications";
import DeleteContribution from "../api/deleteContrinbution";
import DatePicker from "react-multi-date-picker";
import UpdateContribution from "../api/updateContribution";
import Payment from "../api/payment";
import SingleSelectUser from "../helper/dropdown";

import CircularProgress from "@mui/material/CircularProgress";

type Inputs = {
  died: string;
  deadLine: string;
  amount: string;
  user: any;
};
const language: string = "en";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#1976D2",
  boxShadow: 24,
  p: 4,
  borderRadius: 3, // Adjust the value to change the border radius
};

export default function BasicTable() {
  const [formData, setFormData] = React.useState({
    _id: "",
    age: "",
    born: "",
    died: "",
    firstName: "",
    lastName: "",
    deadLine: "",
    amount: "",
  });
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const [openPayment, setOpenPayment] = React.useState(false);
  const handleOpenPayment = (id: any) => {
    console.log(id);
    setId(id);
    setOpenPayment(true);
  };
  const handleClosePayment = () => setOpenPayment(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    reset();
    setOpenUpdate(false);
  };
  const [data, setData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [id, setId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [dots, setDots] = React.useState(""); // State to hold the dots
  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };
  const handleChangePaymentMethod = (event: any) => {
    setPaymentMethod(event.target.value);
  };
  const handleChangeNumber = (event: any) => {
    setNumber(event.target.value);
  };

  const handleChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const handleChangeAmount = (event: any) => {
    setAmount(event.target.value);
  };

  const payment = async (e: any) => {
    e.preventDefault();
    try {
      const newData = {
        name: name,
        number: number,
        paymentMethod: paymentMethod,
        email: email,
        amount: amount,
      };
      const token = localStorage.getItem("token");
      const response = await Payment.pay(token, id, newData);
      if (response.status) {
        notifySuccess("Successfully Paid!");
        console.log("goods");
        getData();
        handleClosePayment();
        setName("");
        setNumber("");
        setPaymentMethod("");
        setEmail("");
        setAmount("");
      } else {
        notifyError("someting went wrong");
        console.log("error");
      }
    } catch (error) {
      notifyError("someting went wrong");
      console.log("error");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data.user, "========================================");
    const date2 = new Date(data.died);
    const date3 = new Date(data.deadLine);
    // Assuming you have a date object

    const formattedDateDie = date2.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const formattedDateLine = date3.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const fillForm = {
      died: formattedDateDie,
      deadLine: formattedDateLine,
      amount: data.amount,
      user: data.user,
    };
    console.log(fillForm);

    try {
      const token = localStorage.getItem("token");
      const response = await AddContribution.add(token, fillForm);
      if (response.status) {
        getData();
        console.log("Created Successfully !");
        setOpen(false);
        notifySuccess("Created Successfully !");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error 1 ");
      notifyError("Something went wrong!");
    } finally {
      // Set loading to false when operation is complete or fails
      setLoading(false);
    }
  };
  const onSubmitUpdate: SubmitHandler<Inputs> = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UpdateContribution.update(
        token,
        data,
        formData._id
      );
      if (response.status) {
        getData();
        setOpenUpdate(false);
        notifySuccess(response.response.message);
      } else {
        notifyError("Something went wrong!");
      }
    } catch (error) {
      notifyError("Something went wrong!");
    }
  };

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await GetContribution.get(token);
      if (response.status) {
        reset();
        console.log("data is here ! ");
        console.log(response.response);
        setData(response.response);
      } else {
        console.log("error ");
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await GetContribution.getUsers(token);
      if (response.status) {
        reset();
        console.log("Users ! ");
        console.log(response.response);
        setUsers(response.response);
      } else {
        console.log("error ");
      }
    } catch (error) {
      console.log("error ", error);
    }
  };
  const handleUpdate = (id: any) => {
    handleOpenUpdate();
    setFormData(id);
    console.log(id, "update");
  };
  const deleteCont = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await DeleteContribution.delete(token, id);
      if (response.status) {
        getData();
        notifySuccess("Successfully Delete ! ");
      } else {
        notifyError("Something went wrong!");
      }
    } catch (error) {
      notifyError("Something went wrong!");
      console.log(error);
    }
  };

  const handlePaymeny = () => {
    notifyError("UnderCodingPa : ) ");
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Function to update the dots
      setDots((prevDots) => (prevDots === "...." ? "" : prevDots + "."));
    }, 500); // Adjust the interval duration as needed

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  React.useEffect(() => {
    getData();
    getUsers();
  }, []);

  return (
    <div className=" h-screen">
      <div className=" flex justify-between">
        <div>
          <p className=" text-center border-2 px-20 rounded-md text-white font-bold bg-slate-400 py-3">
            Contribution
          </p>
        </div>
        <div>
          <button
            onClick={handleOpen}
            className="btn btn-active btn-accent text-white"
          >
            <IoIosAddCircle />
            Add Contribution
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className=" mb-20 mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Amount to Pay</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Date Born</TableCell>
              <TableCell align="left">Date Die</TableCell>

              <TableCell align="left">Date Deadline</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data collected
                </TableCell>
              </TableRow>
            ) : (
              data.map((data: any, index = 0) => (
                <TableRow
                  key={index++}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.lastName.charAt(0).toUpperCase() +
                      data.lastName.slice(1)}{" "}
                    {data.firstName.charAt(0).toUpperCase() +
                      data.firstName.slice(1)}
                  </TableCell>

                  <TableCell align="left" component="th" scope="row">
                    ₱ {data.amount}
                  </TableCell>
                  <TableCell align="left">{data.age}</TableCell>

                  <TableCell align="left">
                    {new Date(data.born).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(data.died).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </TableCell>

                  <TableCell align="left">
                    {data.countDown <= 0 ? (
                      <p className="bg-red-300 text-center rounded-md">
                        Already Due
                      </p>
                    ) : (
                      <p className=" text-center bg-green-400 rounded-md">
                        {data.countDown} Days left
                      </p>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    {data.release ? (
                      <div className="bg-blue-200 flex  justify-center items-center">
                        {" "}
                        <p>Release</p>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleUpdate(data)}
                          className="btn btn-active btn-primary mr-3"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteCont(data._id)}
                          className="btn btn-error text-white"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <div className="flex h-screen items-center justify-center flex-col gap-6">
            <CircularProgress />
            <p className=" text-3xl text-white">Please Wait{dots}</p>
          </div>
        ) : (
          <Box sx={style}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <h2 className=" text-center bg-[#0C3B68] text-white rounded-lg py-3 my-3">
                  Fill up this form
                </h2>

                <div className=" flex gap-5 justify-center mt-2">
                  <div className="">
                    <h1 className="mx-2">Search a User</h1>

                    <div className="bg-white w-56 border rounded-md p-1 ">
                      {" "}
                      {/* Adjust width and add border */}
                      <Controller
                        name="user"
                        control={control}
                        rules={{ required: "User selection is required" }} // Adding a validation rule
                        render={({ field }) => (
                          <SingleSelectUser
                            users={users}
                            value={field.value}
                            onChange={(user) => field.onChange(user)}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <p className=" mx-2  ">Date Death</p>

                    <Controller
                      control={control}
                      name="died"
                      rules={{ required: true }} //optional
                      render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                      }) => (
                        <DatePicker
                          value={value || ""}
                          onChange={(date: any) => {
                            onChange(date?.isValid ? date : "");
                          }}
                          // Add margin and padding to the input field
                          style={{ padding: "32px" }}
                        />
                      )}
                    />
                    <div>
                      {errors.died && (
                        <span className=" text-white">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" flex justify-center gap-5 mt-5">
                  <div className="my-2 ">
                    <p className=" mx-2 text-center  ">Amount</p>
                    <input
                      className=" rounded-md  p-4"
                      type="number"
                      {...register("amount", { required: true })}
                      readOnly
                      defaultValue={20}
                    />
                    {errors.amount && (
                      <div className=" text-white">This field is required</div>
                    )}
                  </div>
                  <div className=" my-2">
                    <p className=" mx-2 text-center  ">Deadline</p>
                    <Controller
                      control={control}
                      name="deadLine"
                      rules={{ required: true }} //optional
                      render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                      }) => (
                        <DatePicker
                          value={value || ""}
                          onChange={(date: any) => {
                            onChange(date?.isValid ? date : "");
                          }}
                          // Add margin and padding to the input field
                          style={{ padding: "26px" }}
                        />
                      )}
                    />
                    <div>
                      {errors.died && (
                        <span className=" text-white">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="btn btn-error text-white"
                  >
                    Back
                  </button>
                  <button
                    // onClick={handleOpen}
                    className="btn btn-active btn-accent text-white"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </Box>
        )}
      </Modal>
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      <Modal
        className="update-modal"
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div>
              <h2 className="text-center bg-[#0C3B68] text-white rounded-lg py-3 my-3">
                Update Information
              </h2>

              <div className="flex gap-5 justify-center">
                <div>
                  <p className="mx-2">Date Death</p>
                  <Controller
                    control={control}
                    name="died"
                    defaultValue={formData.died}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        value={value}
                        onChange={(date: any) =>
                          onChange(date?.isValid ? date : "")
                        }
                        style={{ padding: "20px" }}
                      />
                    )}
                  />
                  <div>
                    {errors.died && (
                      <span className="text-white">This field is required</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-5">
                <div className="my-2">
                  <p className="mx-2 text-center">Amount</p>
                  <input
                    className="rounded-md py-2"
                    type="number"
                    {...register("amount", { required: true })}
                    readOnly
                    defaultValue={20}
                  />
                  <div>
                    {errors.amount && (
                      <span className="text-white">This field is required</span>
                    )}
                  </div>
                </div>
                <div className="my-2">
                  <p className="mx-2 text-center">Deadline</p>
                  <Controller
                    control={control}
                    name="deadLine"
                    defaultValue={formData.deadLine}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        value={value}
                        onChange={(date: any) =>
                          onChange(date?.isValid ? date : "")
                        }
                        style={{ padding: "20px" }}
                      />
                    )}
                  />
                  <div>
                    {errors.deadLine && (
                      <span className="text-white">This field is required</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setOpenUpdate(false)}
                  className="btn btn-error text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-active btn-accent text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}
