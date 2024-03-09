import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IoIosAddCircle } from "react-icons/io";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../Notifications";
import UpdateContribution from "../api/updateContribution";
import GetAnnouncement from "../api/getAnnouncement";

import AddAnnouncement from "../api/addAnnoucement";
type Inputs = {
  _id: string;
  subject: string;
  message: string;
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
    subject: "",
    message: "",
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
  const [announce, setAnnounce] = React.useState([
    {
      subject: "",
      content: {
        message: "",
        amount: 0,
      },
      date: 0,
    },
  ]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newData = {
      subject: data.subject,
      content: {
        message: data.message,
        amount: 0,
      },
    };
    console.log("yes mao ni ang data ", newData);

    try {
      const token = localStorage.getItem("token");
      const response = await AddAnnouncement.add(token, newData);
      if (response.status) {
        console.log("Done");
        notifySuccess("Announcement Added!");
        reset();
        handleClose();
        getAnn();
      } else {
        console.log("error");
        notifyError("Something went wrong!");
      }
    } catch (error) {
      notifyError("Something went wrong!");
      console.log("error");
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
      const response = await GetAnnouncement.get(token);
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

  const getAnn = async () => {
    try {
      const toks = localStorage.getItem("token");
      const response = await GetAnnouncement.get(toks);
      if (response.status) {
        setAnnounce(response.response);
        console.log(response.response, " 222222222");
      }
    } catch (error) {
      console.log(error, " ");
    }
  };

  React.useEffect(() => {
    getAnn();
  }, []);

  return (
    <div className=" h-screen">
      <div className=" flex justify-between">
        <div>
          <p className=" text-center border-2 px-20 rounded-md bg-slate-400 py-3  text-white font-bold">
            Announcements
          </p>
        </div>
        <div>
          <button
            onClick={handleOpen}
            className="btn btn-active btn-accent text-white"
          >
            <IoIosAddCircle />
            Add Annoucement
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className=" mb-20 mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Subjet</TableCell>
              <TableCell align="left">Message</TableCell>
              <TableCell align="left">Date Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announce.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No data collected
                </TableCell>
              </TableRow>
            ) : (
              announce.map((data: any, index = 0) => (
                <TableRow
                  key={index++}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {data.subject}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {data.content.message}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {new Date(data.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
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
                Fill up this for Announcement
              </h2>
              <div className=" flex justify-center gap-5 mt-5">
                <div>
                  <p className=" mx-2  ">Subject</p>

                  <input
                    className=" rounded-md my-2 py-2 "
                    {...register("subject", { required: true })}
                  />

                  <div>
                    {errors.subject && (
                      <span className=" text-white">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className=" mx-2  ">Message</p>

                  <input
                    className=" rounded-md my-2 py-2"
                    {...register("message", { required: true })}
                  />
                  <div>
                    {errors.message && (
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

      <ToastContainer />
    </div>
  );
}
