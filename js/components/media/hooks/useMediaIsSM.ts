import useMedia from './useMedia';
import { MEDIA_SM } from '../constants';

const useMediaIsSM = () => useMedia({ minWidth: MEDIA_SM });

export default useMediaIsSM;
