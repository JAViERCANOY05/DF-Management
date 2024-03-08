import React from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPassword, setOpenPassword] = React.useState(false);
  const handleOpenPassword = () => setOpenPassword(true);
  const handleClosePassword = () => setOpenPassword(false);

  const name = localStorage.getItem("firstName");
  const last = localStorage.getItem("lastName");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  return (
    <div>
      <div>
        <p className=" text-center  bg-slate-400 p-5 rounded-lg text-white">Settings</p>
      </div>
      <div>
        <div className=" flex justify-center mt-28">
          <div className=" flex gap-20">
            <button onClick={handleOpen}>
              <div className=" p-32 border-2 bg-slate-400 rounded-lg">
                <div className=" h-10 mx-10">
                  <PersonPinIcon
                    className=" text-white"
                    sx={{
                      fontSize: 40, // Set the font size to control the height
                    }}
                  />
                </div>
                <p className=" font-bold mt-2">Profile Information</p>
              </div>
            </button>
            <button onClick={handleOpenPassword}>
              <div className=" p-32 border-2 bg-slate-400 rounded-lg">
                <div className=" h-10 mx-10">
                  <LockPersonIcon
                    className=" text-white "
                    sx={{
                      fontSize: 40, // Set the font size to control the height
                    }}
                  />
                </div>
                <p className=" text-center font-bold mt-2">
                  Password and Security
                </p>
              </div>
            </button>
          </div>
        </div>
        {/* <div className=" flex justify-center my-20">
          <Link href="/admin/Notification">
            <div className=" p-32 border-2 bg-slate-400 rounded-lg">
              <div className=" h-10 mx-10">
                <CircleNotificationsIcon
                  className=" text-white"
                  sx={{
                    fontSize: 40, // Set the font size to control the height
                  }}
                />
              </div>
              <p className=" text-center font-bold mt-2">Notifications</p>
            </div>
          </Link>
        </div> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className=" text-center font-bold"
          >
            Profile
          </Typography>
          <div>
            <div className="my-2 font-semibold">Role : {role}</div>
            <div className="my-2 font-semibold">First Name : {name}</div>
            <div className="my-2 font-semibold">Last Name : {last}</div>
            <div className="my-2 font-semibold">Email : {email}</div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openPassword}
        onClose={handleClosePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Password and Security
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Settings;
