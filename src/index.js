var request = require("request")

const channel_id = ['UCJrOtniJ0-NWz37R30urifQ','UCqwUrj10mAEsqezcItqvwEw'];
const api_key = 'AIzaSyDvUmqC8paukoeuOQiO-OfmTOfcr_xTEDc'  //API Key Any Time Can be Deleted, Use your own API key
const address = 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=';
//Get DOm Element
let drawTable = document.querySelector('#drawtable')
let getChName = document.getElementById('getchname');
let cardContainer = document.getElementById('cardcontainer');


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
    if (channel_id.length != 0) {
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

const cardMain = document.getElementById('cardmain');

function appendDomData(body) {

    yt_l = body.items[0].snippet.thumbnails.medium.url;
    yt_t = body.items[0].snippet.title;
    yt_s = body.items[0].statistics.subscriberCount;
    yt_v = body.items[0].statistics.viewCount;


    if (!document.getElementById(yt_t)) {
        let mainCard = document.createElement('div');
        mainCard.className = "card bg-dark";
        // mainCard.className = "bg-dark"
        mainCard.id = yt_t;
        mainCard.style.width = '200px';
        mainCard.style.cssFloat = 'left'
        mainCard.style.margin = '10px'
        mainCard.innerHTML = `<img class="card-img-top" src="${yt_l}" alt="Card image" style="width:100%">`;
        mainCard.innerHTML += '<div class="card-body"></div>';
        mainCard.innerHTML += `<h4 class="card-title">${yt_t}</h4><hr>`;
        mainCard.innerHTML += `<p class="card-text" id="${yt_t+yt_t}">${yt_s}</p></div></div>`;
        cardContainer.appendChild(mainCard);        
    } else {
        change_data = document.getElementById(yt_t + yt_t);
        change_data.innerHTML = yt_s;
    }
}