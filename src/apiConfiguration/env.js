import { create } from "apisauce";
import  showErrorMessage  from "../components/ErrorMessage";

const client = create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

client.addAsyncRequestTransform(async (request) => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);

  request.headers["Authorization"] = `Bearer ${token}`;
});

export const config = async () => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};

export const authConfig = async (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
};

export const multipartConfig = async () => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "multipart/form-data",
    },
  };
};

export const blobConfig = async () => {
  const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
      responseType: "arraybuffer",
    },
  };
};

const responseMonitor = (response) => {
  if (response.status === 401) {
    const user = JSON.parse(localStorage.getItem(import.meta.env.VITE_USER));

    localStorage.clear();
    showErrorMessage("Not Authorized");

    window.location.href =
      user?.roleAndPermissions?.role === "Admin" ? "/login" : "/login/vendor";
  }
};

client.addMonitor(responseMonitor);

export default client;
