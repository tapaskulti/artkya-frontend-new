import { useEffect } from "react";
import Routes from "./Routes";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "ALL_ART",
      payload: {
        sortCriteria:"none",
        searchCriteria:"none",
        searchInput:undefined
      },
    });
  }, [dispatch]);

  return (
    <>
      <div>
        <Routes />
      </div>
    </>
  );
};

export default App;
