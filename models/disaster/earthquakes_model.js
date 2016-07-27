module.exports = {
    type: "FeatureCollection",
    metadata:
    {
        generated: Number,
        url: String,
        title: String,
        api: String,
        count: Number,
        status: Number
    },
    bbox: [
        'minimum longitude',
        'minimum latitude',
        'minimum depth',
        'maximum longitude',
        'maximum latitude',
        'maximum depth'
    ],
    features:
        [
            {
                type: "Feature",
                properties: {
                    mag: Number,
                    place: String,
                    time: Number,
                    updated: Number,
                    tz: Number,
                    url: String,
                    detail: String,
                    felt: Number,
                    cdi: Number,
                    mmi: Number,
                    alert: String,
                    status: String,
                    tsunami: Number,
                    sig: Number,
                    net: String,
                    code: String,
                    ids: String,
                    sources: String,
                    types: String,
                    nst: Number,
                    dmin: Number,
                    rms: Number,
                    gap: Number,
                    magType: String,
                    type: String
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        
                    ]
                },
                id: String
            },
        ]
};