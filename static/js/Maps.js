import {Scene, PointLayer} from '@antv/l7';
import {GaodeMap} from '@antv/l7-maps';
// import {Scene} from '@antv/l7';
import {ProvinceLayer} from '@antv/l7-district';
import {Mapbox} from '@antv/l7-maps';
import {Marker} from "@antv/l7-component";

const axios = require('axios')


export default class maps {
  constructor() {
    this.colors = ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'];
    this.scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        center: [115.9, 27.40013],
        pitch: 30,
        style: 'blank',
        zoom: 3,
        minZoom: 3,
        maxZoom: 10,
        doubleClickZoom: false
      }),
      logoVisible: false
    })
    this.data = null
    this.MarkerPinImg = {
      green:
        'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*JhBbT4LvHpQAAAAAAAAAAAAAARQnAQ',
      blue:
        'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*n6cXTb8R7iUAAAAAAAAAAAAAARQnAQ',
    };
    this.countryLayer = null;
    return this
  }

  async initMaps(word, raindown, cityAQI, moredimention, headmap) {
    this.data = await $.getJSON('static/json/city.json');
    // this.scence = ;
    // console.log(this.data)
    this.scene.on('loaded', () => {
      this.countryLayer = new ProvinceLayer(this.scene, {
        data: this.data,
        joinBy: ['adcode', 'code'],
        adcode: ['360000'],
        depth: 2,
        label: {
          field: 'NAME_CHN',
          textAllowOverlap: false
        },
        fill: {
          color: {
            field: 'pop',
            values: this.colors
          }
        },
        popup: {
          enable: true,
          Html: props => {
            return `<span>${props.NAME_CHN}:</span><span>${props.pop}</span>`;
          }
        }
      });
      // this.countryLayer.off('dblclick')
      this.addMarkers(word, raindown)
      this.scene.on('click', function (e) {
        axios.get('https://restapi.amap.com/v3/geocode/regeo?output=json&location=' + e.lnglat.lng + ',' + e.lnglat.lat
          + '&key=3e7a24eb63ccd0362f20ef75c17ab511&radius=1000&extensions=all')
          .then(function (response) {
            raindown.updateRain(response.data.regeocode.addressComponent.city).then(r => r)
            cityAQI.initcityaqi(response.data.regeocode.addressComponent.city).then(r => r)
          }).catch(function (error) {
          console.log(error);
        });
      })
      this.scene.on('dblclick', function (e) {
        axios.get('https://restapi.amap.com/v3/geocode/regeo?output=json&location=' + e.lnglat.lng + ',' + e.lnglat.lat
          + '&key=3e7a24eb63ccd0362f20ef75c17ab511&radius=1000&extensions=all')
          .then(function (response) {
            moredimention.initdimention(response.data.regeocode.addressComponent.city)
            headmap.initheatmap(response.data.regeocode.addressComponent.city)
          }).catch(function (error) {
          console.log(error);
        });
      })
    })

  }

  // aqiEvent(cityAQI, raindown, moredimention, headmap) {
  //   let scene = this.scene
  //   scene.on('click', function (e) {
  //     axios.get('https://restapi.amap.com/v3/geocode/regeo?output=json&location=' + e.lnglat.lng + ',' + e.lnglat.lat
  //       + '&key=3e7a24eb63ccd0362f20ef75c17ab511&radius=1000&extensions=all')
  //       .then(function (response) {
  //         raindown.updateRain(response.data.regeocode.addressComponent.city).then(r => console.log(r))
  //         cityAQI.initcityaqi(response.data.regeocode.addressComponent.city).then(r => console.log(r))
  //       }).catch(function (error) {
  //       console.log(error);
  //     });
  //   })
  //   scene.on('dblclick', function (e) {
  //     axios.get('https://restapi.amap.com/v3/geocode/regeo?output=json&location=' + e.lnglat.lng + ',' + e.lnglat.lat
  //       + '&key=3e7a24eb63ccd0362f20ef75c17ab511&radius=1000&extensions=all')
  //       .then(function (response) {
  //         moredimention.initdimention(response.data.regeocode.addressComponent.city)
  //         headmap.initheatmap(response.data.regeocode.addressComponent.city)
  //       }).catch(function (error) {
  //       console.log(error);
  //     });
  //   })
  // }

  addMarkers(word, raindown) {
    axios.get('static/json/Attraction.json')
      .then((response) => {
        let nodes = response.data
        for (let i = 0; i < nodes.length; i++) {
          const el = createMark(nodes[i].name, this.MarkerPinImg)
          const marker = new Marker({
            element: el,
            extData: nodes[i].name
          }).setLnglat({lng: nodes[i].lng, lat: nodes[i].lat});
          this.scene.addMarker(marker);
          marker.on('click', (e) => {
            raindown.updaterainplace(e.data).then()
            word.updateclouds(e.data).then()
          })
          marker.on('dblclick', (e) => {
            var r = confirm("无设备原因,是否播放演示视频");
            if (r === true) {
              window.open('https://www.bilibili.com/video/BV1vX4y1K7XZ/','_self');
            } else {
              window.open('VR11/VR.html', '_self');
            }

          })
        }
      });
  };

  updatefillMap(startTime, endTime) {
    createtimeData(startTime, endTime).then((r) => {
      // console.log(r)
      this.countryLayer = new ProvinceLayer(this.scene, {
        data: r,
        joinBy: ['adcode', 'code'],
        adcode: ['360000'],
        depth: 2,
        label: {
          field: 'NAME_CHN',
          textAllowOverlap: false
        },
        fill: {
          color: {
            field: 'pop',
            values: this.colors
          }
        },
        popup: {
          enable: true,
          Html: props => {
            return `<span>${props.NAME_CHN}:</span><span>${props.pop}</span>`;
          }
        }
      })
      // this.countryLayer.updateData(r)
      // console.log(this.countryLayer.updateData(r))
    })
  }

}

