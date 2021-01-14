const echarts = require('echarts')
// const d3 = require('d3')
const axios = require('axios')
let m = 0, d = 0;

function Add() {
  d += 1
  Draw1(m, d)
  Draw2(d)
}

function Delt() {
  if (!d) {
    d += 1;
  }
  d -= 1
  Draw1(m, d)
  Draw2(d)
}

console.log(d)
let div
let series
axios.get('static/json/AQI.json').then(function (res) {
  series = res.data["南昌"]
  div = document.getElementById("textDiv")
  div.textContent = "对健康影响情况：敏感人群症状会有轻度加剧对健康人群没有明显影响。建议采取的措施:儿童，老年机心脏病、呼吸系统疾病患者应尽量减少体力消耗大的户外运动。"
  // div.textContent = "My text"
})

function Draw2(d) {
  if (series[0][d][1] >= 0 && series[0][d][1] < 50) {
    div.textContent = "对健康影响情况：空气质量令人满意，基本无空气污染，对健康没有危害"+"</br>"+ "建议采取的措施:各类人群可多参加户外活动，多呼吸一下清新的空气。"
  } else if (series[0][d][1] >= 50 && series[0][d][1] < 100) {
    div.textContent = "对健康影响情况：除去少数对某些污染物特别敏感的人群外，不会对人体家尼康产生危害。建议采取的措施:除少数对某些污染物特别容易过敏的人群外，其他人群可以正常进行室外活动。"
  } else if (series[0][d][1] >= 100 && series[0][d][1] < 150) {
    div.textContent = "对健康影响情况：敏感人群症状会有轻度加剧对健康人群没有明显影响。建议采取的措施:儿童，老年机心脏病、呼吸系统疾病患者应尽量减少体力消耗大的户外运动。"
  } else if (series[0][d][1] >= 150 && series[0][d][1] < 200) {
    div.textContent = "对健康影响情况：敏感人群症状进一步加剧，对健康人群的心脏、呼吸系统哟影响。建议采取的措施:儿童、老年人机心脏病、呼吸系统病患者应尽量减少外出，停留在室内，一般人群应适量减少户外运动。"
  }
}

function Draw1(m=0, d=0) {
  axios.get('static/json/panel.json').then(function (res) {
    const series = res.data["南昌"];
    let dom = document.getElementById("panel");
    let myChart = echarts.init(dom);
    let option;
    // console.log(series)
    // let ans = series[m][d][1]
    option = {
      series: [{
        center:['50%','70%'],
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#7CFFB2'],
              [0.5, '#58D9F9'],
              [0.75, '#FDDD60'],
              [1, '#FF6E76']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 3
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#000000',
          fontSize: 20,
          distance: -80,

          formatter: function (value) {
            if (value === 0.875) {
              return '中度';
            } else if (value === 0.625) {
              return '轻度';
            } else if (value === 0.375) {
              return '良';
            } else if (value === 0.125) {
              return '优';
            }
          }
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 10
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, '40%'],
          valueAnimation: true,
          formatter: function (value) {
            return Math.round(value * 200);
          },
          color: 'auto'
        },
        data: [{
          value: series[m][d][1] / 200,
          name: 'AQI评定',
          time: series[m][d][0]
        }],
      }]
    };
    myChart.setOption(option);
  })
}

export {
  Draw1
}
