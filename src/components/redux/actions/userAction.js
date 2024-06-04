import toast from "react-hot-toast";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

// Function to set user authentication status in localStorage
const setAuthStatusInLocalStorage = (status) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(status));
};

// Login
export const login = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    localStorage.setItem("userId", JSON.stringify(user.uid));
    if (user.uid) {
      setAuthStatusInLocalStorage(true);
      toast.success("Login Successfully");
      navigate("/");
    }
    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    toast.error(error?.message);
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

// Register
export const register =
  (email, password, firstName, lastName, navigate) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });

      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await addDoc(collection(db, "Users"), {
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        userId: user.uid,
      });

      if (user.uid) {
        setAuthStatusInLocalStorage(true);
        localStorage.setItem("userId", JSON.stringify(user.uid));
        toast.success("User Registered Successfully");
        navigate("/");
      }
      dispatch({ type: REGISTER_USER_SUCCESS, payload: user });
    } catch (error) {
      toast.error(error?.message);
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// Logout User
export const logout = (navigate) => async (dispatch) => {
  try {
    await signOut(auth);
    setAuthStatusInLocalStorage(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    toast.success("LogOut Successfully");
    navigate("/login");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: LOGOUT_FAIL, payload: error.message });
  }
};

//getting all users
export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: ALL_USERS_REQUEST,
  });
  try {
    const unsub = onSnapshot(
      collection(db, "Users"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        dispatch({
          type: ALL_USERS_SUCCESS,
          payload: list,
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error?.message,
    });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
