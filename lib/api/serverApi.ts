import { cookies } from "next/headers";
import api from "./api";
import { User } from "@/types/user";

const getAuthConfig = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

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

export const checkSession = async (): Promise<User | null> => {
  try {
    const config = await getAuthConfig();
    const response = await api.get<User | null>("/auth/session", config);
    return response.data;
  } catch {
    return null;
  }
};
