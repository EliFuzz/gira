import { sendMessageToFront } from '../utils/message';

export const sendSuccessMessageToFront = (message) =>
  sendMessageToFront('SUCCESS', { message });

export const sendErrorMessageToFront = (message) =>
  sendMessageToFront('ERROR', { message });
