import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./rootReducer";
import { initSagas } from "./sagas/initSagas";

const sagaMiddleware = createSagaMiddleware();

export const dependencies = {
  history: createBrowserHistory(),
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["router"],
};

const persistedReducer = persistReducer(
  persistConfig,
  reducers(dependencies.history)
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware, logger],
});

const persistor = persistStore(store);

initSagas(sagaMiddleware);

export { store, persistor };
