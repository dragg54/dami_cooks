// app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: "root",
    storage,
    blacklist: [ ]
  
  }

export const rootReducer = combineReducers({
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat()
});
export const persistor = persistStore(store)
export default store;