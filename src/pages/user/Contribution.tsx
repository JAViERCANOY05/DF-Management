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
import { useForm, SubmitHandler } from "react-hook-form";
import GetContribution from "../api/getcontribution";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../Notifications";
import DeleteContribution from "../api/deleteContrinbution";

type Inputs = {
  firstName: string;
  lastName: string;
  born: string;
  age: string;
  died: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#1976D2",
  boxShadow: 24,
  p: 4,
  borderRadius: 3, // Adjust the value to change the border radius
};

export default function BasicTable() {
  const [formData, setFormData] = React.useState({
    age: "",
    born: "",
    died: "",
    firstName: "",
    lastName: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const response = await AddContribution.add(token, data);
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

    console.log(data);
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

  console.log(formData.firstName, "2323");
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" h-screen">
      <button
        onClick={handleOpen}
        className="btn btn-active btn-accent text-white"
      >
        <IoIosAddCircle />
        Add Contribution
      </button>
      <TableContainer component={Paper} className=" mb-20 mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Born</TableCell>
              <TableCell align="right">Die</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
                  <TableCell align="right">{data.born}</TableCell>
                  <TableCell align="right">{data.died}</TableCell>
                  <TableCell align="right">{data.age}</TableCell>

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2 className=" text-center bg-[#0C3B68] text-white rounded-lg py-3 my-3">
                Fill up this form
              </h2>
              <div className=" flex gap-5">
                <div>
                  <p className=" mx-2  ">First Name</p>

                  <input
                    className=" rounded-md my-2 py-2"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <span className=" text-white">This field is required</span>
                  )}
                </div>
                <div>
                  <p className=" mx-2  ">Last Name</p>

                  <input
                    className=" rounded-md my-2 py-2"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <span className=" text-white">This field is required</span>
                  )}
                </div>
              </div>
              <div className=" flex gap-5">
                <div>
                  <p className=" mx-2  ">Date Born</p>
                  <input
                    className=" rounded-md my-2 py-2"
                    {...register("born", { required: true })}
                  />
                  {errors.born && (
                    <span className=" text-white">This field is required</span>
                  )}
                </div>
                <div>
                  <p className=" mx-2  ">Date Death</p>

                  <input
                    className=" rounded-md my-2 py-2"
                    {...register("died", { required: true })}
                  />
                  {errors.died && (
                    <span className=" text-white">This field is required</span>
                  )}
                </div>
              </div>
              <div className=" flex justify-center">
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
      <ToastContainer />
    </div>
  );
}
