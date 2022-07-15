import useMedia from './useMedia';
import { MEDIA_LG } from '../constants';

const useMediaIsLG = () => useMedia({ minWidth: MEDIA_LG });

export default useMediaIsLG;
