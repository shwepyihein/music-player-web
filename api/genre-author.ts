import { MusicAPI } from './client';

export const createGerne = async (data: any) => {
  return await MusicAPI.post('/gerne', data);
};

export const getGerneById = async (id: string) => {
  return await MusicAPI.get(`/gerne/${id}`);
};

export const UpdateGerneById = async (id: number, data: any) => {
  return await MusicAPI.put(`/gerne/update/${id}`, data);
};

export const deleteGerneById = async (id: number) => {
  return await MusicAPI.delete(`/gerne/${id}`);
};

export const creatAuthor = async (data: any) => {
  return await MusicAPI.post('/author', data);
};

export const getAuthorId = async (id: string) => {
  return await MusicAPI.get(`/author/${id}`);
};

export const updateAuthorById = async (id: number, data: any) => {
  return await MusicAPI.put(`/author/update/${id}`, data);
};

export const deleteAuthorById = async (id: number) => {
  return await MusicAPI.delete(`/author/${id}`);
};
