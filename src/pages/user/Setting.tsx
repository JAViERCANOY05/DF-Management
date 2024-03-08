import React, { useState } from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IoIosAddCircle } from "react-icons/io";
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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSumbitPassowrd = (e: any) => {
    e.preventDefault();
    console.log(oldPassword, newPassword, " sdsd");
  };

  const handleChangeNew = (event: any) => {
    setNewPassword(event.target.value);
  };
  const handleChangeOld = (event: any) => {
    setOldPassword(event.target.value);
  };

  return (
    <div>
      <div>
        <p className=" text-center  bg-slate-400 p-5 rounded-lg text-white">
          Admin Settings
        </p>
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
          <div className=" mt-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 "
            >
              Old Password
            </label>
            <div className="mt-2">
              <input
                value={oldPassword}
                onChange={handleChangeOld}
                id="oldPassword"
                name="oldPassword"
                type="password"

                autoComplete="oldPassword"
                required
                className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 "
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                value={newPassword}
                onChange={handleChangeNew}
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="newPassword"
                required
                className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className=" flex justify-end mt-5">
            <button
              onClick={handleSumbitPassowrd}
              className="btn btn-active btn-accent text-white"
            >
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Settings;
