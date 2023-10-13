import { MusicAPI } from './client';

export const createAudio = async (data: any) => {
  return await MusicAPI.post('/audio', data);
};

export const getAudioById = async (id: string) => {
  return await MusicAPI.get(`/audio/${id}`);
};

export const UpdateAudioById = async (id: string, data: any) => {
  return await MusicAPI.get(`/audio/${id}`, data);
};

export const deleteAudioById = async (id: string) => {
  return await MusicAPI.delete(`/audio/${id}`);
};
