const Crag = require('../models/cragModel');
const mongoose = require('mongoose');
const axios = require('axios');

// Get all crags
const getCrags = async (req, res) => {
    const crags = await Crag.find({});

    res.status(200).json(crags);
}

// Get a single crag
const getCrag = async (req, res) => {
    const {id} = req.params;
    console.log(req.params);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Crag does not exist'})
    };

    const crag = await Crag.findById(id);

    if(!crag) {
        return res.status(404).json({error:'Crag does not exist'})
    };

    res.status(200).json(crag);
}

// Create new crag
const createCrag = async (req, res) => {
    const {cragname, locality} = req.body;
    
    // Add doc to DB
    try {
        const crag = await Crag.create({cragname, locality});
        res.status(200).json(crag);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

// Delete crag
const deleteCrag = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Crag does not exist'})
    };

    const crag = await Crag.findOneAndDelete({_id: id});
    
    if(!crag) {
        return res.status(404).json({error:'Crag does not exist'})
    };

    res.status(200).json(crag);
}

// Update crag
const updateCrag = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Crag does not exist'})
    };

    const crag = await Crag.findOneAndUpdate(
        {_id: id}, 
        {...req.body},
        )

    if(!crag) {
        return res.status(404).json({error:'Crag does not exist'})
    };

    res.status(200).json(crag);
}

// GET API info and PATCH crag with current weather
const getCurrentWeather = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Crag does not exist'})
    };

    const crag = await Crag.findById(id);

    if(!crag) {
        return res.status(404).json({error:'Crag does not exist'})
    };

    const localityCode = crag.localityCode; 
 
    const options = {
        method: 'GET',
        url: `http://dataservice.accuweather.com/currentconditions/v1/${localityCode}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&language=es`,
        'accept-encoding': '*'
      };

    axios.request(options)
    .then( async (response) => {        
        const updatedCrag = await Crag.updateMany({localityCode: localityCode}, {$set:{
            currentUpdate: (new Date()).getTime(),
            currentWeather: {
            WeatherText: response.data[0].WeatherText,
            WeatherIcon: response.data[0].WeatherIcon,
            HasPrecipitation: response.data[0].HasPrecipitation,
            PrecipitationType: response.data[0].IsDayTime,
            Temperature: response.data[0].Temperature},
            RealFeelTemperature: response.data[0].RealFeelTemperature
        }})

        res.json(updatedCrag);
    })
    .catch((error) => {
        console.log(error);
    })
}

