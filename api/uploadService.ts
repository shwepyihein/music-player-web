import { MusicAPI } from './client';

export const getMp3SignUrl = async (file: File) => {
  const signURLRESPONSE = await MusicAPI.post(`/upload/signed-url`, {
    content_type: 'mp3',
    file_type: 'mp3',
  });
  return signURLRESPONSE.data;
};

export const getImageSignUrl = async (file: File) => {
  const signURLRESPONSE = await MusicAPI.post(`/upload/signed-url`, {
    file_type: file.type.split('/')[1],
    content_type: 'image',
  });
  return signURLRESPONSE.data;
};

export const DeleteFileWithImagePath = async (path: string) => {
  const signURLRESPONSE = await MusicAPI.post(`/upload/file/delete`, {
    file_path: path,
  });
  return signURLRESPONSE.data;
};
