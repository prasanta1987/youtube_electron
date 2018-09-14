var request = require("request")

const channel_id = ['UCJrOtniJ0-NWz37R30urifQ'];
const api_key = 'AIzaSyDvUmqC8paukoeuOQiO-OfmTOfcr_xTEDc'  //API Key Any Time Can be Deleted, Use your own API key
const address = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=';
//Get DOm Element
let drawTable = document.querySelector('#drawtable')
let getChName = document.getElementById('getchname');


getChName.addEventListener('click', () => {
    let chName = document.getElementById('chname').value;
    const chkurl = `${address}${chName}&key=${api_key}`;
    request({ url: chkurl, json: true }, function (error, response, body) {
        if (body.pageInfo.totalResults > 0) {
            channel_id.push(chName)
            dataRefresh();
        } else {
            window.alert("Please Give Us A Valid Channel ID");
        }
    });

});

function dataRefresh() {
    if(channel_id.length != 0){
        for (var i = 0; i < channel_id.length; i++) {
            const url = `${address}${channel_id[i]}&key=${api_key}`;
            makeRequest(url);
        }
    }
}


function makeRequest(uri) {

    request({ url: uri, json: true }, function (error, response, body) {

        if (body.pageInfo.totalResults > 0) {

            appendDomData(body);
        } else {
            return false;
        }

    });
}

dataRefresh();
setInterval(dataRefresh, 5000);

function appendDomData(body) {

    yt_l = body.items[0].snippet.thumbnails.medium.url;
    yt_t = body.items[0].snippet.title;
    yt_s = body.items[0].statistics.subscriberCount;
    yt_v = body.items[0].statistics.viewCount;

    let tr_body = document.createElement('tr');
    let td_logo = document.createElement('td');
    let td_title = document.createElement('td');
    let td_subs = document.createElement('td');

    if (!document.getElementById(yt_t)) {
        tr_body.id = yt_t;
        td_subs.id = yt_t + yt_t;
        td_logo.innerHTML = `<img class="img-fluid" style="width:50px;height:50px" src="${yt_l}" />`;
        td_title.innerHTML = yt_t;
        td_subs.innerHTML += yt_s;

        tr_body.appendChild(td_logo);
        tr_body.appendChild(td_title);
        tr_body.appendChild(td_subs);

        drawTable.appendChild(tr_body);

    } else {
        change_data = document.getElementById(yt_t + yt_t);
        change_data.innerHTML = yt_s;
    }
}