import './App.css';
import MainPage from "./components/MainPage";
import {Route, Routes} from "react-router-dom";
import Navigation from "./blocks/Navigation";
import React from 'react';
import AddBookPage from "./components/books/AddBookPage";
import Footer from "./blocks/Footer";
import ImageUploader from "./temp/ImageUploader";
import EditBookPage from "./components/books/EditBookPage";
import InfoBookPage from "./components/books/InfoBookPage";
import ListBookPage from "./components/books/ListBookPage";
import UsersListPage from "./components/users/UsersListPage";

function App() {
  return (
    <div>
        <Navigation/>
        <div className="container mt-4">
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/add_book" element={<AddBookPage/>}/>
                <Route path="/books" element={<ListBookPage/>}/>
                <Route path="/users" element={<UsersListPage/>}/>
                <Route path="/books/edit/:id" element={<EditBookPage/>}/>
                <Route path="/books/info/:id" element={<InfoBookPage/>}/>
                <Route path="/x" element={<ImageUploader/>}/>
            </Routes>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
