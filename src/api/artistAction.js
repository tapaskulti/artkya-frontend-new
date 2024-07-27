import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createArtistAction = async (payload) => {
  try {
    const response = await axios.post(
      `${VITE_BASE_URL}/artist/createArtist`,
      payload.body     
    );
    console.log(response)
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
    console.log(response)
    return response;
    
  } catch (error) {
    console.log(error);
  }
};