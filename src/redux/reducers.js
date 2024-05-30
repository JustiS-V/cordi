// reducers.js
import { combineReducers } from 'redux';
import { ADD_LOG_MESSAGE, CLEAN_LOG, USB_SERIAL_ADD, UPDATE_SETTINGS } from './actions';

const initialState = {
  messages: [],
  devices: [],
  settings: {
    baudRate: '9600',
    parity: 'None',
    dataBits: '8',
    stopBits: '1',
  },
  usbSerial: null,
};

const messagesReducer = (state = initialState.messages, action) => {
  switch (action.type) {
    case ADD_LOG_MESSAGE:
      return [...state, action.payload];
    case CLEAN_LOG:
      return state.filter((message) => message !== action.payload);
    default:
      return state;
  }
};

const devicesReducer = (state = initialState.devices, action) => {
  switch (action.type) {
    case USB_SERIAL_ADD:
      return [...state, action.payload];
    default:
      return state;
  }
};

const settingsReducer = (state = initialState.settings, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const usbSerialReducer = (state = initialState.usbSerial, action) => {
  switch (action.type) {
    case USB_SERIAL_ADD:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages: messagesReducer,
  devices: devicesReducer,
  settings: settingsReducer,
  usbSerial: usbSerialReducer,
});

export default rootReducer;
