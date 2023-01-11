import { Button, Divider, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import theme from "../../styles/theme/Theme";
import { useAuth } from "../../utility/context/AuthContext";
import LinkButton from "./LinkButton";
import ThirdPartyAuth from "./ThirdPartyAuth";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Router from "next/router";

export const LoginForm = () => {
    const [loginInfo, sLoginInfo] = useState({
        email:"",
        password:"",
    });
    const { firebaseLogin, user } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // const history = useNavigate();

    async function handleSubmit() {
        try {
            setError("");
            setLoading(true);
            await firebaseLogin(loginInfo.email, loginInfo.password);
            Router.push("/");
            console.log(user?.email)
          } catch(e) {
            // TODO: CHANGE THIS TO RED TEXT AND UPDATE USER
            console.log(e);
            setError("Failed to log in");
        }
        setLoading(false);
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    return (
        <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        xs={4}
        style={{color:theme.palette.tertiary.main}}
        >
            <Paper
                elevation={3}
                style={{
                    background:theme.palette.secondary.main,
                    padding:20,
                    paddingBottom:40    
                }}
                >

                <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                >

                    <Typography variant="h4" style={{fontWeight:500, color:theme.palette.tertiary.main, padding:5}}>login</Typography>
                    <Typography style={{color:theme.palette.tertiary.main, paddingBottom:15}}>enter your details to log in</Typography>
                    <form>

                        <Grid
                        container
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="stretch"
                        >

                        <TextField
                            required
                            id="email-input"
                            value={loginInfo.email}
                            label="email"
                            placeholder="email@domain.com"
                            onChange={(e) =>
                                sLoginInfo((loginInfo) => ({
                                ...loginInfo,
                                email: e.target.value,
                                }))
                            }
                            sx={{marginBottom:3}}
                        />

                        <TextField
                            required
                            id="password-input"
                            value={loginInfo.password}
                            label="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            onChange={(e) =>
                                sLoginInfo((loginInfo) => ({
                                ...loginInfo,
                                password: e.target.value,
                                }))
                            }
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />

                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{marginBottom:4, marginTop:1}}
                            >
                            <LinkButton link="/" text="forgot your password?"/>
                        </Grid>
                            {error.length > 0 && (
                                <Typography variant='caption' color='red' sx={{textAlign:"center", margin:0}}>{error}</Typography>
                            )}
                            <Button variant='contained' color='tertiary' sx={{borderRadius: 1}} aria-label="Sign in button" onClick={() => handleSubmit()}>
                                sign in
                            </Button>
                        </Grid>
                    </form>
                    <p>
                        <a style={{paddingRight:5}}>don&apos;t have an account?</a>
                        <LinkButton link="/" text="sign up" />
                    </p>
                </Grid>
                <Divider role="log in with google or facebook accounts">
                    <Typography variant='caption'>or log in with the following</Typography>
                </Divider>
                <ThirdPartyAuth />

            </Paper>
        </Grid>
    )
}