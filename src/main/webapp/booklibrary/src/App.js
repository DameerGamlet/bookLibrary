import './App.css';
import MainPage from "./views/MainPage";
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import React from 'react';
import AddBookPage from "./views/books/AddBookPage";
import Footer from "./components/Footer";
import EditBookPage from "./views/books/EditBookPage";
import InfoBookPage from "./views/books/InfoBookPage";
import ListBookPage from "./views/books/ListBookPage";
import UsersListPage from "./views/users/UsersListPage";

function App() {

    const heading = "Book library";
    const desc = "This is a simple hero unit, a simple jumbotron-style component for calling extra" +
        " attention to featured content or information.";

    return (
        <div>
            <Navigation/>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" exact element={<MainPage heading={heading} desc={desc}/>}/>
                    <Route path="/add_book" element={<AddBookPage/>}/>
                    <Route path="/books" element={<ListBookPage/>}/>
                    <Route path="/users" element={<UsersListPage/>}/>
                    <Route path="/books/edit/:id" element={<EditBookPage/>}/>
                    <Route path="/books/info/:id" element={<InfoBookPage/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
