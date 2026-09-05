import { configureStore } from "@reduxjs/toolkit";
import authSlice from './feature/auth/auth.slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import productSlice from './feature/product/product.slice'
import cartSlice from './feature/cart/cart.slice'
import wishlistSlice from './feature/wishlist/wishlist.slice'

const persistConfig = {
    key: 'root',
    storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const persistedProductReducer = persistReducer(persistConfig, productSlice);

const persistedCartReducer = persistReducer(persistConfig, cartSlice);

const persistedWishlistReducer = persistReducer(persistConfig, wishlistSlice);

export const store = configureStore({
    reducer: {
      auth : persistedAuthReducer, 
      product : persistedProductReducer,
      cart : persistedCartReducer,
      wishlist : persistedWishlistReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor = persistStore(store);

// Infexport const persistor = persistStore(store);er the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
