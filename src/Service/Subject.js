export default class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer)
    }

    unsubscribe(observer) {
        const obsIndex = this.observers.findIndex(obs => { return obs === observer });

        if (obsIndex !== -1) {
            this.observers.slice(obsIndex, 1);
        }
    }

    notify(action) {
        if (this.observers.length > 0) {
            this.observers.forEach(observer => observer(action));
        }
    }
}

