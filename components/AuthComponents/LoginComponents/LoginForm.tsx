import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import theme from '../../../styles/theme/Theme';
import { useAuth } from '../../../utility/context/AuthContext';
import { FormTextField } from '../FormTextField';
import LinkButton from '../LinkButton';
import { PasswordTextField } from '../PasswordTextField';

import Router from 'next/router';

export const LoginForm = () => {
  const [loginInfo, sLoginInfo] = useState({
    email: '',
    password: '',
  });
  const { firebaseLogin, user } = useAuth();
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const history = useNavigate();

  async function handleSubmit() {
    try {
      setLoading(true);
      await firebaseLogin(loginInfo.email, loginInfo.password);
      Router.push('/');
      console.log(user?.email);
    } catch (e) {
      // TODO: CHANGE THIS TO RED TEXT AND UPDATE USER
      console.log(e);
      setIsError(true);
      setError('Incorrect username or password');
    }
    setLoading(false);
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="stretch"
      sx={{ minWidth: '300px', width: '90%', maxWidth: '600px' }}
      xs={5}
      md={3}
    >
      <Paper
        elevation={3}
        style={{
          background: theme.palette.background.paper,
          padding: 20,
          paddingBottom: 40,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h4"
            style={{
              fontWeight: 500,
              color: theme.palette.secondary.main,
              padding: 5,
            }}
          >
            login
          </Typography>
          <Typography
            style={{ color: theme.palette.secondary.main, paddingBottom: 15 }}
          >
            enter your details to log in
          </Typography>
          <form>
            <Grid
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
            >
              <FormTextField
                error={isError}
                helperText={error}
                id="emailInput"
                value={loginInfo.email}
                label="email"
                placeholder="email@domain.com"
                onChange={(e: { target: { value: string } }) =>
                  sLoginInfo((loginInfo) => ({
                    ...loginInfo,
                    email: e.target.value,
                  }))
                }
              />

              <PasswordTextField
                error={isError}
                helperText={error}
                id="passwordInput"
                value={loginInfo.password}
                label="password"
                placeholder="password"
                onChange={(e: { target: { value: string } }) =>
                  sLoginInfo((loginInfo) => ({
                    ...loginInfo,
                    password: e.target.value,
                  }))
                }
              />

              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginBottom: 4, marginTop: 1 }}
              >
                <LinkButton link="/" text="forgot your password?" />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 1 }}
                aria-label="Sign in button"
                onClick={() => handleSubmit()}
              >
                sign in
              </Button>
            </Grid>
          </form>
          <p>
            <a style={{ paddingRight: 5 }}>don&apos;t have an account?</a>
            <LinkButton link="/Register" text="sign up" />
          </p>
        </Grid>
        <Divider role="log in with google or facebook accounts">
          <Typography variant="caption">
            or log in with the following
          </Typography>
        </Divider>
      </Paper>
    </Grid>
  );
};
