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

type Inputs = {
  firstName: string;
  lastName: string;
};
interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  date: string;
}
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
  const [openLeader, setOpenLeader] = React.useState(false);
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
  const handleOpenLeader = () => {
    setOpenLeader(true);
  };
  const handleCloseLeader = () => {
    reset();
    setOpenLeader(false);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    reset();
    setOpenUpdate(false);
  };
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);

  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [id, setId] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data, "s=================");
    const fillForm = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await AddContribution.addBen(token, fillForm);
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
  const onSubmitLeader: SubmitHandler<Inputs> = async (data) => {
    const fillForm = {
      firstName: data.firstName,
      lastName: data.lastName,
      role: "leader",
    };
    console.log(fillForm, ".....................");

    try {
      const token = localStorage.getItem("token");
      const response = await AddContribution.addBen(token, fillForm);
      if (response.status) {
        getData2();
        console.log("Created Successfully !");
        setOpenLeader(false);
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
      const response = await UpdateContribution.updateBen(
        token,
        data,
        formData._id
      );
      if (response.status) {
        getData();
        getData2();
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
      const response = await GetContribution.getBen(token);
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
  const getData2 = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await GetContribution.getBen2(token);
      if (response.status) {
        reset();
        console.log("data is here ! leaderrrrrrrrrrrrrrrrr ");
        console.log(response.response);
        setData2(response.response);
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
      const response = await DeleteContribution.deleteBen(token, id);
      if (response.status) {
        getData();
        getData2();
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
    getData2();
  }, []);

  return (
    <div className=" h-screen">
      <div className=" flex justify-between">
        <div>
          <p className=" text-center border-2 px-20 rounded-md text-white font-bold bg-slate-400 py-3">
            Family Head
          </p>
        </div>
        <div>
          {data2.length === 0 ? (
            <button
              onClick={handleOpenLeader}
              className="btn btn-active btn-accent text-white"
            >
              <IoIosAddCircle />
              Add Family Head
            </button>
          ) : null}
        </div>
      </div>
      <TableContainer component={Paper} className=" mb-20 mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Date Added</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data collected
                </TableCell>
              </TableRow>
            ) : (
              data2.map((data: any, index = 0) => (
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

                  <TableCell align="left">
                    {new Date(data.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </TableCell>

                  <TableCell align="right">
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* //////////////////////////////////////////////////////////////////////////// */}
      <div className=" flex justify-between">
        <div>
          <p className=" text-center border-2 px-20 rounded-md text-white font-bold bg-slate-400 py-3">
            Beneficiaries / Members
          </p>
        </div>
        <div>
          <button
            onClick={handleOpen}
            className="btn btn-active btn-accent text-white"
          >
            <IoIosAddCircle />
            Add Beneficiary
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className=" mb-20 mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Date Added</TableCell>
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

                  <TableCell align="left">
                    {new Date(data.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </TableCell>

                  <TableCell align="right">
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
                <div className="my-2">
                  <p className=" mx-2 text-center  ">First Name</p>
                  <input
                    className=" rounded-md  p-4"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <div className=" text-white">This field is required</div>
                  )}
                </div>
                <div className="my-2">
                  <p className=" mx-2 text-center  ">Last Name</p>
                  <input
                    className=" rounded-md  p-4"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <div className=" text-white">This field is required</div>
                  )}
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
      <Modal
        open={openLeader}
        onClose={handleCloseLeader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitLeader)}>
            /
            <div className="">
              <h2 className=" text-center bg-[#0C3B68] text-white rounded-lg py-3 my-3">
                Family Head
              </h2>

              <div className=" flex justify-center gap-5 mt-5">
                <div className="my-2">
                  <p className=" mx-2 text-center  ">First Name</p>
                  <input
                    className=" rounded-md  p-4"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <div className=" text-white">This field is required</div>
                  )}
                </div>
                <div className="my-2">
                  <p className=" mx-2 text-center  ">Last Name</p>
                  <input
                    className=" rounded-md  p-4"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <div className=" text-white">This field is required</div>
                  )}
                </div>
              </div>
              <div className=" flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setOpenLeader(false)}
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

              <div className=" flex justify-center gap-5 mt-5">
                <div className="my-2">
                  <p className=" mx-2 text-center  ">First Name</p>
                  <input
                    className=" rounded-md  p-4"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <div className=" text-white">This field is required</div>
                  )}
                </div>
                <div className="my-2">
                  <p className=" mx-2 text-center  ">Last Name</p>
                  <input
                    className=" rounded-md  p-4"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <div className=" text-white">This field is required</div>
                  )}
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
