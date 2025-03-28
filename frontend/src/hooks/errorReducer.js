import { useReducer } from "react";

export const errorReducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_ERRORS":
      return {};

    case "EMPTY_TITLE":
      return {
        ...state,
        title: {
          message: "Title is required",
        },
      };

    case "INVALID_TITLE":
      return {
        ...state,
        title: {
          message: "Must be between 3-12 characters",
        },
      };

    case "INVALID_DESCRIPTION":
      return {
        ...state,
        description: {
          message: "Must be between 10-60 characters",
        },
      };

    case "UNCHOOSEN_FORMAT":
      return {
        ...state,
        format: {
          message: "You need to choose format",
        },
      };

    case "UNCHOOSEN_FILES":
      return {
        ...state,
        files: {
          message: "You need to upload files",
        },
      };

    // case "INVALID":
    //   return {
    //     [action.payload.field]: {
    //       message: action.payload.message,
    //     },
    //   };

    // case "EMPTY":
    //   return {
    //     [action.payload.field]: {
    //       message: action.payload.message,
    //     },
    //   };

    default:
      return state;
  }
};
