const util = require('util')
const fs = require('fs')
const path = require('path')
const InshoreWatersForecast = require('../../lib/inshoreWatersForecast')

describe("Inshore waters forecast", function() {
    it("parses webpage", function() {
        test_data = path.join(__dirname, 'forecast 2021-01-24 1200.html')
        const input = fs.readFileSync(test_data, 'utf8')
        const result = InshoreWatersForecast.parse(input) 

        //console.log('result ->', result.data, result)
        //console.log('issued_at ->', result.data.issued_at, result.issued_at)
        //console.log('forecast_areas ->', result.data.forecast_areas)
        //console.log('area7 ->', JSON.stringify(result.forecast_area('area7')))
        //console.log('data', JSON.stringify(result, null, 4))

        expect(result.synopsis).toBe('Various areas of low pressure in the vicinity of the British Isles will bring generally unsettled conditions during the next couple of days. Wintry showers will affect most areas, especially the south during Sunday.');
        expect(result.issued_at).toBe('2021-01-24T12:00:00Z')
        expect(result.forecast_areas.length).toBe(19)

        let area = result.forecast_area('area7')
        expect(area.name).toBe('Selsey Bill to Lyme Regis')
        expect(area.issued_at).toBe('2021-01-24T12:00:00Z')
        expect(area.forecast.wind).toBe('West veering northwest 4 to 6, decreasing 3 at times later.')
        expect(area.forecast.sea_state).toBe('Slight or moderate, occasionally rough offshore in west.')
        expect(area.forecast.weather).toBe('Showers, wintry at times, becoming fair later.')
        expect(area.forecast.visibility).toBe('Good, occasionally poor.')

        expect(result.forecast_area('area19').name).toBe('Channel Islands')
        expect(result.forecast_area('area19').forecast.wind).toBe('Westerly 4 to 6 locally 7, soon increasing 5 to 7 locally gale 8, veering northwesterly this evening, then northerly 3 to 5 by tomorrow morning, decreasing 2 to 4 later.')
        expect(result.forecast_area('area19').forecast.sea_state).toBe('Rather rough to rough, occasionally very rough in the far west of the area until late evening, becoming slight to moderate with a low to moderate swell by morning.')
        expect(result.forecast_area('area19').forecast.weather).toBe('Scattered showers, locally heavy with hail and thunder, perhaps occasionally turning to sleet, becoming isolated by midnight and dying out by morning.')
        expect(result.forecast_area('area19').forecast.visibility).toBe('Good, locally moderate to poor at times.')

        expect(result.forecast_area('area8').name).toBe('Lyme Regis to Lands End including the Isles of Scilly')
        expect(result.forecast_area('area8').outlook.wind).toBe('Variable 3 or less, becoming southwesterly 3 to 5, increasing 6 or 7 later, then veering westerly 3 to 5 later.')
        expect(result.forecast_area('area8').outlook.sea_state).toBe('Slight or moderate, occasionally rough to the west of land\'s end.')
        expect(result.forecast_area('area8').outlook.weather).toBe('Showers, rain later.')
        expect(result.forecast_area('area8').outlook.visibility).toBe('Good, occasionally moderate.')
      });


  });