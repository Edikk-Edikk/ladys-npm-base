import React, { ChangeEvent, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PhotoType} from './types/PhotoType';
import { Photo } from './Photo';
import { UploadSuccessType } from './types/UploadSuccessType';
import { RemoveSuccessType } from './types/RemoveSuccessType';
import { ChangeInfoSuccessType } from './types/ChangeInfoSuccessType';

type PropTypes = {
  btnText: string;
  urlUpload: string;
  urlDelete: string;
  urlChangeInfo: string;
  responsePreparer?: (response: object) => object;
  photos: PhotoType[];
  onUpdatePhotoIds?: (photoIds: number[]) => void;
};

const PhotoUploader: React.FC<PropTypes> = ({
  btnText,
  urlUpload,
  urlDelete,
  urlChangeInfo,
  responsePreparer,
  photos,
  onUpdatePhotoIds,
}) => {
  const [photoList, setPhotoList] = useState<PhotoType[]>(photos);
  const [isProcess, setIsProcess] = useState<boolean>(false);

  useEffect(() => {
    if (onUpdatePhotoIds) {
      const photoIds = photoList.map((photo) => photo.id);
      onUpdatePhotoIds(photoIds);
    }
  }, [photoList]);

  const handlerClickRemove = (id: number) => new Promise<void>((resolve, reject) => {
    fetch(urlDelete, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        photoId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then<RemoveSuccessType>((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      let dataPrepared: RemoveSuccessType = data;
      if (responsePreparer) {
        dataPrepared = responsePreparer(data) as RemoveSuccessType;
      }
      setPhotoList(dataPrepared.photos);
      resolve();
    }).catch((error) => {
      // eslint-disable-next-line no-alert
      window.alert(error);
      reject();
    });
  });

  const changeInfo = (id: number, name: string, isChecked: boolean) => new Promise<void>((resolve, reject) => {
    fetch(urlChangeInfo, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name,
        value: isChecked ? 1 : 0,
        photoId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then<ChangeInfoSuccessType>((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      let dataPrepared: ChangeInfoSuccessType = data;
      if (responsePreparer) {
        dataPrepared = responsePreparer(data) as ChangeInfoSuccessType;
      }
      setPhotoList(dataPrepared.photos);
      resolve();
    }).catch((error) => {
      // eslint-disable-next-line no-alert
      window.alert(error);
      reject();
    });
  });

  const handlerChangeIsMain = (
    id: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => changeInfo(id, e.currentTarget.name, e.currentTarget.checked);

  const handlerChangeStatus = (
    id: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => changeInfo(id, e.currentTarget.name, e.currentTarget.checked);

  const handlerChangeFile = (e) => {
    const { files } = e.target;
    if (!files || files.length < 1) {
      return;
    }

    setIsProcess(true);
    const promises = [];
    Array.from(files).forEach((file: Blob) => {
      const formData = new FormData();
      formData.append('file', file);
      const promise = fetch(urlUpload, {
        method: 'POST',
        credentials: 'include',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }).then<UploadSuccessType>((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      }).then((data) => {
        let dataPrepared: UploadSuccessType = data;
        if (responsePreparer) {
          dataPrepared = responsePreparer(data) as UploadSuccessType;
        }
        setPhotoList(dataPrepared.photos);
      }).catch((error) => {
        // eslint-disable-next-line no-alert
        window.alert(error);
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      setIsProcess(false);
    });
  };

  const photoElementList = photoList?.map((photo) => (
    <div className="col-lg-3 col-md-4 col-sm-6" key={photo.id}>
      <Photo
        id={photo.id}
        url={photo.url}
        status={photo.status}
        isMain={photo.isMain}
        onClickRemove={handlerClickRemove}
        onChangeIsMain={handlerChangeIsMain}
        onChangeStatus={handlerChangeStatus}
      />
    </div>
  )) ?? [];

  return (
    <div>
      <div className="photo-uploader">
        <If condition={isProcess}>
          <Then>
            <FontAwesomeIcon icon={faSpinner} className="photo-uploader__loader" spin />
          </Then>
          <Else>
            <label className="photo-uploader__button">
              {btnText}
              <input type="file" className="photo-uploader__input" multiple onChange={handlerChangeFile} />
            </label>
            <div className="photo-uploader__dnd-label">
              Drag & Drop Files
            </div>
          </Else>
        </If>
      </div>
      <div className="row">
        {photoElementList}
      </div>
    </div>
  );
};

export { PhotoUploader };
