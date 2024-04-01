import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Dashboard from "./Dashboard";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useRef } from "react";
import { notifySuccess, notifyWarning, notifyError } from "../Notifications";

import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChangePass from "../api/change_password";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Correct import

const drawerWidth = 240;

interface display {
  name: string;
  icon: any;
  href: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const component: display[] = [
  {
    name: "Dashboard",
    icon: <InboxIcon />,
    href: "Dashboard",
  },

  // Add more trees as needed
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [displayComponent, setDisplayComponent] = useState(<Dashboard />);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const token = localStorage.getItem("token");

    const newPassword = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    console.log("submit", newPassword);

    try {
      const response = await ChangePass.changePassword(newPassword, token);
      notifySuccess("Password changed successfully.");
      setTimeout(() => {
        router.push("/user");
      }, 2000);
    } catch (err: any) {
      notifyError("Something Went Wrong !");
      console.log("Something Went Wrong ! ");
    }
  };

  const newPassword = useRef({});
  newPassword.current = watch("newPassword");

  return (
    <div className=" h-screen">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Web-Based Death Fund Management
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {component.map((text, index) => (
              <ListItem
                key={index + 1}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <Link
                    href="/user"
                    className="  flex justify-center items-center  "
                  >
                    <ListItemIcon
                      className={
                        open
                          ? "mx-0  text-[#03396C]"
                          : "   hover:text-[#03396C]"
                      }
                      sx={{
                        minWidth: 0,
                        mr: open ? 1 : 0,
                        justifyContent: "center ",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      className={open ? "mx-8 " : "mx-0"}
                      primary={text.name}
                      sx={{ opacity: open ? 1 : 0 }}
                      style={{ display: open ? "block" : "none " }}
                    />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <div className=" flex justify-center  ">
            <p className=" border-2 p-5 w-96 rounded-md font-bold text-center bg-blue-500 text-white ">
              Password and Security
            </p>
          </div>
          <div className=" flex justify-center ">
            <div className=" flex gap-20 border-2 px-60  mt-20 py-10  rounded-md bg-slate-400 ">
              <div className=" flex justify-center ">
                <form>
                  {/* register your input into the hook by invoking the "register" function */}

                  {/* include validation with required or other standard HTML validation rules */}
                  <div className=" flex">
                    <div>
                      <p className=" mx-2 mt-3 mb-1">Current password</p>
                      <input
                        // name="password"
                        className=" mx-2 rounded-md py-3 px-10"
                        type="currentPassword"
                        {...register("currentPassword", {
                          required: "You must specify a password",
                          minLength: {
                            value: 8,
                            message: "Password least 8 characters",
                          },
                        })}
                      />
                      <div className=" mx-2 text-black">
                        {errors.currentPassword && (
                          <p>{errors.currentPassword.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" flex">
                    <div>
                      <p className=" mx-2 mt-3 mb-1">New password</p>
                      <input
                        // name="password"
                        className=" mx-2 rounded-md py-3 px-10"
                        type="newPassword"
                        {...register("newPassword", {
                          required: "You must specify a password",
                          minLength: {
                            value: 8,
                            message: "New Password least 8 characters",
                          },
                        })}
                      />
                      <div className=" mx-2 text-yellow-500">
                        {errors.newPassword && (
                          <p>{errors.newPassword.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" flex">
                    <div>
                      <p className=" mx-2 mt-3 mb-1">Re-type new password</p>
                      <input
                        // name="password"
                        className=" mx-2 rounded-md py-3 px-10"
                        type="confirmNewPassword"
                        {...register("confirmNewPassword", {
                          validate: (value) =>
                            value === newPassword.current ||
                            "The passwords do not match",
                        })}
                      />
                      <div className=" mx-2 text-yellow-500">
                        {errors.confirmNewPassword && (
                          <p>{errors.confirmNewPassword.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" flex justify-end my-8 mx-2 gap-5">
                    <Link href="/user">
                      <button className="  hover:bg-green-800 rounded-md bg-green-600 py-3 px-5 text-white">
                        Back
                      </button>
                    </Link>
                    <button
                      onClick={handleSubmit(onSubmit)}
                      className="  hover:bg-blue-800 rounded-md bg-blue-600 py-3 px-5 text-white"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Box>
      <ToastContainer />
    </div>
  );
}
