import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import * as Api from "../../lib/fetchData";
import "./styles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import DescriptionIcon from "@mui/icons-material/Description";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail(props) {
  const navigate = useNavigate();
  const setContext = props.setContext;
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const user = useParams();
  useEffect(() => {
    if (!props.currentUser) {
      setLoading(false);
      enqueueSnackbar("Access Denied!", {
        variant: "error",
        preventDuplicate: true,
      });
      navigate("/");
      return;
    }
    console.log("Use Effect in userDetail run!");
    const getUserById = async () => {
      try {
        const res = await Api.get(`/user/${user.userId}`);
        if (res.status !== 200) {
          enqueueSnackbar(res.message, {
            variant: "error",
            preventDuplicate: true,
          });
          if (res.status === 401) {
            console.log("navigate to login");
            navigate("/");
          }
          return;
        }
        setUserInfo(res.user);
        setContext(
          "Detail of " + res.user.first_name + " " + res.user.last_name,
        );
        setLoading(false);
      } catch (e) {
        console.log(e);
        enqueueSnackbar("Unexpected error!", { variant: "error" });
        setLoading(false);
      }
    };
    getUserById();
  }, [user.userId]);
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="user-detail-container">
          <h2>
            {userInfo.first_name} {userInfo.last_name}
          </h2>
          <div>
            <p className="user-info">
              <LocationOnIcon />
              <span>{userInfo.location}</span>
            </p>
            <p className="user-info">
              <DescriptionIcon />
              <span>{userInfo.description}</span>
            </p>
            <p className="user-info">
              <WorkIcon />
              <span>{userInfo.occupation}</span>
            </p>
            <p>
              {" "}
              <Link to={`/photos/${userInfo._id}`} state={userInfo}>
                See user photo
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetail;
