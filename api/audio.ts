import { MusicAPI } from './client';

export const createAudio = async (data: any) => {
  return await MusicAPI.post('/audio', data);
};

export const getAudioById = async (id: string) => {
  return await MusicAPI.get(`/audio/${id}`);
};

export const UpdateAudioById = async (id: any, data: any) => {
  return await MusicAPI.put(`/audio/update/${id}`, data);
};

export const deleteAudioById = async (id: number) => {
  return await MusicAPI.delete(`/audio/${id}`);
};

export const getAudioRandomList = async (limit: number) => {
  return await MusicAPI.get(`/audio/random?limit=${limit}`);
};
