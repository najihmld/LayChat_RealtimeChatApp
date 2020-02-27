import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import promiseMiddleware from 'redux-promise-middleware';
import AsyncStorage from '@react-native-community/async-storage';

import reducer from './reducer';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(promiseMiddleware, logger)
);
const persistor = persistStore(store);

export { store, persistor };
