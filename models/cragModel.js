const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Array schemas
const fiveDaysSchema = new Schema([
    {
        Temperature: {
            Minimum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Maximum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Day: {
                Icon: {type: Number}
            }
        }
    },
    {
        Temperature: {
            Minimum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Maximum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Day: {
                Icon: {type: Number}
            }
        }
    },
    {
        Temperature: {
            Minimum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Maximum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Day: {
                Icon: {type: Number}
            }
        }
    },
    {
        Temperature: {
            Minimum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Maximum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Day: {
                Icon: {type: Number}
            }
        }
    },
    {
        Temperature: {
            Minimum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Maximum: {
                Value: {type: Number},
                Unit: {type: String}
            },
            Day: {
                Icon: {type: Number}
            }
        }
    }

]);

const twelveHoursSchema = new Schema([
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    },
    {WeatherIcon: {
        type: Number
    },
    Temperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RealFeelTemperature: {
        Value: {type: Number},
        Unit: {type: String}
    },
    RainProbability: {
        type: Number
    },
    SnowProbability: {
        type: Number
    }
    }
])

const cragSchema = new Schema({
    cragname: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    localityCode: {
        type: String,
        required: true
    },
    currentUpdate: {
        type: Number
    },
    fiveDaysUpdate: {
        type: Number
    },
    hourlyUpdate: {
        type: Number
    },
// Here goes weather info about the sector

    // Current Weather
    currentWeather: {
        WeatherText: {
            type: String
        },
        WeatherIcon: {
            type: Number
        },
        HasPrecipitation: {
            type: Boolean
        },
        PrecipitationType: {
            type: String
        },
        IsDayTime: {
            type: Boolean
        },
        Temperature: {
            Metric: {
                Value: {type: Number},
                Unit: {type: String}
            }
        },
        RealFeelTemperature: {
            type: Object
        }
    },
    // Five days weather
    fiveDaysWeather: {
        Text: {
            type: String
        },
        FiveDays: {
            type: [fiveDaysSchema]
        }
    },
    //Twelve hours weather
    twelveHoursWeather: {
        type:[twelveHoursSchema]
    }
    

});

module.exports = mongoose.model('Crag', cragSchema);