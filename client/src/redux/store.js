// app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import  cartReducer  from './CartSlice'
import  userReducer  from './UserSlice'
import globalSearchReducer from './GlobalSearchItemSlice'
import globalModalReducer from './GlobalModalSlice'
import popUpReducer from "./PopupSlice"
import notificationReducer from "./NotificationSlice"


const persistConfig = {
    key: "root",
    storage,
    blacklist: ['cart', 'globalModal', 'globalSearchItem', 'popUp', 'notification']

  }

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    notification: notificationReducer,
    globalModal: globalModalReducer,
    globalSearch: globalSearchReducer,
    popUp: popUpReducer

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