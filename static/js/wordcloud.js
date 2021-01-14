import Js2WordCloud from 'js2wordcloud'
import axios from "axios";
import {consoleLog} from "echarts/lib/util/log";

export default class wordcloud {
  constructor() {
    this.wc = new Js2WordCloud(document.getElementById('worldCloud'));
    this.option = {
      imageShape: 'static/img.png',
      // fontSizeFactor: 30,
      tooltip: {
        show: true,
        formatter: function (item) {
          return item[0]
        }
      },
      gridSize: 1,
      maxFontSize: 30,
      minFontSize: 1,
      color: 'random-light',
      backgroundColor: 'rgba(0,0,0,.0)',
      list: [],
      // max:1,
    };
    return this;
  }

  async initcloud() {
    this.option.list = await createData('江西')
    this.wc.setOption(this.option)
    return this.wc
  }

  async updateclouds(base) {
    // if (typeof (nullData()) === typeof (createData(base)))
    // console.log(await createData(base))
    this.option.list = await createData(base)
    this.wc.setOption(this.option)
  }
}

async function createData(base) {
  let objToList = (obj, code = 'code', value = 'value') => {
    const keys = Object.keys(obj)
    return keys.map(it => {
      // console.log(it)
      return [obj[it].name, obj[it].rank]
      // return { [code]: it, [value]: obj[it] }
    })
  }
  let data = await $.getJSON('static/json/wordcloud/' + base + '.json')
  return objToList(data, 'name', 'rank')
}
