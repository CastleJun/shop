import axios from 'axios';

export const uploadImage = async (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET as string);

  const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL as string, formData);

  return data;
};
