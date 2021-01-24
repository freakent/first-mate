class InshoreWatersForecastArea {

    constructor(obj) {
        this.data = obj
    }

    get code() { return this.data.area.code}
    get name() { return this.data.area.name }

    get warning() { return this.data.warning }

    get forecast() { return this.data.forecast }
    get outlook() { return this.data.outlook }
    
    forecast_area(area) {
        return this.data.forecast_areas.find( f => f.area.code == area )
    }

}

module.exports = InshoreWatersForecastArea