import {combineReducers} from 'redux';
import pageListReducers from './pageListReducers';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_APP_LOADER } from '../../constants';

  const initialState = {
    showLoader: false
}

const initReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_APP_LOADER:
      return{
        ...state,
        showLoader: action?.payload?.show
      }
      
    default:
        return state;
  }
}


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blackList: [initReducer, pageListReducers]
};

const appReducer = combineReducers({
    pageListReducers: persistReducer(persistConfig, pageListReducers),
    initReducer: persistReducer(persistConfig, initReducer),
})

export default (reduxReducers = (state, action) => {
    return appReducer(state, action);
  });

  