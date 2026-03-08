import api from "./api";
import type { Note } from "@/types/note";
import { User } from "@/types/user";
import axios from "axios";

export type NoteId = Note["id"];

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface AuthResponse {
  user: User;
  message: string;
}

interface SettingParams {
  page: number;
  search: string;
  perPage: number;
  tag?: string;
}

interface CreateNoteData {
  title: string;
  content: string | null;
  tag: string;
}
export interface AuthCredentials {
  email: string;
  password: string;
}
export interface SignUpCredentials extends AuthCredentials {
  username: string;
}

export const fetchNotes = async (
  mysearchtext: string,
  page: number,
  tag: string,
): Promise<NotesResponse> => {
  const params: SettingParams = {
    page,
    search: mysearchtext,
    perPage: 12,
    ...(tag.toLowerCase() !== "all" ? { tag } : {}),
  };

  const { data } = await api.get<NotesResponse>("/notes", { params });
  return data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: NoteId): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: NoteId): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await api.post<User>("/auth/register", credentials);
  return response.data;
};

export const signIn = async (credentials: AuthCredentials): Promise<User> => {
  const response = await api.post<User>("/auth/login", credentials);
  return response.data;
};

export const signOut = async () => {
  const response = await axios.post("/api/auth/logout");
  return response.data;
};

export const checkSession = async (): Promise<User> => {
  const response = await api.get<User>("/auth/session");
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateMe = async (userData: Partial<User>): Promise<User> => {
  const response = await api.patch<User>("/users/me", userData);
  return response.data;
};
