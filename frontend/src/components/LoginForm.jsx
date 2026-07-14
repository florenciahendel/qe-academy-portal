import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
} from "@mantine/core";

import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!email.trim()) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your password.");
      return;
    }

    console.log(API_BASE_URL);
    fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.detail);
          });
        }

        return response.json();
      })
      .then((userData) => {
        setErrorMessage("");

        setUser({
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          role: userData.role,
          status: userData.status,
        });

        navigate("/dashboard");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Stack
      gap="md"
      data-testid="login-form"
    >
      <TextInput
        label="Email"
        placeholder="fh@test.com"
        value={email}
        size="md"
        data-testid="login-email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        size="md"
        data-testid="login-password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      {errorMessage && (
        <Alert
          color="red"
          variant="light"
          data-testid="login-error"
        >
          {errorMessage}
        </Alert>
      )}

      <Button
        fullWidth
        size="md"
        color="petrol"
        data-testid="login-submit"
        onClick={handleLogin}
      >
        Sign in
      </Button>
    </Stack>
  );
}