function createMark(title, MarkerPinImg) {
  const el1 = document.createElement('div')
  el1.className = 'markContent'
  const el2 = document.createElement('div')
  el2.style.display = "flex"
  el2.style.alignItems = "center"
  el2.style.height = "32px"
  el2.style.padding = "0.05em"
  el2.style.background = "#28e0e0"
  el2.style.borderRadius = "44px"
  const el4 = document.createElement('div')
  el4.style.color = "#fff"
  el4.style.fontSize = "12px"
  el4.innerText = title
  el2.appendChild(el4)
  el1.appendChild(el2)
  const el3 = document.createElement('div')
  el3.style.display = "flex"
  el3.style.justifyContent = "center"
  const el5 = document.createElement('img')
  el5.style.width = "20px"
  el5.style.height = "30px"
  el5.alt = "marker"
  el5.src = MarkerPinImg.blue
  el3.appendChild(el5)
  el1.appendChild(el3)
  return el1
}

async function createtimeData(startTime, endTime) {
  let cityshangrao = await $.getJSON('static/json/rain/上饶市.json')
  let cityjiujiang = await $.getJSON('static/json/rain/九江市.json')
  let citynanchang = await $.getJSON('static/json/rain/南昌市.json')
  let cityjian = await $.getJSON('static/json/rain/吉安市.json')
  let cityyichun = await $.getJSON('static/json/rain/宜春市.json')
  let cityfuzhou = await $.getJSON('static/json/rain/抚州市.json')
  let cityxinyu = await $.getJSON('static/json/rain/新余市.json')
  let cityjingdezhen = await $.getJSON('static/json/rain/景德镇市.json')
  let citypingxiang = await $.getJSON('static/json/rain/萍乡市.json')
  let cityganzhou = await $.getJSON('static/json/rain/赣州市.json')
  let cityyingtan = await $.getJSON('static/json/rain/鹰潭市.json')
  let filldata = await $.getJSON('static/json/city.json')
  // console.log(cityyichun)
  for (let i in filldata) {
    filldata[i].pop = 0
  }
  // const start = new Date(startTime.replace(/-/, "/"));
  // const end = new Date(endTime.replace(/-/,'/'))
  filldata[0].pop = calulate(startTime, endTime, citynanchang)
  filldata[1].pop = calulate(startTime, endTime, cityjingdezhen)
  filldata[2].pop = calulate(startTime, endTime, cityyingtan)
  filldata[3].pop = calulate(startTime, endTime, cityxinyu)
  filldata[4].pop = calulate(startTime, endTime, cityganzhou)
  filldata[5].pop = calulate(startTime, endTime, cityjiujiang)
  filldata[6].pop = calulate(startTime, endTime, cityfuzhou)
  filldata[7].pop = calulate(startTime, endTime, cityshangrao)
  filldata[8].pop = calulate(startTime, endTime, citypingxiang)
  filldata[9].pop = calulate(startTime, endTime, cityjian)
  filldata[10].pop = calulate(startTime, endTime, cityyichun)
  // console.log(filldata)
  return filldata
}

function calulate(startTime, endTime, data) {
  let res = 0

  const star = new Date(startTime);
  const end = new Date(endTime)
  // console.log(star)
  for (let i in data) {
    // console.log(i)
    // if ()
    let now = new Date(data[i].date)
    if (star <= now && now <= end) {
      // console.log(cityyichun[i].date,cityyichun[i].Rain)
      res = accAdd(data[i].Rain, res)
    }
  }
  // console.log(res)
  return res
}

function accAdd(arg1, arg2) {
  let r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

function stringToDate(dateStr, separator = '-') {
  const dateArr = dateStr.split(separator);
  const year = parseInt(dateArr[0]);
  let month;
  if (dateArr[1].indexOf("0") === 0) {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  var day = parseInt(dateArr[2]);
  var date = new Date(year, month - 1, day);
  return date;
}
