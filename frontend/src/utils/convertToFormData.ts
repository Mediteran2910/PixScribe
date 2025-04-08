import { GalleyForm } from "../components/pages/Create/Create";

export const convertToFormData = (formData: GalleyForm) => {
  const formDataSend = new FormData();
  for (const [key, value] of Object.entries(formData)) {
    if (Array.isArray(value)) {
      value.forEach((file) => formDataSend.append("files", file));
    } else {
      formDataSend.append(key, value);
    }
  }
  return formDataSend;
};
