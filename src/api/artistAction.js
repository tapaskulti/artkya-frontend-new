import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createArtistAction = async (payload) => {
  try {
    const response = await axios.post(
      `${VITE_BASE_URL}/artist/createArtist`,
      payload.body
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateArtistProfileAction = async (payload) => {
  try {
    const response = await axios.patch(
      `${VITE_BASE_URL}/artist/updateArtistProfile?ArtistId=${payload.userId}`,
      payload.body
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateArtistImagesAction = async (payload) => {
  try {
    console.log("updateArtistImagesAction payload===>",payload)
    const response = await axios.patch(
      `${VITE_BASE_URL}/artist/updateProfileImages?ArtistId=${payload?.artistId}`,
      payload.body
    );
      console.log("upload res===>",response)
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getArtistProfileByIdAction = async (payload) => {
  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/artist/getArtistById?ArtistId=${payload.artistId}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};


export const getAllArtByArtistAction = async (payload) => {
  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/artist/getAllArtByArtistId?ArtistId=${payload.artistId}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};