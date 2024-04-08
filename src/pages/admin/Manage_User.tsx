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
import GetUser from "../api/getUser";
type Inputs = {
  firstName: string;
  lastName: string;
  born: string;
  age: string;
  died: string;
  dateBorn: string;
  dateDie: string;
  deadLine: string;
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
    dateBorn: "",
    dateDie: "",
    deadLine: "",
  });
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => {
    reset();
    setOpenUpdate(false);
  };
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const date1 = new Date(data.dateBorn);
    const date2 = new Date(data.dateDie);
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
      const response = await DeleteContribution.user(token, id);
      if (response.status) {
        getData();
        notifySuccess("Successfully Delete ! ");
        getUser();
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

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await GetUser.user(token);
      if (response.status) {
        setUser(response.response);
        console.log(response.response, " userssssssssssss");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className=" h-screen">
      <div className=" flex justify-between">
        <div>
          <p className=" text-center border-2 px-20 rounded-md bg-slate-400 py-3  text-white font-bold">
            Members
          </p>
        </div>
        <div>
          <Link
            href="/Create_Account"
            // onClick={handleOpen}
            className="btn btn-active btn-accent text-white"
          >
            <IoIosAddCircle />
            Add Member
          </Link>
        </div>
      </div>
      <TableContainer component={Paper} className=" mb-20 mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell align="left">Email</TableCell>

              <TableCell align="left">Date join</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data collected
                </TableCell>
              </TableRow>
            ) : (
              user.map((data: any, index = 0) => (
                <TableRow
                  key={index++}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    {data.lastName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.firstName}
                  </TableCell>

                  <TableCell align="left" component="th" scope="row">
                    {data.email}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(data.dateJoin).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </TableCell>

                  {/* <TableCell align="right">
                    {new Date(data.deadLine).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </TableCell> */}

                  <TableCell align="right">
                    {/* <button
                      onClick={handlePaymeny}
                      className="btn btn-active btn-accent mr-3 text-white"
                    >
                      Payment
                    </button> */}

                    {/* <button
                      onClick={() => handleUpdate(data)}
                      className="btn btn-active btn-primary mr-3"
                    >
                      Update
                    </button> */}

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
                    name="dateBorn"
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
                    {errors.dateBorn && (
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
                    name="dateDie"
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
                    {errors.dateDie && (
                      <span className=" text-white">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className=" flex justify-center">
                <div className=" mt-5">
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
                    {errors.dateDie && (
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

      <Modal
        className="update-modal"
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className="">
              <h2 className=" text-center bg-green-400 text-black rounded-lg py-3 my-3">
                Update Information
              </h2>
              <div className=" flex justify-center gap-5 mt-5">
                <div>
                  <p className=" mx-2  ">First Name</p>

                  <input
                    className=" rounded-md my-2 py-2 "
                    {...register("firstName", { required: true })}
                    defaultValue={formData.firstName}
                  />
                </div>
                <div>
                  <p className=" mx-2  ">Last Name</p>

                  <input
                    className=" rounded-md my-2 py-2"
                    {...register("lastName", { required: true })}
                    defaultValue={formData.lastName}
                  />
                </div>
                <div className="">
                  <p className=" mx-2 text-center  ">Age</p>

                  <input
                    className=" rounded-md my-2 py-2"
                    {...register("age", { required: true })}
                    defaultValue={formData.age}
                  />
                </div>
              </div>
              <div className=" flex gap-5 justify-center">
                <div>
                  <p className=" mx-2  ">Date Born</p>
                  <Controller
                    control={control}
                    name="dateBorn"
                    defaultValue={formData.born}
                    rules={{ required: true }} //optional
                    render={({
                      field: { onChange, name, value },
                      fieldState: { invalid, isDirty }, //optional
                      formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                      <DatePicker
                        value={value}
                        onChange={(date: any) => {
                          onChange(date?.isValid ? date : "");
                        }}
                        // Add margin and padding to the input field
                        style={{ padding: "20px" }}
                      />
                    )}
                  />
                </div>
                <div>
                  <p className=" mx-2  ">Date Death</p>

                  <Controller
                    control={control}
                    name="dateDie"
                    defaultValue={formData.died}
                    rules={{ required: true }} //optional
                    render={({
                      field: { onChange, name, value },
                      fieldState: { invalid, isDirty }, //optional
                      formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                      <DatePicker
                        value={value}
                        onChange={(date: any) => {
                          onChange(date?.isValid ? date : "");
                        }}
                        // Add margin and padding to the input field
                        style={{ padding: "20px" }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className=" flex justify-center">
                <div className=" mt-5">
                  <p className=" mx-2 text-center  ">Deadline</p>

                  <Controller
                    control={control}
                    name="deadLine"
                    defaultValue={formData.deadLine}
                    rules={{ required: true }} //optional
                    render={({
                      field: { onChange, name, value },
                      fieldState: { invalid, isDirty }, //optional
                      formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                      <DatePicker
                        value={value}
                        onChange={(date: any) => {
                          onChange(date?.isValid ? date : "");
                        }}
                        // Add margin and padding to the input field
                        style={{ padding: "20px" }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className=" flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setOpenUpdate(false)}
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
      <ToastContainer />
    </div>
  );
}
