import { MusicAPI } from './client';

export const getPlayList = async () => {
  return await MusicAPI.get('/playlist?page=1&limit=20&order=desc');
};

export const getAudioList = async () => {
  return await MusicAPI.get('/audio?page=1&limit=20&order=desc');
};

export const getAuthorList = async () => {
  return await MusicAPI.get('/author/all');
};

export const getGenreList = async () => {
  return await MusicAPI.get('/gerne/all');
};

export const getPlayListAndAudio = async () => {
  return await MusicAPI.get('/playlist/audio?page=1&limit=20&order=desc');
};
