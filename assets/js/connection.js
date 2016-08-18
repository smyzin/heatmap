var appbaseCon = new Appbase({
	url: 'https://scalr.api.appbase.io',
	appname: 'heatmap',
	username: 'weh522Thm',
	password: '2965f1bd-bc14-4e5b-a3c9-714351f9c1f1'
});

function getData(num) {
	var id = ip + '-' + num;

	appbaseCon.search({
		type: "coordinate",
		body: {
			query: {
				match_all: {}
			}
		}
	}).on('data', function(res) {
		console.log(res);
		for(var i = 0; i < res.hits.hits.length; i++){
			console.log('I - ' +res.hits.hits[i], 'id - ' + id);
			if(res.hits.hits[i]['_id'] == id){
				var resData = JSON.stringify(res.hits.hits[i]._source.data);
				localStorage['coordinateBySession ' + num] = resData;
				var clicks = JSON.stringify(res.hits.hits[i]._source.clicks);
			}
		}
		console.log('Result - ' + resData);
	}).on('error', function(err) {
		console.log("get() method failed with: ", err);
	});
}

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
  appbaseCon.search({
    type: 'contact',
    body: {
      query: {
        "match" :
          {
            id : num
          }
      }
    }
  }).on('data', function(res) {
  	var resData = JSON.stringify(res.hits.hits[0]._source.data);
	localStorage['coordinateBySession ' + num] = resData;
	var clicks = JSON.stringify(res.hits.hits[0]._source.clicks);
  }).on('error', function(err) {
    console.log("search error: ", err);
  })
}


