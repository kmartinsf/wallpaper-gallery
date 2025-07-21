import axios from "axios";

const UNSPLASH_ACCESS_KEY = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY;

export const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
});

export const searchPhotos = async (query: string, page = 1, perPage = 20) => {
  const response = await unsplashApi.get("/search/photos", {
    params: { query, page, per_page: perPage },
  });

  return response.data.results;
};

export const getPhotos = async (page = 1, perPage = 20) => {

  const response = await unsplashApi.get("/photos", {
    params: { page, per_page: perPage },
  });
  return response.data;
};

export const getPhoto = async (id: string) => {
  const response = await unsplashApi.get(`/photos/${id}`);
  return response.data;
};

export const getRandomPhoto = async () => {
  const response = await unsplashApi.get("/photos/random");
  return response.data;
};
