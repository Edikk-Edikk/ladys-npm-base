import useMedia from './useMedia';
import { MEDIA_XXL } from '../constants';

const useMediaIsXXL = () => useMedia({ minWidth: MEDIA_XXL });

export default useMediaIsXXL;
