import React, {
  useEffect,
  useMemo,
  useState,
  VFC,
} from 'react';
import { useForm, useFormState } from 'react-final-form';
import classnames from 'classnames';
import { ImageUploaderError } from './ImageUploaderError';
import { ImageUploaderStub } from './ImageUploaderStub';
import { ImageUploaderPreview } from './ImageUploaderPreview';
import imageUploaderCss from './assets/image-uploader.module.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

type PropsType = {
  name?: string;
  placeholder?: string;
  additionalClassName?: string;
  size?: 'lg',
};

const ImageUploader: VFC<PropsType> = ({
  name = 'photo',
  placeholder = 'Upload a photo',
  additionalClassName,
  size = false,
}) => {
  useStyles(imageUploaderCss);
  const { mutators: { setValue } } = useForm();
  const { values } = useFormState();
  const photo = useMemo(() => values[name], []);
  const [preview, setPreview] = useState<string | null>(null);

  const isSizeLg = () => size === 'lg';

  useEffect(() => {
    if (values[name] instanceof File) {
      setPreview(URL.createObjectURL(values[name]));
    } else {
      setPreview(photo);
    }
  }, [photo, values[name]]);

  const handlerChangeOnFileInput = (e) => {
    const [file] = e.target.files;
    setValue(name, file);
  };

  return (
    <label
      className={classnames(
        imageUploaderCss.imageUploader,
        { [imageUploaderCss.imageUploader_sizeLg]: isSizeLg() },
        additionalClassName,
      )}
    >
      <ImageUploaderStub placeholder={placeholder} />
      <ImageUploaderPreview preview={preview} />
      <input
        type="file"
        onChange={handlerChangeOnFileInput}
        className={imageUploaderCss.imageUploader__input}
      />
      <ImageUploaderError name={name} />
    </label>
  );
};

export { ImageUploader };
