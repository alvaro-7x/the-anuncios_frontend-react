import { createContext } from 'react';
import { LoadingActions } from '../../actions/LoadingActions';
import { LoadingState } from '../../interfaces/interfaces';

interface LoadingContextInterface
{
  isLoading: LoadingState;
  dispatchLoading: (d: LoadingActions)=>void;
}

export const LoadingContext = createContext<LoadingContextInterface>({} as LoadingContextInterface);
