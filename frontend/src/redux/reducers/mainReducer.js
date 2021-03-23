import { combineReducers } from "redux";
import userReducer from "./userReducer";
import paqueteReducer from "./paqueteReducer";
import productoReducer from "./productoReducer";
import carritoReducer from "./carritoReducer";
import categoriaReducer from "./categoriaReducer";
import regaloReducer from "./regaloReducer";

const mainReducer = combineReducers({
    userReducer,
    productoReducer,
    paqueteReducer,
    carritoReducer,
    categoriaReducer,
    regaloReducer
})

export default mainReducer;