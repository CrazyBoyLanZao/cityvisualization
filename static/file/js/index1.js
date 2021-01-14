let i = 0;
let scene = new L7.Scene({
    id: 'map',
    mapStyle: 'light', // 样式URL
    center: [115.94422, 28.54538],
    pitch: 0,
    zoom: 7.5
});

scene.on('loaded', setInterval(function () {
    $.get('./data/data.json', function (data) {
        if (i <72) {
            let layer = scene.PointLayer({
                    zIndex: 2
                }
            ).source(data[i], {
                parser: {
                    type: 'json',
                    x: 'x',
                    y: 'y'
                }
            }).shape('circle').size('v', 5).active(true).filter('g', function (g) {
                return g === "2";
            })
                .color('c', function (c) {
                    if (c >= 0 && c <= 50)
                        return 'rgb(95,220,62)'
                    else if (c > 50 && c <= 100)
                        return "rgb(243,225,134)"
                    else if (c > 100 && c <= 150)
                        return "rgb(241,117,7)"
                    else if (c > 150 && c <= 200)
                        return "rgb(184,6,6)"
                    else if (c > 200 && c <= 300)
                        return "rgb(101,28,186)"
                    else
                        return "rgb(90,12,5)"
                }) // 线性映射
                .style({
                    stroke: 'rgb(255,255,255)',
                    strokeWidth: 1,
                    opacity: 1.
                }).render();
            layer.on('click', function(data1) {
                console.log(data1)
                let lnglat = data1.lnglat,
                    feature = data1.feature;
                let html = '<p>检测站点：' + feature.d + '</p>\n        <p>时间：' + feature.t + '</p>\n        <p>AQI：' + feature.c + '</p>\n        ';

                new L7.Popup().setLnglat([lnglat.lng, lnglat.lat]).setHTML(html).addTo(scene);
            });
            i++;
        }
        else {
            let layer = scene.PointLayer({
                    zIndex: 2
                }
            ).source(data[i], {
                parser: {
                    type: 'json',
                    x: 'x',
                    y: 'y'
                }
            }).shape('circle').size('v', 5).active(true).filter('g', function (g) {
                return g === "2";
            })
                .color('c', function (c) {
                    if (c >= 0 && c <= 50)
                        return 'rgb(95,220,62)'
                    else if (c > 50 && c <= 100)
                        return "rgb(243,225,134)"
                    else if (c > 100 && c <= 150)
                        return "rgb(241,117,7)"
                    else if (c > 150 && c <= 200)
                        return "rgb(184,6,6)"
                    else if (c > 200 && c <= 300)
                        return "rgb(101,28,186)"
                    else
                        return "rgb(90,12,5)"
                }) // 线性映射
                .style({
                    stroke: 'rgb(255,255,255)',
                    strokeWidth: 1,
                    opacity: 1.
                }).render();
            layer.on('click', function(data1) {
                console.log(data1)
                let lnglat = data1.lnglat,
                    feature = data1.feature;
                let html = '<p>检测站点：' + feature.d + '</p>\n        <p>时间：' + feature.t + '</p>\n        <p>AQI：' + feature.c + '</p>\n        ';

                new L7.Popup().setLnglat([lnglat.lng, lnglat.lat]).setHTML(html).addTo(scene);
            });
            i = 0;
        }
    })

}, 1000))
