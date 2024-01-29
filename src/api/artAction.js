import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createArtAction = async (payload) => {
  try {
    const response = await axios.post(`${VITE_BASE_URL}/art`, payload.body, {
      headers: {
        Authorization: payload.token,
      },
    });

    return response;
  } catch (error) {
    console.log(error)
  }
};



export const FiltersAction = async(payload)=>{
 try {
  const response = await axios.post(
    `${VITE_BASE_URL}/art/filterArt`,
    payload.body
  );
  console.log("FiltersAction resposnse",response);
  return response;
 } catch (error) {
  console.log(error)
 }
}

export const getAllArtAction = async (payload) => {  
try {
  console.log("all art action called")
  const response = await axios.get(`${VITE_BASE_URL}/art/getAllArt`);

  return response;
} catch (error) {
  console.log(error)
}
};

export const searchArtByArtistAction = async (payload) => {  
  try {
    console.log("searchArtByArtistAction",payload)
    const response = await axios.get(`${VITE_BASE_URL}/art/getArtByName?artByName=${payload}`);
  
    return response;
  } catch (error) {
    console.log(error)
  }
  };

  export const searchArtByArtTitleAction = async (payload) => {  
    try {
      console.log("searchArtByArtTitleAction",payload)
      const response = await axios.get(`${VITE_BASE_URL}/art/getArtByArtist?artist=${payload}`);
    
      return response;
    } catch (error) {
      console.log(error)
    }
    };



export const createNonSelectArtAction = async (payload) => {
  try {
    const response = await axios.post(
      `${VITE_BASE_URL}/art/createNonSelectArt`,
      payload.body,
      {
        headers: {
          Authorization: payload.token,
        },
      }
    );

    return response;
  } catch (error) {}
};


export const getAllNonSelectArtAction = async (payload) => {
  let response;
  if (payload) {
    response = await axios.get(
      `${VITE_BASE_URL}/art/getallnonselectart?year=${payload}`
    );
  } else {
    response = await axios.get(`${VITE_BASE_URL}/art/getallnonselectart`);
  }

  return response;
};

export const getArtAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/art/artDetail?artId=${payload.artId}`
  );

  return response;
};

export const getNonSelectArtAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/art/getnonselectart?artId=${payload.artId}`
  );

  return response;
};

export const updateArtAction = async (payload) => {
  const response = await axios.patch(
    `${VITE_BASE_URL}/art/updateart?id=${payload.id}`,
    payload.body,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );

  return response;
};

export const updateNonSelectArtAction = async (payload) => {
  const response = await axios.patch(
    `${VITE_BASE_URL}/art/updatenonselectart?id=${payload.id}`,
    payload.body,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );

  return response;
};

export const deleteNonSelectArtAction = async (payload) => {
  const response = await axios.delete(
    `${VITE_BASE_URL}/art/deletenonselectart?id=${payload.id}`,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );

  return response;
};

export const deleteArtAction = async (payload) => {
  const response = await axios.delete(
    `${VITE_BASE_URL}/art/deleteart?id=${payload.id}`,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );

  return response;
};

export const paymentAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/art/payment?amount=${payload.amount}`,
    payload.body
  );
  console.log(response, "action payment");
  return response;
};

export const originalArtMailAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/art/buyOriginalArt`,
    payload
  );

  return response;
};
