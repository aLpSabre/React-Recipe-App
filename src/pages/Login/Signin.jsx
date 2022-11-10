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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { googleAuth, signIn } from "../../auth/firebase";
import GoogleIcon from "@mui/icons-material/Google";

const theme = createTheme();

export default function SignIn() {
  /*   const auth = getAuth(app); */
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    signIn(input.email, input.password,navigate);
    setInput({ email: "", password: "" });
    /* signInWithEmailAndPassword(auth, input.email,input.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        setInput({
          email: "",
          password: "",
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      }); */
    /*    navigate("/survey"); */
  };
  /*   useEffect(() => {
    console.log(user);
  }, [user]); */

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
          <Avatar sx={{ m: 1, bgcolor: "#11263C" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={input.email}
              onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={input.password}
              onChange={(e) =>
                setInput({ ...input, [e.target.id]: e.target.value })
              }
            />
       
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{mt: 2  , mb: 2 }}
              startIcon={<GoogleIcon />}
              onClick={() => googleAuth(navigate)}
            >
              Sign In with Google
            </Button>
            <Button type="submit" fullWidth variant="contained" sx={{ mb: 2}}>
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="" variant="body2"  onClick={() => navigate("forgotPassword")}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2" onClick={() => navigate("signup")}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
