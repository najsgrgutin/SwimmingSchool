import React from 'react';
import { appState } from './AppState';

export const AppContext = React.createContext({
    appState: appState,
});