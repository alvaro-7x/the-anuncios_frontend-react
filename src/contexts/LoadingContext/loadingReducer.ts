import { IUTypes } from '../../types/IUTypes';
import { LoadingActions } from '../../actions/LoadingActions';
import { LoadingState } from '../../interfaces/interfaces';

export const loadingReducer = (state: LoadingState, action: LoadingActions) =>
{
  switch (action.type)
  {
    case IUTypes.loadingIniciado:
      return {
        isLoading: true
      };

    case IUTypes.loadingTerminado:
      return {
        isLoading: false
      };

    default:
      return state;
  }
};
