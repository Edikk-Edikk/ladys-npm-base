import React, { ChangeEvent, useState } from 'react';
import useMounted from '@restart/hooks/useMounted';
import { PhotoType } from './types/PhotoType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTrashCan from '@fortawesome/free-solid-svg-icons/faTrashCan';

type PropTypes = PhotoType & {
  onClickRemove: (id: number) => Promise<void>;
  onChangeIsMain: (id: number, e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onChangeStatus: (id: number, e: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const Photo: React.FC<PropTypes> = ({
  id,
  url,
  status,
  isMain,
  onClickRemove,
  onChangeIsMain,
  onChangeStatus,
}) => {
  const [isProcessDelete, setIsProcessDelete] = useState<boolean>(false);
  const [isProcessChangeInfo, setIsProcessChangeInfo] = useState<boolean>(false);
  const isMounted = useMounted();

  const handlerClickRemove = () => {
    setIsProcessDelete(true);
    onClickRemove(id).then(() => {
      if (isMounted()) {
        setIsProcessDelete(false);
      }
    }).catch(() => {
      setIsProcessDelete(false);
    });
  };

  const handlerChangeIsMain = (e: ChangeEvent<HTMLInputElement>) => {
    setIsProcessChangeInfo(true);
    onChangeIsMain(id, e).then(() => {
      setIsProcessChangeInfo(false);
    }).catch(() => {
      setIsProcessChangeInfo(false);
    });
  };

  const handlerChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setIsProcessChangeInfo(true);
    onChangeStatus(id, e).then(() => {
      setIsProcessChangeInfo(false);
    }).catch(() => {
      setIsProcessChangeInfo(false);
    });
  };

  return (
    <div className="uploader-result-item-holder">
      <div className="uploader-result-item">
        <button
          type="button"
          className="uploader-result-item__button-remove"
          onClick={handlerClickRemove}
          disabled={isProcessDelete}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
        <div className="uploader-result-item-preview">
          <img src={url} />
        </div>
        <div className="uploader-result-item-actions">
          <div className="uploader-result-item__checkbox">
            <label>
              <input
                type="checkbox"
                name="isMain"
                checked={Boolean(isMain)}
                onChange={handlerChangeIsMain}
                disabled={isProcessChangeInfo}
              />
              Main photo
            </label>
          </div>
          <div className="uploader-result-item__checkbox">
            <label>
              <input
                type="checkbox"
                name="status"
                checked={Boolean(status)}
                onChange={handlerChangeStatus}
                disabled={isProcessChangeInfo}
              />
              Status
            </label>
          </div>
        </div>
      </div>
      <input type="hidden" className="form-control" name="photoIds[]" value={id} />
    </div>
  );
};

export { Photo };
