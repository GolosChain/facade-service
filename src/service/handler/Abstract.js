class Abstract {
    constructor(gate) {
        this._gate = gate;
    }

    async sendTo(...args) {
        return await this._gate.sendTo(...args);
    }
}

module.exports = Abstract;
