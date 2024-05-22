import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Api from "../../lib/fetchData";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Register({ setCurrentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [regisFrm, setregisFrm] = useState({
    username: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(regisFrm);
    if (regisFrm.username === "") {
      enqueueSnackbar("Username can't be empty", { variant: "error" });
      return;
    }
    if (regisFrm.password !== regisFrm.confirm_password) {
      enqueueSnackbar("Password and confirm_password doesn't match!", {
        variant: "error",
      });
      return;
    }
    try {
      const res = await Api.post("/user/register", regisFrm);
      enqueueSnackbar(res.message, {
        variant: res.status === 200 ? "success" : "error",
      });
      if (res.status === 200) navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) =>
              setregisFrm({
                ...regisFrm,
                username: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password1"
            onChange={(e) =>
              setregisFrm({
                ...regisFrm,
                password: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Cofirm Password"
            type="password"
            id="password2"
            onChange={(e) =>
              setregisFrm({
                ...regisFrm,
                confirm_password: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="first_name"
            label="First Name"
            id="first_name"
            fullWidth
            onChange={(e) =>
              setregisFrm({
                ...regisFrm,
                first_name: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="last_name"
            label="Last Name"
            id="last_name"
            fullWidth
            onChange={(e) =>
              setregisFrm({
                ...regisFrm,
                last_name: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="location"
            label="Location"
            id="location"
            fullWidth
            onChange={(e) =>
              setregisFrm({
                ...regisFrm,
                location: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="occupation"
            label="Occupation"
            id="occupation"
            fullWidth
            onChange={(e) =>
              setregisFrm({
                ...regisFrm,
                occupation: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="description"
            label="Description"
            id="description"
            fullWidth
            onChange={(e) =>
              setregisFrm({
                ...regisFrm,
                description: e.target.value,
              })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Register Me
          </Button>
          <Grid container>
            <Grid item>
              <Link to={"/"}>
                <Typography variant="body2">
                  {"Already have an account? Sign in"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
