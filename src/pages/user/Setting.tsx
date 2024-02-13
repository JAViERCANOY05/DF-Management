import React from "react";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Link from "next/link";

const Settings = () => {
  return (
    <div>
      <div>
        <div className=" flex justify-center mt-28">
          <div className=" flex gap-20">
            <Link href="/user/User_Profile">
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
            </Link>
            <Link href="/user/Password_Security">
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
            </Link>
          </div>
        </div>
        <div className=" flex justify-center my-20">
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
        </div>
      </div>
    </div>
  );
};

export default Settings;
