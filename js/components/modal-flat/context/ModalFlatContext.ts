import { createContext } from 'react';
import { ModalFlatContextType } from './ModalFlatContextType';

const ModalFlatContext = createContext<ModalFlatContextType>(null);

export { ModalFlatContext };
