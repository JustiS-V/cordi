// reducers.js
import { ADD_LOG_MESSAGE, CLEAN_LOG, USB_SERIAL_ADD} from './actions';

const initialState = {
  messages: [],
  devices: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOG_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case CLEAN_LOG:
      return {
        ...state,
        messages: state.messages.filter((todo) => todo.id !== action.payload),
    };
    case USB_SERIAL_ADD:
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };
    default:
      return state;
  }
};

export default todoReducer;