//GET API info and PATCH crag with five days weather
const getFiveDays = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Crag does not exist'})
    };

    const crag = await Crag.findById(id);

    if(!crag) {
        return res.status(404).json({error:'Crag does not exist'})
    };

    const localityCode = crag.localityCode; 
 
    const options = {
        method: 'GET',
        url: `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${localityCode}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&language=es`,
        'accept-encoding': '*'
      };

    axios.request(options)
    .then( async (response) => {       
        const updatedCrag = await Crag.updateMany({localityCode: localityCode}, {$set:{
            fiveDaysUpdate: (new Date()).getTime(),
            fiveDaysWeather: {
                Text: response.data.Headline.Text,
                FiveDays: [
                    {
                        Temperature: {
                            Minimum: {
                                Value: Math.round(((response.data.DailyForecasts[0].Temperature.Minimum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Maximum: {
                                Value: Math.round(((response.data.DailyForecasts[0].Temperature.Maximum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Day: {
                                Icon: response.data.DailyForecasts[0].Day.Icon
                            }
                        }
                    },
                    {
                        Temperature: {
                            Minimum: {
                                Value: Math.round(((response.data.DailyForecasts[1].Temperature.Minimum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Maximum: {
                                Value: Math.round(((response.data.DailyForecasts[1].Temperature.Maximum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Day: {
                                Icon: response.data.DailyForecasts[1].Day.Icon
                            }
                        }
                    },
                    {
                        Temperature: {
                            Minimum: {
                                Value: Math.round(((response.data.DailyForecasts[2].Temperature.Minimum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Maximum: {
                                Value: Math.round(((response.data.DailyForecasts[2].Temperature.Maximum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Day: {
                                Icon: response.data.DailyForecasts[2].Day.Icon
                            }
                        }
                    },
                    {
                        Temperature: {
                            Minimum: {
                                Value: Math.round(((response.data.DailyForecasts[3].Temperature.Minimum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Maximum: {
                                Value: Math.round(((response.data.DailyForecasts[3].Temperature.Maximum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Day: {
                                Icon: response.data.DailyForecasts[3].Day.Icon
                            }
                        }
                    },
                    {
                        Temperature: {
                            Minimum: {
                                Value: Math.round(((response.data.DailyForecasts[4].Temperature.Minimum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Maximum: {
                                Value: Math.round(((response.data.DailyForecasts[4].Temperature.Maximum.Value) - 32) /1.8),
                                Unit: "C"
                            },
                            Day: {
                                Icon: response.data.DailyForecasts[4].Day.Icon
                            }
                        }
                    }
                ]
            },
        }})

        res.json(updatedCrag);
    })
    .catch((error) => {
        console.log(error);
    })
}

//GET API info and PATCH crag with 12 hours weather
const getTwelveHours = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Crag does not exist'})
    };

    const crag = await Crag.findById(id);

    if(!crag) {
        return res.status(404).json({error:'Crag does not exist'})
    };

    const localityCode = crag.localityCode; 
 
    const options = {
        method: 'GET',
        url: `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${localityCode}?apikey=${process.env.REACT_APP_ACCUWEATHER_API_KEY}&language=es&details=true`,
        'accept-encoding': '*'
      };

    axios.request(options)
    .then( async (response) => {       
        const updatedCrag = await Crag.updateMany({localityCode: localityCode}, {$set:{
            twelveHoursUpdate: (new Date()).getTime(),
            twelveHoursWeather: [
                {
                    WeatherIcon: response.data[0].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[0].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[0].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[0].RainProbability,
                    SnowProbability: response.data[0].SnowProbability
                },
                {
                    WeatherIcon: response.data[1].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[1].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[1].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[1].RainProbability,
                    SnowProbability: response.data[1].SnowProbability
                },
                {
                    WeatherIcon: response.data[2].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[2].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[2].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[2].RainProbability,
                    SnowProbability: response.data[2].SnowProbability
                },
                {
                    WeatherIcon: response.data[3].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[3].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[3].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[3].RainProbability,
                    SnowProbability: response.data[3].SnowProbability
                },
                {
                    WeatherIcon: response.data[4].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[4].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[4].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[4].RainProbability,
                    SnowProbability: response.data[4].SnowProbability
                },
                {
                    WeatherIcon: response.data[5].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[5].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[5].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[5].RainProbability,
                    SnowProbability: response.data[5].SnowProbability
                },
                {
                    WeatherIcon: response.data[6].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[6].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[6].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[6].RainProbability,
                    SnowProbability: response.data[6].SnowProbability
                },
                {
                    WeatherIcon: response.data[7].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[7].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[7].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[7].RainProbability,
                    SnowProbability: response.data[7].SnowProbability
                },
                {
                    WeatherIcon: response.data[8].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[8].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[8].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[8].RainProbability,
                    SnowProbability: response.data[8].SnowProbability
                },
                {
                    WeatherIcon: response.data[9].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[9].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[9].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[9].RainProbability,
                    SnowProbability: response.data[9].SnowProbability
                },
                {
                    WeatherIcon: response.data[10].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[10].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[10].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[10].RainProbability,
                    SnowProbability: response.data[10].SnowProbability
                },
                {
                    WeatherIcon: response.data[11].WeatherIcon,
                    Temperature: {
                        Value: Math.round(((response.data[11].Temperature.Value) - 32) /1.8),
                        Unit: "C"
                    },
                    RealFeelTemperature: {
                        Value: Math.round(((response.data[11].RealFeelTemperature.Value) - 32) /1.8),
                        Unit: "C"    
                    },
                    RainProbability: response.data[11].RainProbability,
                    SnowProbability: response.data[11].SnowProbability
                }
            ],
        }})

        res.json(updatedCrag);
    })
    .catch((error) => {
        console.log(error);
    })
}

module.exports = {
    getCrags,
    getCrag,
    createCrag,
    deleteCrag,
    updateCrag,
    getCurrentWeather,
    getFiveDays,
    getTwelveHours
}