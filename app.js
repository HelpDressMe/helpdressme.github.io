var appid = "oM6g5QU41NKGl2PGlqxhQxV51WEYqPkj2EkuDXdJ";
var apikey = "ma2Lgv3C4DjDUgNOv12ghmd82Ou60ZQpGsr3ubPx";
var javakey = "CLw7NNxumkyJBvOJ2h2LJFJyq4nZZb8FnV8RFAIt";



function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g,
		" "));
}



function newdata(){
var findVote = new Parse.Query(Vote);
var id = getParameterByName("id");
var friend =  getParameterByName("friend");
console.log(friend);




findVote.get(id, {
	success:function(data){
		console.log(data.get("clothes"));
		var clothes = data.get("clothes");
		var judge = data.get("friend")
		document.getElementById("head").src = (clothes.head);
		document.getElementById("body").src = (clothes.top);
		document.getElementById("legs").src = (clothes.legs);
		document.getElementById("feet").src = (clothes.feet);
		
		if (friend && friend.lengh>0){
	$("h3").text(friend + ", please rate my outfit!");
		}
		
		else{
			$("h3").text(judge.name + " has rated your outfit");
				var Score = judge.score;
			$("input[value='"+ Score"']")[0].click()
			}
		
		
		
		
	}
})
}







/*turtles*/

$(function() {
	var file;
	Parse.initialize(appid, javakey);
	var Clothing = Parse.Object.extend("Clothing");
	// Set an event listener on the Choose File field.
	$('#fileselect').bind("change", function(e) {
		var files = e.target.files || e.dataTransfer.files;
		// Our file var now holds the selected file
		file = files[0];
	});

	// We're gonna get the pictures from umm parse.

	var findclothes = new Parse.Query(Clothing);
	findclothes.find({
		success: function(results) {
			results.forEach(function(result) {
				if (result.attributes.type === 'Head') {
					$("#cycle-1").cycle('add', '<img src=' + result.attributes.picture +
						' width=100 height=200 />');
				}
				if (result.attributes.type === 'Torso') {
					$("#cycle-2").cycle('add', '<img src=' + result.attributes.picture +
						' width=500 height=200 />');
				}
				if (result.attributes.type === 'Legs') {
					$("#cycle-3").cycle('add', '<img src=' + result.attributes.picture +
						' />');
				}
				if (result.attributes.type === 'Feet') {
					$("#cycle-4").cycle('add', '<img src=' + result.attributes.picture +
						' width=500 height=150 />');
				}
			});
		}
	});



	var findclothes = new Parse.Query(Clothing);
	findclothes.find({
		success: function(results) {
			results.forEach(function(result) {
				if (result.attributes.type === 'Head') {
					$("#cycle-1").cycle('add', '<img src=' + result.attributes.picture +
						' width=100 height=200 />');
				}
				if (result.attributes.type === 'Torso') {
					$("#cycle-2").cycle('add', '<img src=' + result.attributes.picture +
						' width=500 height=200 />');
				}
				if (result.attributes.type === 'Legs') {
					$("#cycle-3").cycle('add', '<img src=' + result.attributes.picture +
						' />');
				}
				if (result.attributes.type === 'Feet') {
					$("#cycle-4").cycle('add', '<img src=' + result.attributes.picture +
						' width=500 height=150 />');
				}
			});
			$("#cycle-1").cycle();

			var head = getParameterByName('head') || 0;
			$("#cycle-1").cycle('goto', head);

			$("#cycle-1").on('cycle-after', function(event, opts, before, after) {
				//console.log(after)
				console.log(opts.nextSlide)
				$("#headid").html(opts.nextSlide)
			});

			$("#cycle-2").cycle();
			var body = getParameterByName('body') || 0;
			$("#cycle-2").cycle('goto', body);

			$("#cycle-2").on('cycle-after', function(event, opts, before, after) {
				//console.log(after)
				console.log(opts.nextSlide)
				$("#bodyid").html(opts.nextSlide)
			});



			var legs = getParameterByName('legs') //|| 0;
			$("#cycle-3").cycle('goto', legs);

			$("#cycle-3").cycle();

			$("#cycle-3").on('cycle-after', function(event, opts, before, after) {
				//console.log(after)
				console.log(opts.nextSlide)
				$("#legsid").html(opts.nextSlide)
			});

			$("#cycle-4").cycle();

			$("#cycle-4").on('cycle-after', function(event, opts, before, after) {
				//console.log(after)
				console.log(opts.nextSlide)
				$("#feetid").html(opts.nextSlide)
			});
			var feet = getParameterByName('feet') //|| 0;
			$("#cycle-4").cycle('goto', feet);

		}
	});



	// This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
	$('#uploadbutton').click(function() {
		var serverUrl = 'https://api.parse.com/1/files/' + file.name;
		var form = document.getElementById("Bodypart");
		var Itemcloth = (form.elements["Body part"].value);
		var typecloth = (form.elements["Clothingtype"].value);
		var weatherType = (form.elements["weatherType"].value);
		var eventClassification = (form.elements["eventClassification"].value);
		$.ajax({
			type: "POST",
			beforeSend: function(request) {
				request.setRequestHeader("X-Parse-Application-Id", appid);
				request.setRequestHeader("X-Parse-REST-API-Key", apikey);
				request.setRequestHeader("Content-Type", file.type);
			},
			url: serverUrl,
			data: file,
			processData: false,
			contentType: false,
			success: function(data) {


				var clothing = new Clothing();
				clothing.set("type", Itemcloth);
				clothing.set("picture", data.url);
				clothing.set("clothingtype", typecloth);
				clothing.set("weatherType", weatherType);
				clothing.set("eventClassification", eventClassification);
				//  console.log(clothing)
				clothing.save(null, {
					success: function(data) {
						console.log("This has been saved :) " + data);
					}
				});
				if (Itemcloth === 'Head') {
					$("#cycle-1").cycle('add', '<img src=' + data.url +
						' width=100 height=200 />');
				}
				if (Itemcloth === 'Torso') {
					$("#cycle-2").cycle('add', '<img src=' + data.url +
						' width=500 height=200 />');
				}
				if (Itemcloth === 'Legs') {
					$("#cycle-3").cycle('add', '<img src=' + data.url + ' />');
				}
				if (Itemcloth === 'Feet') {
					$("#cycle-4").cycle('add', '<img src=' + data.url +
						' width=500 height=150 />');
				}
				alert("Your file has been Successfully uploaded!");
				console.log("File available at: " + data.url);

			},
			error: function(data) {
				var obj = jQuery.parseJSON(data);
				alert(obj.error);
			}
		});
	});
});

