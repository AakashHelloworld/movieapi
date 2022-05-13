import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";

import Button from "@mui/material/Button";

import List from "@mui/material/List";

import Divider from "@mui/material/Divider";

import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";

import { MdMenu } from "react-icons/md";

const key = "af3abab3867f0ddb9831952933244908";

export default function Genere() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [generes, setgeneres] = useState([]);

  const fetchingdata = async () => {
    const respond_from_api = await fetch(`
        https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
    const Mdatas = await respond_from_api.json();
    setgeneres(Mdatas.genres);
  };

  useEffect(() => {
    fetchingdata();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="list">
        {generes?.map((gene) => {
          return (
            <Link key={gene.id} to={`/${gene.name}/${gene.id}`}>
              <li>{gene.name}</li>
            </Link>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <button className="btn" onClick={toggleDrawer("left", true)}>
          <MdMenu />
        </button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
