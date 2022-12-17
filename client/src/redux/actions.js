export const GET_VIDEOGAMES = "VIDEOGAMES";
export const GET_VIDEOGAMES_COPY = "GET_VIDEOGAMES_COPY";
export const GET_GENRES = "GENRES";
export const GET_PLATFORMS = "PLATFORMS";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CLEAR_VIDEOGAMES = "CLEAR_VIDEOGAMES";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_FILTER = "SET_FILTER";
export const SET_PAGE = "SET_PAGE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const PLATFORMS_FILTER = "PLATFORMS_FILTER";
export const GENRES_FILTER = "GENRES_FILTER";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_BY_NAME = "GET_BY_NAME";

// const API_URL = "https://api-videogames-production.up.railway.app";
const API_URL = "http://localhost:3001";

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/videogames");
      const data = await response.json();

      return dispatch({
        type: GET_VIDEOGAMES,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getCopyGames = () => {
  return {
    type: GET_VIDEOGAMES_COPY,
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + `/videogames?name=${name}`);
      const data = await response.json();
      if (typeof data === "string") {
        alert(data);

        return dispatch({ type: GET_VIDEOGAMES_COPY });
      }
      return dispatch({ type: GET_BY_NAME, payload: data });
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/genres");
      const data = await response.json();

      return dispatch({
        type: GET_GENRES,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
      alert("Error requesting the data from the API");
    }
  };
};

export const getPlatforms = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/platforms");
      const data = await response.json();

      return dispatch({
        type: GET_PLATFORMS,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
      alert("Error requesting the data from the API");
    }
  };
};

export const getDeatails = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + `/videogame/${id}`);
      const data = await response.json();

      return dispatch({
        type: GET_DETAILS,
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
      alert("Error requesting the data from the API");
    }
  };
};

export const postVideogame = (videogame) => {
  return async () => {
    try {
      const game = JSON.stringify(videogame);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: game,
      };

      const response = await fetch(API_URL + "/videogame", requestOptions);

      const data = await response.json();

      alert(data);
    } catch (err) {
      console.log(err.message);
      alert("Error requesting the data from the API");
    }
  };
};

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

export const clearVideoGames = () => {
  return {
    type: CLEAR_VIDEOGAMES,
  };
};

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS,
  };
};

export const setFilter = (payload) => {
  return {
    type: SET_FILTER,
    payload,
  };
};

export const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const genresFilter = (payload) => {
  return {
    type: GENRES_FILTER,
    payload,
  };
};

export const platformsFilter = (payload) => {
  return {
    type: PLATFORMS_FILTER,
    payload,
  };
};

export const filterByCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};
