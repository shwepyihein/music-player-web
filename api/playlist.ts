import { MusicAPI } from './client';

export const createPlayList = async (data: any) => {
  return await MusicAPI.post('/playlist', data);
};

export const getPlayListById = async (id: any) => {
  return await MusicAPI.get(`/playlist/${id}`);
};

export const UpdatePlayList = async (id: any, data: any) => {
  return await MusicAPI.put(`/playlist/update/${id}`, data);
};

export const deletePlayList = async (id: any) => {
  return await MusicAPI.delete(`/playlist/${id}`);
};
