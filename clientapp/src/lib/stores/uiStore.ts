import { makeAutoObservable } from "mobx";

export default class UIStore {
    isLoading: boolean = false;
    activeTab: number = 0; // About

    constructor() {
        makeAutoObservable(this);
    }

    isBusy = () => {
        this.isLoading = true;
    }

    isIdle = () => {
        this.isLoading = false;
    }

    setActiveProfileTab = (activetab: number) => {
        this.activeTab = activetab;
    }
}