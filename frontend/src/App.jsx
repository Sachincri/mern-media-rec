import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScreenRec from "./components/ScreenRec";
import WebcamRec from "./components/WebcamRec";
import Header from "./components/Header";
import { useEffect } from "react";
import { loadUser } from "./Redux/userAction";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Loader from "./components/Loader";
import { ProtectedRoute } from "protected-route-react";
import toast, { Toaster } from "react-hot-toast";
import "./Style/screen.scss";
import "./Style/header.scss";
import "./Style/profile.scss";
import Profile from "./components/Profile";

function App() {
  const { isAuthenticated, user, loading, error, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: "clearError",
      });
    }
    if (message) {
      toast.success(message);
      dispatch({
        type: "clearMessage",
      });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route
              path="/screen"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ScreenRec />
               </ProtectedRoute>
              }
            />
            <Route
              path="/webcam"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
                  <WebcamRec />
                 </ProtectedRoute> 
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/webcam">
                  <SignUp />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} redirect="/">
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;
