import axios from "axios";

import { FETCH_USER } from "./actionTypes";

// export const fetchUser = async () => {
//   const user = await axios.get("/api/currentuser");
//   return {
//     type: FETCH_USER,
//     payload: user,
//   };
// };

// With the help of redux-thunk we will re-write the above function
// Instead of returning a traditional action object, we will return
// a fuction that will dispatch the action to all reducers.

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/currentuser");

  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const handleStripeToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};
