import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import "./styles.css";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(context, currentUser, setCurrentUser, forceUpdateCb) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleLogout = () => {
    setCurrentUser(setCurrentUser);
    localStorage.clear();
    navigate("/");
    enqueueSnackbar("Logout success!", { variant: "success" });
  };
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <span className="='context-container" style={{ gap: "16px" }}>
          <Typography variant="h5" color="inherit">
            {currentUser
              ? `Helloo ${currentUser.first_name}!`
              : "Pleasee login!"}
          </Typography>
        </span>
        {currentUser ? (
          <span className="context-container">
            <Typography variant="h6" color="inherit">
              {context}
            </Typography>
            <IconButton
              style={{ color: "#fff" }}
              aria-label="logout"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </span>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
