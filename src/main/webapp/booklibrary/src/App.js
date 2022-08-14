import './App.css';
import MainPage from "./views/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import React from 'react';
import AddBookPage from "./views/books/AddBookPage";
import Footer from "./components/Footer";
import EditBookPage from "./views/books/EditBookPage";
import InfoBookPage from "./views/books/InfoBookPage";
import ListBookPage from "./views/books/ListBookPage";
import UsersListPage from "./views/users/UsersListPage";
import {Provider} from "react-redux";
import store from "./services/store";
import RegisterPage from "./views/users/RegisterPage";
import LoginPage from "./views/users/LoginPage";

function App() {

    const heading = "Book Store";
    const desc = "This is a simple hero unit, a simple jumbotron-style component for calling extra" +
        " attention to featured content or information.";

    return (
        <div>
            <Navigation/>
            <div className="container mt-4">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage heading={heading} desc={desc}/>} />
                        <Route path="/add_book" element={
                            <Provider store={store}>
                                <AddBookPage/>
                            </Provider>
                        }/>
                        <Route path="/books" element={<ListBookPage/>}/>
                        <Route path="/users" element={
                            <Provider store={store}>
                                <UsersListPage/>
                            </Provider>
                        }/>
                        <Route path="/books/edit/:id" element={
                            <Provider store={store}>
                                <EditBookPage/>
                            </Provider>
                        }/>
                        <Route path="/books/info/:id" element={<InfoBookPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/logout" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
