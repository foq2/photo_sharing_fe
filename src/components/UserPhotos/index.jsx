import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import * as Api from "../../lib/fetchData";
import Post from "../Post";
import UploadForm from "../UploadForm";
const STATIC_PHOTO_URL = "http://localhost:8080/static/images/";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;
  console.log(userInfo);

  const setContext = props.setContext;
  const { value, forceUpdateCb } = props;
  const [userPhotos, setUserPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  console.log(userPhotos);

  const userPhotosJsx = [];
  const currentUser = props.currentUser;
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
    const getUserPhotos = async () => {
      const res = await Api.get(`/photo/user/${userInfo._id}`);
      setLoading(false);
      if (res.status !== 200) {
        enqueueSnackbar(res.message, {
          variant: "error",
          preventDuplicate: true,
        });
        if (res.status === 401) navigate("/");
      }
      setUserPhotos(res.photosList);
    };
    setContext(`Photo of ${userInfo.first_name + " " + userInfo.last_name}`);
    getUserPhotos();
  }, [value]);
  const handleSendComment = async (photoId) => {
    const currentDate = new Date();
    const payload = {
      comment: comment,
      photoId,
      user_id: props.currentUser._id,
      date_time: currentDate.toUTCString(),
    };
    const res = await Api.post(`/comment/photo/${payload.photoId}`, payload);
    if (res.status === 200) {
      setUserPhotos(
        userPhotos.map((photo) => {
          if (photo._id === photoId) {
            const comment = { ...res.comment, user: props.currentUser };
            photo.comments.push(comment);
          }
          return photo;
        })
      );
      setComment("");
      enqueueSnackbar("Comment success", { variant: "success" });
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };
  if (userPhotos.length === 0) {
    userPhotosJsx.push(
      <div key={-1}>This user has not uploaded any photos.</div>
    );
  } else {
    for (let photo of userPhotos) {
      const imageSource = STATIC_PHOTO_URL + photo.file_name;
      const imageDateTime = photo.date_time;
      userPhotosJsx.push(
        <div key={photo._id}>
          <Post
            imageUrl={imageSource}
            fullname={userInfo.first_name + " " + userInfo.last_name}
            creationDate={imageDateTime}
            comments={photo.comments}
            photo={photo}
            handleSendComment={handleSendComment}
            setComment={setComment}
            comment={comment}
          />
        </div>
      );
    }
  }
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="photos-container">
          {currentUser._id === userInfo._id ? (
            <UploadForm
              currentUser={currentUser}
              forceUpdateCb={forceUpdateCb}
            />
          ) : (
            <></>
          )}
          {userPhotosJsx}
        </div>
      )}
    </>
  );
}

export default UserPhotos;
