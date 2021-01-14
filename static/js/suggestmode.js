// const echarts = require('echarts');
export default class suggestmode {
  constructor() {

  }

  async initMode( time = '2019-9-1',data = '庐山') {
    const json = await $.getJSON('static/json/confortable/' + data + '.json')
    let date = document.getElementById('date')
    let tempreature = document.getElementById('temprature')
    let humid = document.getElementById('humid')
    let speed = document.getElementById('speed')
    let humanconfrot = document.getElementById('comfortable')
    let humidtem = document.getElementById('temperaturehumid')
    for (let i of json) {
      if (i['日期'] === time) {
        date.innerText = i['日期']
        tempreature.innerText = i['温度'] + '℃'
        humid.innerText = i['湿度'] + '%'
        speed.innerText = i['风速'] + 'm/s'
        humanconfrot.innerText = CIHB(i['CIHB'])
        humidtem.innerText = THI(i['THI'])
      }
    }
  }

}

function THI(data) {
  if (data <= 14.0)
    return '很冷，不舒服'
  else if (data <= 16.9)
    return '偏冷，较不舒服'
  else if (data <= 25.4)
    return '感觉舒适'
  else if (data <= 27.5)
    return '有热感，较不舒服'
  else if (data > 27.5)
    return '闷热难受，不舒服'
}

function CIHB(data) {
  if (data <= 20)
    return '寒冷'
  else if (data <= 40)
    return '冷'
  else if (data <= 50)
    return '凉爽舒适'
  else if (data <= 70)
    return '舒适'
  else if (data <= 80)
    return '温暖舒适'
  else if (data <= 85)
    return '温暖舒适'
  else if (data > 85)
    return '温暖舒适'
}

// function

