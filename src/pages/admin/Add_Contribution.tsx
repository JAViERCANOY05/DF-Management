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

type Inputs = {
  firstName: string;
  lastName: string;
  born: string;
  age: string;
  died: string;
  deadLine: string;
  amount: string;
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
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [id, setId] = React.useState("");

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
    const date1 = new Date(data.born);
    const date2 = new Date(data.died);
    const date3 = new Date(data.deadLine);
    // Assuming you have a date object
    const formattedDateBorn = date1.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
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
      firstName: data.firstName,
      lastName: data.lastName,
      born: formattedDateBorn,
      died: formattedDateDie,
      age: data.age,
      deadLine: formattedDateLine,
      amount: data.amount,
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
    getData();
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
              <TableCell>First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Amount to Pay</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Date Born</TableCell>
              <TableCell align="left">Date Die</TableCell>
              <TableCell align="left">Status</TableCell>
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
                    {data.firstName}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {data.lastName}
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
                    {data.status === "pending" ? (
                      <p className="bg-red-300 text-center rounded-md">
                        {data.status}
                      </p>
                    ) : (
                      <p className=" text-center bg-green-400 rounded-md">
                        {data.status}
                      </p>
                    )}
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
                    {data.status !== "pending" ? null : (
                      <button
                        onClick={() => handleOpenPayment(data._id)}
                        className="btn btn-active btn-accent mr-3 text-white"
                      >
                        Pay
                      </button>
                    )}

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

                    {/* <button
                      onClick={() => deleteCont(data._id)}
                      className="btn btn-error text-white"
                    >
                      Delete
                    </button> */}
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
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <h2 className=" text-center bg-[#0C3B68] text-white rounded-lg py-3 my-3">
                Fill up this form
              </h2>
              <div className=" flex justify-center gap-5 mt-5">
                <div>
                  <p className=" mx-2  ">First Name</p>

                  <input
                    className=" rounded-md my-2 py-2 "
                    {...register("firstName", { required: true })}
                  />

                  <div>
                    {errors.firstName && (
                      <span className=" text-white">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className=" mx-2  ">Last Name</p>

                  <input
                    className=" rounded-md my-2 py-2"
                    {...register("lastName", { required: true })}
                  />
                  <div>
                    {errors.lastName && (
                      <span className=" text-white">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="">
                  <p className=" mx-2 text-center  ">Age</p>

                  <input
                    className=" rounded-md my-2 py-2"
                    type="number"
                    {...register("age", { required: true })}
                  />
                  {errors.age && (
                    <div className=" text-white">This field is required</div>
                  )}
                </div>
              </div>
              <div className=" flex gap-5 justify-center">
                <div>
                  <p className=" mx-2  ">Date Born</p>
                  <Controller
                    control={control}
                    name="born"
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
                        style={{ padding: "20px" }}
                      />
                    )}
                  />
                  <div>
                    {errors.born && (
                      <span className=" text-white">
                        This field is required
                      </span>
                    )}
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
                        style={{ padding: "20px" }}
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
              <div className=" flex justify-center gap-5">
                <div className="my-2">
                  <p className=" mx-2 text-center  ">Amount</p>
                  <input
                    className=" rounded-md  py-2"
                    type="number"
                    {...register("amount", { required: true })}
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
                        style={{ padding: "20px" }}
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
              <div className="flex justify-center gap-5 mt-5">
                <div>
                  <p className="mx-2">First Name</p>
                  <input
                    className="rounded-md my-2 py-2"
                    {...register("firstName", { required: true })}
                    defaultValue={formData.firstName}
                  />
                  <div>
                    {errors.firstName && (
                      <span className="text-white">This field is required</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="mx-2">Last Name</p>
                  <input
                    className="rounded-md my-2 py-2"
                    {...register("lastName", { required: true })}
                    defaultValue={formData.lastName}
                  />
                  <div>
                    {errors.lastName && (
                      <span className="text-white">This field is required</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="mx-2 text-center">Age</p>
                  <input
                    className="rounded-md my-2 py-2"
                    type="number"
                    {...register("age", { required: true })}
                    defaultValue={formData.age}
                  />
                  <div>
                    {errors.age && (
                      <span className="text-white">This field is required</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-5 justify-center">
                <div>
                  <p className="mx-2">Date Born</p>
                  <Controller
                    control={control}
                    name="born"
                    defaultValue={formData.born}
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
                    {errors.born && (
                      <span className="text-white">This field is required</span>
                    )}
                  </div>
                </div>
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
                    defaultValue={formData.amount}
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
      <Modal
        open={openPayment}
        onClose={handleClosePayment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className=" text-white"
          >
            <p className=" text-center">Payment Transcation</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className=" flex gap-5 justify-center">
              <div className=" mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={name}
                    onChange={handleChangeName}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className=" mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Number
                </label>
                <div className="mt-2">
                  <input
                    value={number}
                    onChange={handleChangeNumber}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className=" flex gap-5 justify-center ">
              <div className=" mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Payment Method
                </label>
                <div className="mt-2">
                  <input
                    value={paymentMethod}
                    onChange={handleChangePaymentMethod}
                    id="paymentMethod"
                    name="paymentMethod"
                    type="text"
                    autoComplete="paymentMethod"
                    required
                    className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className=" mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={handleChangeEmail}
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className=" flex gap-5 justify-center">
              <div className=" mt-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 "
                >
                  Amount to Pay
                </label>
                <div className="mt-2">
                  <input
                    value={amount}
                    onChange={handleChangeAmount}
                    id="amount"
                    name="amount"
                    type="text"
                    autoComplete="amount"
                    required
                    className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className=" flex justify-evenly my-10 gap-5">
              <button
                onClick={() => setOpenPayment(false)}
                className="btn btn-error text-white"
              >
                Back
              </button>
              <button
                onClick={payment}
                className="btn btn-active btn-accent mr-3 text-white"
              >
                Confirm
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
