import { cookies } from "next/headers";
import api from "./api";
import { User } from "@/types/user";
import axios, { AxiosResponse } from "axios";

const getAuthConfig = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return {
    headers: {
      Cookie: cookieString,
    },
  };
};

export const fetchNotes = async (params = {}) => {
  const config = await getAuthConfig();

  const response = await api.get("/notes", { ...config, params });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const config = await getAuthConfig();
  const response = await api.get(`/notes/${id}`, config);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const config = await getAuthConfig();
  const response = await api.get<User>("/users/me", config);
  return response.data;
};

export const checkSession = async (): Promise<AxiosResponse<User> | null> => {
  try {
    const config = await getAuthConfig();
    const response = await api.get<User>("/auth/session", config);
    return response;
  } catch (error) {
    return null;
  }
};
