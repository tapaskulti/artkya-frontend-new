import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchTotalUserArtistCountsAction = async () => {
  try {
    // console.log("fetchTotalUserArtistCountsAction Called");
    const response = await axios.get(
      `${VITE_BASE_URL}/admin/getTotalUsersAndArtists`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsersAction = async (payload) => {
  try {
    // console.log("fetchAllUsersAction Called");
    const response = await axios.get(
      `${VITE_BASE_URL}/admin/getAllUsers?search=${payload.searchTerm??""}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllArtistsAction = async (payload) => {
  try {
    // console.log("fetchAllArtistsAction Called");
    const response = await axios.get(
      `${VITE_BASE_URL}/admin/getAllArtists?search=${payload.search}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPantingsAction = async () => {
  try {
    // console.log("getAllPantingsAction Called");
    const response = await axios.get(`${VITE_BASE_URL}/admin/getAllPainting`);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const approveArtWorkAction = async (payload) => {
  try {
    console.log("approveArtWorkAction Called");
    const response = await axios.patch(
      `${VITE_BASE_URL}/admin/approveArtwork?artId=${payload?.artId}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
