import {fetch} from 'wix-fetch';
let AFurl = 'https://io.adafruit.com/api/v2/shaik/feeds/camctl/data';

let hPos = 90;
let vPos = 90l

// For full API documentation, including code examples, visit http://wix.to/94BuAAs

$w.onReady(function () {
	//TODO: write your page related code here...

});

export function button1_click(event, $w) {
	updateAdafruitDb();
}

export function updateAdafruitDb() {
	let data = {
		"value": "55d66"
	};
	
	let req = {
		method: "post",
		headers: {
			"Host": "io.adafruit.com",
			"Connection": "keep-alive",
			"Content-Length": "20",
			"Accept": "application/json",
			"X-AIO-Key": "28f38dfcd5b3421594bf28b188f09afa",
			"Content-Type": "application/json",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "en-US,en;q=0.9"
		},
		body: JSON.stringify(data)
	};
    //Add here the URL of the CRM API , the method type is "post"
    fetch(AFurl, req) 
        .then( (httpResponse) => { 
            if (httpResponse.ok) {     
                return httpResponse.json(); 
            } else { 
                return Promise.reject("Fetch did not succeed"); } 
            } ) 
       .catch(err => console.log(err));
}