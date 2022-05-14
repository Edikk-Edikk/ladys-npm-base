import { useContext } from 'react';
import { ModalFlatContextType } from '../context';
import { ModalFlatContext } from '../context';

const useModalFlatContext = (): ModalFlatContextType => useContext<ModalFlatContextType>(ModalFlatContext);

export { useModalFlatContext };
