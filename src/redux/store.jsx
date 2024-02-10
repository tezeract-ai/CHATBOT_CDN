import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "./rootReducer";
import { resetAuth } from "./reducers/authReducer";

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

export function logOut() {
  return async () => {
    await dispatch(resetAuth());
    await persistor.purge();
    await localStorage.clear();
  };
}

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
