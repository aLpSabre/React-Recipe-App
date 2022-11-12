import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";

import { googleAuth, signup } from "../../auth/firebase";
const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  /*   const auth = getAuth(app); */

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    let displayName = input.firstName + " " + input.lastName;
    /*     console.log(input); */

    /*     createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      }); */
    signup(input.email, input.password, displayName,navigate);
    setInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  type="text"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={input.firstName}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.id]: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={input.lastName}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.id]: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.id]: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.id]: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              startIcon={<GoogleIcon />}
              onClick={() => googleAuth(navigate)}
            >
              Sign Up with Google
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{  mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => navigate("/login")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
