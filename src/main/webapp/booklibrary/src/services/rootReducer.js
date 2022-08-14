import {combineReducers} from "redux";
import userReducer from "./users/userReducer";
import bookReducer from "./books/bookReducer";
import authReducer from "./users/auth/authReducer";

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer,
    auth: authReducer
})

export default rootReducer;