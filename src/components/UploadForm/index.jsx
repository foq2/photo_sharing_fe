import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import * as Api from "../../lib/fetchData";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FrmDialog(props) {
  const { forceUpdateCb } = props;
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [preview, setPreview] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => {
    setSelectedFile(undefined);
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const frmData = new FormData();
    console.log(selectedFile);
    frmData.append("image", selectedFile);
    frmData.append("user_id", props.currentUser._id);
    frmData.append("date_time", new Date().toUTCString());
    console.log("thu cai nay", frmData);
    const res = await Api.postFile("/photo/upload", frmData);
    if (res.status === 200) {
      forceUpdateCb();
      console.log(res.photo);
      enqueueSnackbar("Upload success!", { variant: "success" });
      handleClose();
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };
  const handleOnFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (selectedFile) {
      const objUrl = URL.createObjectURL(selectedFile);
      setPreview(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    }
  }, [selectedFile]);
  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onClick={handleClickOpen}
        color="secondary"
      >
        Upload
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            handleSubmit(event);
          },
        }}
      >
        <DialogTitle>Upload Photo</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          style={{ gap: "10px" }}
        >
          {selectedFile ? (
            <img src={preview} alt="preview" width="80%" height="80%" />
          ) : (
            <></>
          )}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload Photo
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleOnFileChange}
              name="image"
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {selectedFile ? <Button type="submit">Upload</Button> : <></>}
        </DialogActions>
      </Dialog>
    </>
  );
}
