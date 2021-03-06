var appbaseCon = new Appbase({
	url: 'https://scalr.api.appbase.io',
	appname: 'heatmap',
	username: 'weh522Thm',
	password: '2965f1bd-bc14-4e5b-a3c9-714351f9c1f1'
});


function writeData(max, heatData, num){
	var jsonObject = {
		"clicks"		: max,
		"data"		: heatData
	};

	appbaseCon.index({
		type: 'coordinate',
		id: ip + '-' + num,
		body: jsonObject
	}).on('data', function(response) {
		console.log('"writeData" - no errors');
	}).on('error', function(error) {
		console.log(error);
	});
}

getRecord = (num) =>
{
	appbaseCon.get({
		type: 'coordinate',
		id : ip + '-' + num
	}).on('data', function(res) {
		if (res.found) {
			var resData = JSON.stringify(res._source.data);
			localStorage['coordinateBySession ' + num] = resData;
			var clicks = JSON.stringify(res._source.clicks);
			$.cookie('clicksFromDB', clicks, { expires: 7, path: '' });
		}else{
			console.log('Error');
		};
	}).on('error', function(err) {
		console.log("search error: ", err);
	})
}


