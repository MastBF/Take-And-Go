"use client";

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { useNavigate } from 'react-router-dom';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;


export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      setErrorMessage(null);

      try {
        const response = await axios.post('https://gazansolution-production.up.railway.app/api/v1/Authentication/login', values, {
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        });


        const { token, refreshToken, userName, email, userId, role, changePassword } = response.data;

        // Save tokens and user details to localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userName', userName);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('role', role.toString());
        localStorage.setItem('changePassword', changePassword.toString());

        // Redirect or perform other actions after successful login
        router.replace('/dashboard');

      } catch (error: any) {
        const message = error.response?.data?.message || 'Failed to sign in';
        setErrorMessage(message);
        setError('root', { type: 'server', message });
      } finally {
        setIsPending(false);
      }
    },
    [router, setError]
  );

  return (
    <Stack spacing={4} >
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>

      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel sx={{
                  color: '#bbb',
                  '&.Mui-focused': {
                    color: '#6E6E6E',
                  },
                }}>Email address</InputLabel>
                <OutlinedInput
                  {...field}
                  label="Email address"
                  type="email"
                  sx={{
                    color: '#fff',
                    caretColor: '#fff',
                    backgroundColor: '#1f1f1f',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#444',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#444',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#444',
                    },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px #1f1f1f inset',
                      WebkitTextFillColor: '#fff',
                      transition: 'background-color 5000s ease-in-out 0s',
                    },
                  }} />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel sx={{
                  color: '#bbb',
                  '&.Mui-focused': {
                    color: '#6E6E6E',
                  },
                }}>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  sx={{
                    color: '#fff',
                    caretColor: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#444',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#444',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#444',
                    },
                    backgroundColor: '#1f1f1f',

                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px #1f1f1f inset',
                      WebkitTextFillColor: '#fff',
                      transition: 'background-color 5000s ease-in-out 0s',
                    },
                  }}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />

          {errorMessage ? <Alert color="error">{errorMessage}</Alert> : null}
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              color: '#303030',
              borderRadius: '8px',
              paddingY: 1.5,
              paddingX: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '16px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#B7B7B7',
                boxShadow: '0 0 0 1px #444',
              },
              '&:active': {
                backgroundColor: '#3a3a3a',
                boxShadow: 'inset 0 0 4px #00000066',
              },
              '&.Mui-focusVisible': {
                backgroundColor: '#3a3a3a',
                boxShadow: '0 0 0 2px #555',
              },
              '&.Mui-disabled': {
                backgroundColor: '#555',
                color: '#999',
              },
            }}
          >
            Sign in
          </Button>

        </Stack>
      </form>
    </Stack>
  );
}
