var request = require("request")

const channel_id = ['UCJrOtniJ0-NWz37R30urifQ'];
const api_key = 'AIzaSyDvUmqC8paukoeuOQiO-OfmTOfcr_xTEDc'

function dataRefresh() {

    for (var i = 0; i < channel_id.length; i++) {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channel_id[i]}&key=${api_key}`;
        makeRequest(url);
    }
}

//Get DOm Element
let drawTable = document.querySelector('#drawtable')

function makeRequest(uri) {

    request({ url: uri, json: true }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            yt_logo = body.items[0].snippet.thumbnails.medium.url;
            yt_title = body.items[0].snippet.title;
            yt_subscriber = body.items[0].statistics.subscriberCount;
            yt_view = body.items[0].statistics.viewCount;
            appendDomData(yt_logo, yt_title, yt_subscriber,yt_view);
        }

    });
}

dataRefresh();
setInterval(dataRefresh, 5000);

function appendDomData(yt_l, yt_t, yt_s, yt_v) {
    let tr_body = document.createElement('tr');
    let td_logo = document.createElement('td');
    let td_title = document.createElement('td');
    let td_subs = document.createElement('td');

    if (!document.getElementById(yt_t)) {
        tr_body.id = yt_t;
        td_subs.id = yt_t+yt_t;
        td_logo.innerHTML = `<img class="img-fluid" style="width:50px;height:50px" src="${yt_l}" />`;
        td_title.innerHTML = yt_t;
        td_subs.innerHTML += yt_s;

        tr_body.appendChild(td_logo);
        tr_body.appendChild(td_title);
        tr_body.appendChild(td_subs);

        drawTable.appendChild(tr_body);

    } else {
        change_data = document.getElementById(yt_t+yt_t);
        change_data.innerHTML = yt_s;
    }
}