$(document).ready(function() {

	var clickCount = 0;
	var maxCountElement = document.getElementById("maxcount");

	/*			---HEATMAPJS---			*/
	var heatmapInstance = h337.create({
		container: document.getElementById('heatmapContainer'),
		radius: 35,
		maxOpacity: .5,
		blur: .75
	});
	/*			---HEATMAPJS END---			*/

	var heatData = {
		max: 1,
		min: 0,
		data: []
	};
	var zerroData = {
		max: 1,
		min: 0,
		data: []
	};
	if (sessionStorage['visit'] === undefined) {
		sessionStorage['visit'] = 1;
		$('.show').hide();
	}else if(sessionStorage['visit'] >= 1){
		sessionStorage['visit']++;
		$('#session').text(sessionStorage['visit']);
		$('.show').show();
		for(var i = 0; i < sessionStorage['visit']; i++){
			var sn = i + 1;
			$('#choose-session').append('<option value = ' + sn + '>Session ' + sn +'</option>');
			$('#choose-session option').last().attr('selected', 'selected');
		};
	}

	$(function(){
		setInterval(function(){
			if(!$('body').hasClass('shown')){
				document.getElementById('mainContainer').onclick = function(ev){
					heatData.data.push({
						x: ev.clientX,
						y: ev.clientY,
						value: 1
					});
					clickCount++;
					maxCountElement.innerHTML = clickCount;
					var sessionVisit = sessionStorage['visit'];
					writeData(clickCount, heatData, sessionVisit);
				};
			}else{
				document.getElementById('mainContainer').onclick = function(ev){
					console.log("already showm");
				};
			}
		}, 1000);

	});

	$('.show').click(function(){
		if($('.show').hasClass('notclicked')){
			$('body').addClass('shown');
			$('.legent').toggle(400);

			heatmapInstance.setData(heatData);

			$('#heatmapContainerWrapper').css('z-index', '50');
			$('.show').removeClass('notclicked').addClass('clicked');
		}else if($('.show').hasClass('clicked')){
			$('body').removeClass('shown');
			$('.legent').toggle(400);

			heatmapInstance.setData(zerroData);

			$('#heatmapContainerWrapper').css('z-index', '1');
			$('#noData').hide();
			$('.show').removeClass('clicked').addClass('notclicked');
		}
	});
	$('#choose-session').click(function(){
		console.log('click');
		if('#choose-session  option:selected'){

			console.log('Selected');

			var sessionValue = $( "#choose-session" ).val();
			var newData = {};
			getRecord(sessionValue);

			setTimeout(function(){
				if(localStorage['coordinateBySession ' + sessionValue] === undefined){
					$('#noData').show();
					maxCountElement.innerHTML = 0;
					heatmapInstance.setData(zerroData);
				}else{
					var newData = JSON.parse(localStorage['coordinateBySession ' + sessionValue]);
					$('#noData').hide();

					var maximumClicks = $.cookie('clicksFromDB');
					maxCountElement.innerHTML = maximumClicks;
					heatmapInstance.setData(newData);
				}
			}, 300);

		}
	});

});
