// Junta todos os reducers do projeto
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import usersReducer from '../features/users/usersSlice'

// Por enquanto, está vazio.
// Em breve colocar: authReducer, dashboardReducer, etc.
export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  // dashboard: dashboardReducer,
});
