//@LIBRERIAS
import { ThunkDispatch, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage

import tokenReducer from './auth/token/token.reducer'
import headquarterReducer from './app/settings/headquarters/headquarters.reducer'
import paymentMethodReducer from './app/settings/paymentMehtods/paymentMethods.reducer'
import salesLogsReducer from './app/salesLogs/salesLogs.reducer'
import employeeReducer from './app/settings/employees/employees.reducer'

const userReducerCombined = combineReducers({
    token: tokenReducer,
})



const rootReducer = combineReducers({
    user: userReducerCombined,
    headquarters: headquarterReducer,
    paymentMethods: paymentMethodReducer,
    salesLogs: salesLogsReducer,
    employees: employeeReducer,
})

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        whitelist: ['user']
    },
    rootReducer
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const persistor = persistStore(store)

