import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "../Notifications";
import Advance from "../api/advancePayment";
import AddvancePaymentni from "../api/addAdvancePayment";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
type Inputs = {
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
    subject: "",
    message: "",
  });
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = React.useState(null); // State to store the selected image
  const handleImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => {
    reset();
    setOpenUpdate(false);
  };

  const [data, setData] = React.useState([
    {
      advance: {
        amount: "",
      },
      referenceNumber: "",
      date: "",
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data, " data submited ");
    try {
      const token = localStorage.getItem("token");
      const response = await AddvancePaymentni.trans(token, data);

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

  const getAnn = async () => {
    try {
      const toks = localStorage.getItem("token");
      const response = await Advance.user(toks);
      if (response.status) {
        setData(response.response);
      }
    } catch (error) {
      console.log(error, " ");
    }
  };
  const handleOpenTo = () => {
    handleOpen();
    console.log("javierbernadas");
  };
  React.useEffect(() => {
    getAnn();
  }, []);
  console.log(data, "-----------------------");
  return (
    <div className=" h-screen">
      <div className=" flex justify-between">
        <div>
          <p className=" text-center border-2 px-20 rounded-md bg-slate-400 py-3  text-white font-bold">
            Advance Payment
          </p>
        </div>
        <div>
          <button
            onClick={handleOpenTo}
            className="btn btn-active btn-accent text-white"
          >
            + Advance
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className=" mb-20 mt-10">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Payment Advance </TableCell>
              <TableCell>Reference Number</TableCell>
              <TableCell>Date</TableCell>
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
                  <TableCell align="left" component="th" scope="row">
                    Amount : {data.advance.amount}
                    {/* referenceNumber */}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    {data.referenceNumber}
                    {/* referenceNumber */}
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
                Fill up this for Advance Payment
              </h2>
              <div className=" flex justify-center gap-5 flex-col">
                <div className="flex flex-col items-center justify-center">
                  {" "}
                  <div className="flex flex-col">
                    <p className=" mx-2  ">Amount</p>

                    <input
                      className=" rounded-md my-2 py-2 px-20"
                      {...register("amount", { required: true })}
                    />

                    <div>
                      {errors.amount && (
                        <span className=" text-white">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className=" w-1/2">
                    <label
                      htmlFor="image-upload"
                      className="block text-sm font-medium leading-6"
                    >
                      Attach Reciept
                    </label>
                    <div className="mt-2">
                      <input
                        onChange={handleImageChange} // Define this function to handle the image file
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        accept="image/*" // This restricts the file input to image files only
                        className="block w-full text-sm text-gray-900 px-2 py-1.5 rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex justify-center gap-3 ">
                  <button
                    onClick={() => setOpen(false)}
                    className="btn btn-error text-white"
                  >
                    Back
                  </button>
                  <button className="btn btn-active btn-accent text-white">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}
