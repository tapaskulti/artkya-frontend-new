import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createArtAction = async (payload) => {
  try {
    const response = await axios.post(
      `${VITE_BASE_URL}/art/createArt`,
      payload.body
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createDraftAction = async (payload) => {
  try {
    const response = await axios.post(
      `${VITE_BASE_URL}/createDraft`,
      payload.body,
      {
        // headers: {
        //   Authorization: payload.token,
        // },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const FiltersAction = async (payload) => {
  try {
    const response = await axios.post(
      `${VITE_BASE_URL}/art/filterArt`,
      payload.body
    );
    console.log("FiltersAction resposnse", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllArtAction = async (payload) => {
  try {
    // console.log("all art action ========>", payload);
    const response = await axios.get(
      `${VITE_BASE_URL}/art/getAllArt?criteria=${payload?.sortCriteria}&searchCriteria=${payload?.searchCriteria}&searchInput=${payload?.searchInput}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getArtByIdAction = async (payload) => {
  console.log(payload);
  const response = await axios.get(
    `${VITE_BASE_URL}/art/getArtById?artID=${payload}`
  );
  console.log("getArtByIdAction====>", response);
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

export const NewFiltersAction = async (payload) => {
  const params = {};

  // Conditionally add parameters only if they have values
  if (payload.sortingCriteria) {
    params.sortingCriteria = payload.sortingCriteria;
  }
  if (payload.searchCriteria) {
    params.searchCriteria = payload.searchCriteria;
  }
  if (payload.searchInput) {
    params.searchInput = payload.searchInput;
  }

  // Build the body payload by only including non-empty filters
  const body = {};

  if (payload.body?.style?.length > 0) {
    body.style = payload.body.style;
  }
  if (payload.body?.subject?.length > 0) {
    body.subject = payload.body.subject;
  }
  if (payload.body?.orientation?.length > 0) {
    body.orientation = payload.body.orientation;
  }
  if (payload.body?.medium?.length > 0) {
    body.medium = payload.body.medium;
  }
  if (payload.body?.material?.length > 0) {
    body.material = payload.body.material;
  }
  if (payload.body?.artistCountry?.length > 0) {
    body.artistCountry = payload.body.artistCountry;
  }
  if (payload.body?.featuredartist?.length > 0) {
    body.featuredartist = payload.body.featuredartist;
  }

  const response = await axios.post(
    `${VITE_BASE_URL}/art/newFilterArt`,
    Object.keys(body).length > 0 ? body : {}, // Only send body if it's not empty, // This contains the filter data (style, subject, etc.)
    {
      params, // Only include non-empty parameters
    }
  );
  console.log("FiltersAction new response", response);
  return response;
};
