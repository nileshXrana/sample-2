"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Divider from '@mui/material/Divider';

import styles from "./login.module.css";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginThunk } from "@/features/user/user.action";
import { loginRequest } from "@/features/user/user.type";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const apiError = useAppSelector((state) => state.user.error);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (data: loginRequest) => {
    try {
      await dispatch(loginThunk(data)).unwrap();
      router.push("/dashboard");
    } catch (error) {
      // error handle by redux
    }
  };

  return (
    <Box className={styles.container}>

      <Box className={styles.card}>
        <Typography component="h1" className={styles.title}>
          Login
        </Typography>

        <Typography className={styles.subtitle}>
          New to App?{" "}
          <Link href="/register" className={styles.link}>
            Register now
          </Link>
        </Typography>

        <Divider className={styles.divider}>or</Divider>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          <Box className={styles.formHeader}>
            <Typography component="h2" className={styles.formTitle}>
              Welcome back
            </Typography>

            <Typography className={styles.formDescription}>
              Login to continue to your account !
            </Typography>
          </Box>

          {apiError && (
            <Typography className={styles.errorMessage}>
              {apiError}
            </Typography>
          )}

          <FormControl className={styles.inputGroup} fullWidth>
            <FormLabel htmlFor="email" className={styles.label}>
              Email
            </FormLabel>

            <TextField
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              variant="outlined"
            />
          </FormControl>

          <FormControl className={styles.inputGroup} fullWidth>
            <FormLabel htmlFor="password" className={styles.label}>
              Password
            </FormLabel>

            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={handleTogglePassword}
                        edge="end"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            className={styles.submitButton}
            fullWidth
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}