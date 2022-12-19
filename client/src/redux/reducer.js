import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_PLATFORMS,
  GET_DETAILS,
  ORDER_BY_NAME,
  GENRES_FILTER,
  PLATFORMS_FILTER,
  FILTER_CREATED,
  GET_BY_NAME,
  CLEAR_DETAIL,
  CLEAR_VIDEOGAMES,
  SET_FILTER,
  CLEAR_FILTERS,
  SET_PAGE,
  GET_VIDEOGAMES_COPY,
} from "./actions";

const initialState = {
  allGamesCopy: [],
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  details: {},

  filters: {
    genres: "All",
    platforms: "All",
    origin: "All",
    order: "",
  },

  page: 1,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES: {
      return {
        ...state,
        allVideogames: action.payload,
        allGamesCopy: action.payload,
        videogames: action.payload,
      };
    }

    case GET_VIDEOGAMES_COPY: {
      return {
        ...state,
        allVideogames: state.allGamesCopy,
        videogames: state.allGamesCopy,
      };
    }

    case GET_BY_NAME: {
      return {
        ...state,
        allVideogames: action.payload,
        videogames: action.payload,
      };
    }

    case GET_GENRES: {
      return {
        ...state,
        genres: action.payload,
      };
    }

    case GET_PLATFORMS: {
      return {
        ...state,
        platforms: action.payload,
      };
    }

    case GET_DETAILS: {
      return {
        ...state,
        details: action.payload,
      };
    }

    case CLEAR_DETAIL: {
      return {
        ...state,
        details: {},
      };
    }

    case CLEAR_VIDEOGAMES: {
      return {
        ...state,
        allVideogames: [],
        videogames: [],
      };
    }

    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          genres: "All",
          platforms: "All",
          origin: "All",
          order: "",
        },
      };
    }

    case SET_FILTER: {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    }

    case SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    case ORDER_BY_NAME: {
      let sorted = [...state.allVideogames];
      if (action.payload === "rating")
        sorted = [...sorted.sort((a, b) => a.rating - b.rating)];

      if (action.payload === "asc")
        sorted = [...sorted.sort((a, b) => a.name.localeCompare(b.name))];

      if (action.payload === "desc")
        sorted = [...sorted.sort((a, b) => b.name.localeCompare(a.name))];

      return {
        ...state,
        videogames: sorted,
      };
    }

    case GENRES_FILTER: {
      const filter =
        action.payload === "All"
          ? state.videogames
          : state.videogames.filter((game) =>
              game.genres?.includes(action.payload)
            );

      return {
        ...state,
        videogames: filter,
      };
    }

    case PLATFORMS_FILTER: {
      const filter =
        action.payload === "All"
          ? state.videogames
          : state.videogames.filter((game) =>
              game.platforms?.includes(action.payload)
            );

      return {
        ...state,
        videogames: filter,
      };
    }

    case FILTER_CREATED: {
      let games = [];
      if (action.payload === "All") {
        games = state.videogames;
      }

      if (action.payload === "DB") {
        games = state.videogames.filter((game) => game.createdAtDb);
      }
      if (action.payload === "API") {
        games = state.videogames.filter((game) => !game.createdAtDb);
      }

      return {
        ...state,
        videogames: games,
      };
    }

    default: {
      return state;
    }
  }
};
