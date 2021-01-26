const cherio = require('cherio')
const InshoreWatersForecastArea = require('./inshoreWatersForecastArea')

class InshoreWatersForecast {

    constructor(obj) {
        this.data = obj
    }

    static parse(input) {

        const $ = cherio.load(input)

        return new InshoreWatersForecast({
            synopsis: $('.synopsis-text').text().trim(),
            issued_at: $('#summary > div.times > p > time').first().attr('datetime'), // .get(0).attribs['datetime'],
            forecast_areas: $('div#inshore-waters-areas > section.marine-card').toArray().map( (el, i) => {
                return new InshoreWatersForecastArea({ 
                    area: { code: `area${i+1}`, name: $('h2', el).text().slice(0, -4).trim() },
                    issued_at: $('#summary > div.times > p > time').first().attr('datetime'),
                    warning:  $('div.card-content p', el).text(),
                    forecast: { 
                        wind: $('.forecast-info dd', el).eq(0).text(),
                        sea_state: $('.forecast-info dd', el).eq(1).text(),
                        weather: $('.forecast-info dd', el).eq(2).text(),
                        visibility: $('.forecast-info dd', el).eq(3).text()
                    },
                    outlook: {
                        wind: $('.forecast-info dd', el).eq(4).text(),
                        sea_state: $('.forecast-info dd', el).eq(5).text(),
                        weather: $('.forecast-info dd', el).eq(6).text(),
                        visibility: $('.forecast-info dd', el).eq(7).text()
                    }
                })
            })
        })
    }

    get synopsis() { return this.data.synopsis }
    get issued_at() { return this.data.issued_at }
    get forecast_areas() { return this.data.forecast_areas }
    
    forecast_area(area) {
        return this.data.forecast_areas.find( f => f.code == area)
    }

    toJSON(key) {
        return this.data
    }
}

module.exports = InshoreWatersForecast