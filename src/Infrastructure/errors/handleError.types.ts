import { ErrorType } from 'src/Domain/types/ErrorType';
import { GetError } from './getError.types';

export function handleError(
  errorType: ErrorType = ErrorType.INTERNAL_SERVER_ERROR,
  message: string = '',
) {
  const validations: Record<
    ErrorType,
    { message: string; defaultMessage: string; status: number }
  > = {
    ID_NOT_FOUND: {
      message: message,
      defaultMessage: 'O id não foi encontrado',
      status: 404,
    },

    INTERNAL_SERVER_ERROR: {
      message: message,
      defaultMessage: 'Erro interno do servidor',
      status: 500,
    },
  };

  const validation = validations[errorType];
  const messageType = message
    ? validation?.message
    : validation?.defaultMessage;

  throw new GetError(messageType, validation?.status).getError();
}
