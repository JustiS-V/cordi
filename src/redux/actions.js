// actions.js
export const ADD_LOG_MESSAGE = 'ADD_LOG_MESSAGE';
export const CLEAN_LOG = 'CLEAN_LOG';
export const USB_SERIAL_ADD = 'USB_SERIAL_ADD';

export const addLogMessage = (text) => ({
  type: ADD_LOG_MESSAGE,
  payload: text,
});

export const cleanLog= (item) => ({
  type: CLEAN_LOG,
  payload: item,
});

export const usbSerialAdd = (item) => ({
  type: USB_SERIAL_ADD,
  payload: item,
});