var Vote = Parse.Object.extend("Vote");

function getHelp(event) {
	console.log("getHelpButtonPressed");
	var who = $("[name='who']")[0].value;
	var tel = $("[name='tel']")[0].value;
	var from = $("[name='from']")[0].value;
	var head = $("#cycle-1 img")[$("#cycle-1").data("cycle.opts").currSlide+1].src;
	var top = $("#cycle-2 img")[$("#cycle-2").data("cycle.opts").currSlide+1].src;
	var legs = $("#cycle-3 img")[$("#cycle-3").data("cycle.opts").currSlide+1].src;
	var feet = $("#cycle-4 img")[$("#cycle-4").data("cycle.opts").currSlide+1].src;
	var vote = new Vote();
	vote.set("owner", from);
	vote.set("friend", {
		name: who,
		tel: tel,
		score: 0
	});
	vote.set("clothes", {
		head: head,
		top: top,
		legs: legs,
		feet: feet
	});
	vote.save(null, {
		success: function(data) {
			console.log("success", data);
			$.ajax({
				url: "https://api.clockworksms.com/http/send.aspx",
				type: "GET",
				async: false,
				dataType: "text",
				data: {
					key: "779e4348222a783947efb91c9df7a1b2cc3a4d6d",
					to: tel,
					from: "HelpDressMe",
					content: "Hello " + who +
						", help "+from+" choose their outfit. Click here: http://helpdress.me/votes.html?id=" + data.id+"&friend="+who
				},
				success: function(result) {
					console.log("Response from Clockwork", result);
				}
			})
			window.location.assign(" http://helpdress.me/votes.html?id=" + data.id);
		}
	});
	console.log("About To Send a Text Message", who, tel, from, head, top, legs,
		feet);
}
