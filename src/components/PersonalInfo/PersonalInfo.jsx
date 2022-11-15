import React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import { useState } from "react";

import { Container } from "./PersonalInfo.styled";
import { useAuthContext } from "../../context/AuthContext";
import { updateUser } from "../../auth/firebase";
export const PersonalInfo = () => {
  const { currentUser } = useAuthContext();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
  });

  /*   const auth = getAuth(app); */

  const handleSubmit = (event) => {
    let displayName =
      input.firstName.charAt(0).toUpperCase() +
      input.firstName.slice(1, input.firstName.length) +
      " " +
      input.lastName.toUpperCase();
    updateUser(displayName);
    setInput({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  return (
    <Container>
      <h1 component="h2" variant="h5">
        Personal Info
      </h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: "90%" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              id="email"
              name="email"
              disabled={true}
              value={"Email Adress : " + currentUser.email}
            />
          </Grid>

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
        </Grid>

        <Button type="submit" variant="contained" sx={{ mb: 2, mt: 2 }}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};
