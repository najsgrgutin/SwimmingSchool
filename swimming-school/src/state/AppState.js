import { observable, decorate } from 'mobx';

class AppState {
    notifications = [];
}

decorate(AppState, {
    notifications: observable
});

export const appState = new AppState();