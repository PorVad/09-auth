import { cookies } from 'next/headers';
import type { AxiosResponse } from 'axios';
import { nextServer } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CheckSessionResponse {
  success: boolean;
}

export async function fetchNotes({
  page,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search.trim() !== '' && { search: search.trim() }),
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const response = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
}

// Returns the full response, so proxy can read refreshed cookies from headers
export async function checkSession(): Promise<
  AxiosResponse<CheckSessionResponse>
> {
  const cookieStore = await cookies();
  const response = await nextServer.get<CheckSessionResponse>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
}
