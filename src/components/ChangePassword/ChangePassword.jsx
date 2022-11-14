import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { forgotPassword } from "../../auth/firebase";
import { useAuthContext } from "../../context/AuthContext";

const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-start;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0 0 2rem;
  width: 80%;
`;

export const ChangePassword = () => {
  const { currentUser } = useAuthContext();
  const [send, setSend] = useState(false);
  console.log(currentUser.email);
  return (
    <Container>
      <h1>Change Password?</h1>
      <p>
        If you want to change your password, click the button below, and we will
        send password reset instructions to your email address.
      </p>
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          forgotPassword(currentUser.email);
          setSend(true);
        }}
      >
        {send ? "E-Mail Sent" : "Send E-Mail"}
      </Button>
    </Container>
  );
};
