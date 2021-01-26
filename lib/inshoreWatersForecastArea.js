class InshoreWatersForecastArea {

    constructor(obj) {
        this.data = obj
    }

    get code() { return this.data.area.code}
    get name() { return this.data.area.name }

    get issued_at() { return this.data.issued_at }

    get warning() { return this.data.warning }

    get forecast() { return this.data.forecast }
    get outlook() { return this.data.outlook }

    toJSON(key) {
        return this.data
    }
    
}

module.exports = InshoreWatersForecastArea