import axios from 'axios';

export const MusicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MUSIC_API_ENDPOINT,
});
