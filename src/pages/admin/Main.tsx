import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
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
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import Link from "next/link";
import { MdApproval } from "react-icons/md";
import Approval from "./Approval";

import Dashboard from "./Dashboard";
import Add_Contribution from "./Add_Contribution";
import Announcement from "./Announcement";
import Manage_User from "./Manage_User";
import Settings from "./Settings";
import Transaction from "./Transaction";
import { useRouter } from "next/navigation"; // Correct import

import { MdDashboardCustomize } from "react-icons/md";
import { RiHeartAddFill } from "react-icons/ri";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { GrTransaction } from "react-icons/gr";
import { GiExitDoor } from "react-icons/gi";

const drawerWidth = 240;

interface display {
  name: string;
  icon: any;
  href: any;
}

const component: display[] = [
  {
    name: "Dashboard",
    icon: (
      <MdDashboardCustomize style={{ fontSize: "1.5em", color: "#1976D2" }} />
    ),
    href: "Dashboard",
  },

  {
    name: "Contribution",
    icon: <RiHeartAddFill style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "Add_Contribution",
  },
 
  {
    name: "Manage_User",
    icon: <MdManageAccounts style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "Manage_User",
  },
  {
    name: "Approval",
    icon: <MdApproval style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "Approval",
  },

  {
    name: "Settings",
    icon: <MdOutlineSettings style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "Settings",
  },
  {
    name: "Announcement",
    icon: <GrAnnounce style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "Announcement",
  },
  {
    name: "Transaction",
    icon: <GrTransaction style={{ fontSize: "1.5em", color: "#1976D2" }} />,
    href: "Transaction",
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [displayComponent, setDisplayComponent] = useState(<Dashboard />);
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handlerClick = (item: any) => {
    console.log(item);
    if (item === "Dashboard") {
      setDisplayComponent(<Dashboard />);
    } else if (item === "Add_Contribution") {
      setDisplayComponent(<Add_Contribution />);
    } else if (item === "Announcement") {
      setDisplayComponent(<Announcement />);
    } else if (item === "Settings") {
      setDisplayComponent(<Settings />);
    } else if (item === "Transaction") {
      setDisplayComponent(<Transaction />);
    } else if (item === "Manage_User") {
      setDisplayComponent(<Manage_User />);
    } else if (item === "Approval") {
      setDisplayComponent(<Approval />);
    }
    // Approval
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlrLogOut = () => {
    console.log("Log-out");
    localStorage.clear();
    router.push("/");
  };

  return (
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
          <div className=" flex gap-96">
            <Typography
              variant="h6"
              noWrap
              component="div"
              className=" flex gap-5"
            >
              Web-Based Death Fund Management
            </Typography>
          </div>
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
            <ListItem key={index + 1} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <button
                  className="  flex justify-center items-center  "
                  onClick={() => {
                    handlerClick(text.href);
                  }}
                >
                  <ListItemIcon
                    className={
                      open ? "mx-0  text-[#03396C]" : "   hover:text-[#03396C]"
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
                </button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <button
              onClick={handlrLogOut}
              className="  flex justify-center items-center  "
            >
              <ListItemIcon
                className={
                  open ? "mx-0  text-[#03396C]" : "   hover:text-[#03396C]"
                }
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 0,
                  justifyContent: "center ",
                }}
              >
                <GiExitDoor style={{ fontSize: "1.5em", color: "#1976D2" }} />
              </ListItemIcon>
              <ListItemText
                className={open ? "mx-8 " : "mx-0"}
                primary="Logout"
                sx={{ opacity: open ? 1 : 0 }}
                style={{ display: open ? "block" : "none " }}
              />
            </button>
          </ListItemButton>
        </ListItem>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {displayComponent}
      </Box>
    </Box>
  );
}
