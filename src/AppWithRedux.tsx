import React from 'react';
import './App.css';
import {useAppSelector} from "./store/store";
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Menu from "@mui/icons-material/Menu";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {TodoListsList} from "./features/Todolist/TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {Error404} from "./components/ErrorPage/Error404";

function AppWithRedux() {
    const status = useAppSelector(state => state.app.status)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Routes>
                    <Route path={'/ToDoList'} element={<TodoListsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<Error404/>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
}

export default AppWithRedux;
