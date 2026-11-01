import { nextServer } from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface AuthRequest {
  email: string;
  password: string;
}

interface CheckSessionResponse {
  success: boolean;
}

export interface UpdateMeRequest {
  username: string;
}

export async function fetchNotes({
  page,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search.trim() !== '' && { search: search.trim() }),
      ...(tag && { tag }),
    },
  });

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${noteId}`);

  return response.data;
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  const response = await nextServer.post<Note>('/notes', newNote);

  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);

  return response.data;
}

export async function register(data: AuthRequest): Promise<User> {
  const response = await nextServer.post<User>('/auth/register', data);

  return response.data;
}

export async function login(data: AuthRequest): Promise<User> {
  const response = await nextServer.post<User>('/auth/login', data);

  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}

export async function checkSession(): Promise<boolean> {
  const response = await nextServer.get<CheckSessionResponse>('/auth/session');

  return response.data.success;
}

export async function getMe(): Promise<User> {
  const response = await nextServer.get<User>('/users/me');

  return response.data;
}

export async function updateMe(data: UpdateMeRequest): Promise<User> {
  const response = await nextServer.patch<User>('/users/me', data);

  return response.data;
}
