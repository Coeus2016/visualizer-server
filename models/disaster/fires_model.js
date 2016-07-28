///@file fires_model.js
/// model for storing fire data found at source: https://firms.modaps.eosdis.nasa.gov/active_fire/c6/text/MODIS_C6_Global_24h.csv
module.exports = {
        [
            {
		    latitude: String,
		    longitude: String,
                    brightness: Decimal,
                    scan: Decimal,
                    track: Decimal,
                    acq_date: Date,
                    acq_time: Long_Integer,
                    satellite: String,
                    confidence: Integer,
                    version: String,
                    bright_t31: Decimal,
                    frp: Decimal,
                    daynight: String
            }
        ]
};


/*module.exports = {
    type: "FeatureCollection",
    features:
        [
            {
                type: "Feature",
                properties: {
                    brightness: Decimal,
                    scan: Decimal,
                    track: Decimal,
                    acq_date: Date,
                    acq_time: Long_Integer,
                    satellite: String,
                    confidence: Integer,
                    version: String,
                    bright_t31: Decimal,
                    frp: Decimal,
                    daynight: String
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        longitude,
                        latitude
                    ]
                },
                id: String
            },
        ]
};*/
