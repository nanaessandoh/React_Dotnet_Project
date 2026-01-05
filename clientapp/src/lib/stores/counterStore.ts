import { makeAutoObservable } from 'mobx';

export default class CounterStore {
    title: string = 'Counter Store';
    count: number = 500;
    events: string[] = [
        `Initial count is ${this.count}`
    ];

    constructor() {
        makeAutoObservable(this);
    }

    reset = () => {
        this.count = 0;
    }

    increment = (amount: number = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount} - new count is ${this.count}`);
    }

    decrement = (amount: number = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount} - new count is ${this.count}`);
    }

    get eventCount() {
        return this.events.length;
    }
}