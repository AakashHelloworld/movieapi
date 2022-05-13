import * as React from "react";

import { useNavigate, Link } from "react-router-dom";

import Popover from "@mui/material/Popover";

import Typography from "@mui/material/Typography";

import { CgProfile } from "react-icons/cg";

import { signOut } from "firebase/auth";

import { auth } from "../Firestore/firestore";
const Popup = ({ id, setId }) => {
  const history = useNavigate();

  const logoutfun = (e) => {
    alert("Do you really want to log out?");
    signOut(auth)
      .then(() => {
        console.log("we loged out");
      })
      .catch((err) => {})
      .finally(() => {
        setId("");
        history("/");
      });
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const idd = open ? "simple-popover" : undefined;

  return (
    <div>
      <button
        className="btn"
        aria-describedby={idd}
        variant="contained"
        onClick={handleClick}
      >
        <CgProfile />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }} className="listdecoration">
          <li onClick={logoutfun}>LOGOUT</li>
        </Typography>
      </Popover>
    </div>
  );
};
export default Popup;
