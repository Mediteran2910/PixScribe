import { useReducer } from "react";
import { errorReducer } from "../hooks/errorReducer";

export const errorObj = {
  title: {
    messages: {
      empty: "Title is required",
      invalid: "Must be between 3-12 characters",
    },
  },
  description: {
    messages: {
      empty: "Description is required",
      invalid: "Must be between 10-60 characters",
    },
  },
  format: {
    messages: {
      empty: "You need to choose a format",
    },
  },
  files: {
    messages: {
      empty: "You need to upload file",
      invalid: "Max size of file 10MB",
    },
  },
};

export const empty = (arr, el, fn) => {
  if (arr) {
    arr.forEach((i) => {
      if (!i) {
        fn();
      }
      return;
    });
  } else if (el) {
    !el && fn();
  }

  console.log(`ERROR, missing ${i}`);
};

export const invalid = () => {};

export const validateInputs = (title, description, format, files, setError) => {
  let errors = {};
  let isErr = false;
  const maxFileSize = 10 * 1024 * 1024;

  console.log(files);
  if (!title) {
    errors.title = "Title is required";
    isErr = true;
  } else if (title.length < 3 || title.length > 12) {
    errors.title = "Must be between 3-12 characters";
    isErr = true;
  }

  if (description.length < 10 || description.length > 60) {
    errors.description = "Must be between 10-60 characters";
    isErr = true;
  }

  if (!format) {
    errors.format = "You need to choose a format";
    isErr = true;
  }

  if (
    files.length === 0 ||
    files.some((file) => !file.name || file.size === 0)
  ) {
    errors.files = "You need to upload file";
    isErr = true;
  } else if (files.some((file) => file.size > maxFileSize)) {
    errors.files = "Max file size is 10MB";
    isErr = true;
  } else if (files.length > 15) {
    errors.files = "You can upload to 15 files";
    isErr = true;
  }
  if (isErr) {
    setError(errors);
  }

  return isErr;
};
