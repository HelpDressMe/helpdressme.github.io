var appid = "oM6g5QU41NKGl2PGlqxhQxV51WEYqPkj2EkuDXdJ";
var apikey = "ma2Lgv3C4DjDUgNOv12ghmd82Ou60ZQpGsr3ubPx";
var javakey = "CLw7NNxumkyJBvOJ2h2LJFJyq4nZZb8FnV8RFAIt";



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}




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



$("#cycle-2").cycle();
var body = getParameterByName('body')|| 0;
$("#cycle-2").cycle('goto', body);

$("#cycle-3").cycle();

var legs = getParameterByName('legs')|| 0;
$("#cycle-3").cycle('goto', legs);


$("#cycle-4").cycle();

var feet = getParameterByName('feet')|| 0;
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
