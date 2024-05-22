import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import * as Api from "../../lib/fetchData";
import {
  Avatar,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login({ setCurrentUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loginFrm, setLoginFrm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    setCurrentUser(undefined);
    localStorage.clear();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(loginFrm);
    if (loginFrm.username === "" || loginFrm.password === "") {
      enqueueSnackbar("Username and password con not be empty!", {
        variant: "error",
      });
      return;
    }
    try {
      const res = await Api.post("/auth/login", loginFrm);
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.token);
        setCurrentUser(res.user);
        enqueueSnackbar(res.message, { variant: "success" });
        navigate(`/users/${res.user._id}`);
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            margin="normal"
            onChange={(e) =>
              setLoginFrm({
                ...loginFrm,
                username: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            type="password"
            onChange={(e) => {
              setLoginFrm({ ...loginFrm, password: e.target.value });
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item>
              <Link to={"/register"}>
                <Typography variant="body2">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
