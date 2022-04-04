import { PhotoType } from './PhotoType';

type UploadSuccessType = {
  status: boolean;
  photos: PhotoType[];
  message: string;
};

export { UploadSuccessType };
