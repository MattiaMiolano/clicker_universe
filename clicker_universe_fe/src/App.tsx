import React, {useState, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider, Grid, TextField, Button } from '@mui/material';
import theme from './mui/theme';
import { loginApi } from './api/auth.api';

type AppProps = {}

export const App: React.FC<AppProps> = () => {

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

  const loginHandle = useCallback(async () => {
    if(username && password)
    await loginApi({username, password})
  }, [username, password])

  return (
    <div className="App">
     
        <Grid container sx={{height: "100vh"}}>
          <Grid item container sx={{display: {sx: "none", md: "block", lg: "block"}}} md={3} lg={4}></Grid>
          <Grid item container xs={12} md={6} lg={4}>
            <Grid item xs={12}>
              <h2>LOGIN</h2>
            </Grid>
            <Grid item xs={12}>
              <TextField name="name" value={username} onChange={({target: {value}}) => setUsername(value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" type="password" value={password} onChange={({target: {value}}) => setPassword(value)}/>
            </Grid>
            <Grid item xs={12}>
              <Button disabled={!password || !username} onClick={loginHandle}>continua</Button>
            </Grid>
          </Grid>
          <Grid item container sx={{display: {sx: "none", md: "block", lg: "block"}}} md={3} lg={4}></Grid>
        </Grid>
    </div>
  );
}

export default App;
