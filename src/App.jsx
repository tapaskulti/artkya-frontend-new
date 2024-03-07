import { useEffect } from "react";
import Routes from "./Routes";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { token, authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({
      type: "ALL_ART",
      payload: {
        sortCriteria: "none",
        searchCriteria: "none",
        searchInput: undefined,
      },
    });
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          token: token,
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const userEmail = localStorage.getItem("User_email");
    if (userEmail) {
      dispatch({
        type: "ACCESSTOKEN",
        payload: {
          body: userEmail,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      dispatch({
        type: "CREATE_CART_BY_ID",
        payload: authUser?._id,
      });

      dispatch({
        type: "CREATE_WISHLIST_BY_ID",
        payload: authUser?._id,
      });

      dispatch({
        type: "GET_CART_BY_ID",
        payload: authUser?._id,
      });

      dispatch({
        type: "GET_WISHLIST_BY_ID",
        payload: authUser?._id,
      });
    }
  }, [authUser]);

  return (
    <>
      <div>
        <Routes />
      </div>
    </>
  );
};

export default App;
