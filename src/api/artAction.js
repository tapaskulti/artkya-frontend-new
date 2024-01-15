import axios from "axios";

export const createArtAction = async (payload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/art`,
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

export const createNonSelectArtAction = async (payload) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/art/createNonSelectArt`,
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

export const getAllArtAction = async (payload) => {
  let response;
  if (payload) {
    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/art?year=${payload}`
    );
  } else {
    response = await axios.get(`${process.env.REACT_APP_BASE_URL}/art`);
  }

  return response;
};

export const getAllNonSelectArtAction = async (payload) => {
  let response;
  if (payload) {
    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/art/getallnonselectart?year=${payload}`
    );
  } else {
    response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/art/getallnonselectart`
    );
  }

  return response;
};

export const getArtAction = async (payload) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/art/artDetail?artId=${payload.artId}`
  );

  return response;
};

export const getNonSelectArtAction = async (payload) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/art/getnonselectart?artId=${payload.artId}`
  );

  return response;
};

export const updateArtAction = async (payload) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/art/updateart?id=${payload.id}`,
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
    `${process.env.REACT_APP_BASE_URL}/art/updatenonselectart?id=${payload.id}`,
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
    `${process.env.REACT_APP_BASE_URL}/art/deletenonselectart?id=${payload.id}`,
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
    `${process.env.REACT_APP_BASE_URL}/art/deleteart?id=${payload.id}`,
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
    `${process.env.REACT_APP_BASE_URL}/art/payment?amount=${payload.amount}`,
    payload.body
  );
  console.log(response, "action payment");
  return response;
};

export const originalArtMailAction = async (payload) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/art/buyOriginalArt`,
    payload
  );

  return response;
};
