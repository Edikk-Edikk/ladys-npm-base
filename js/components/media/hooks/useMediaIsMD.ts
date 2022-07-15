import useMedia from './useMedia';
import { MEDIA_MD } from '../constants';

const useMediaIsMD = () => useMedia({ minWidth: MEDIA_MD });

export default useMediaIsMD;
