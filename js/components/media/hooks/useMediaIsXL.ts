import useMedia from './useMedia';
import { MEDIA_XL } from '../constants';

const useMediaIsXL = () => useMedia({ minWidth: MEDIA_XL });

export default useMediaIsXL;
