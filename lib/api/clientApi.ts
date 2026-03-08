import api from "./api"; // Ваш інстанс з withCredentials: true
import type { Note } from "@/types/note";
import { User } from "@/types/user";

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

export const signUp = async (data: FormData): Promise<User> => {
  const payload = Object.fromEntries(data);
  const response = await api.post<User>("/auth/register", payload);
  return response.data;
};

export const signIn = async (data: FormData): Promise<User> => {
  const payload = Object.fromEntries(data);
  const response = await api.post<User>("/auth/login", payload);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
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
