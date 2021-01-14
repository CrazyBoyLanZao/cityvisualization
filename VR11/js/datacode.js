/***
 AQI:  0 ~ 250
 SO2:  0 ~ 385
 NO2:  0 ~ 161
 PM10:  0 ~ 200
 CO:  0.0 ~ 9.373
 O3:  0 ~ 262
 PM25:  0 ~ 200
 rain: 0 ~ 246.4
 * ****/
function AQIColor(AQI){
    if(AQI > 0 && AQI < 50)
        return '#0000ff';
    else if(AQI >= 50 && AQI < 100)
        return '#00ff33';
    else if(AQI >= 100 && AQI < 150)
        return '#ffee00';
    else if(AQI >= 150 && AQI < 200)
        return '#ff8800';
    else if(AQI >= 200)
        return '#ff0000';
    else if(AQI <= 0)
        return '#ffffff';
}
function RainColor(rain){
    if(rain >= 0 && rain < 50)
        return '#00ffbb';
    else if(rain >= 50 && rain < 100)
        return '#00ffee';
    else if(rain >= 100 && rain < 150)
        return '#00bbff';
    else if(rain >= 150 && rain < 200)
        return '#0099ff';
    else if(rain >= 200)
        return '#0055ff';
}
