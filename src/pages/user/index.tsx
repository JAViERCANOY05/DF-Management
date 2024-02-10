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

import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";

import Dashboard from "./Dashboard";
import Contribution from "./Contribution";
import Report from "./Report";
import Transaction from "./Transaction";
import Settings from "./Setting";

const drawerWidth = 240;

interface display {
  name: string;
  icon: any;
  href: any;
}

const component: display[] = [
  {
    name: "Dashboard",
    icon: <InboxIcon />,
    href: "Dashboard",
  },

  {
    name: "Contribution",
    icon: <InboxIcon />,
    href: "Contribution",
  },
  {
    name: "Report",
    icon: <InboxIcon />,
    href: "Report",
  },
  {
    name: "Transaction",
    icon: <InboxIcon />,
    href: "Transaction",
  },

  {
    name: "Settings",
    icon: <InboxIcon />,
    href: "Settings",
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
    } else if (item === "Contribution") {
      setDisplayComponent(<Contribution />);
    } else if (item === "Report") {
      setDisplayComponent(<Report />);
    } else if (item === "Settings") {
      setDisplayComponent(<Settings />);
    } else if (item === "Transaction") {
      setDisplayComponent(<Transaction />);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            <Typography variant="h6" noWrap component="div">
              Web-Based Death Fund Management
            </Typography>
            <div className="  ml-96 ">
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open1 ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open1 ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              </div>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open1}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="/Login">
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
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
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {displayComponent}
      </Box>
    </Box>
  );
}
