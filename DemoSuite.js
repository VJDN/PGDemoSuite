
// main init func - set global JQM settings here
$(document).bind("mobileinit", function(){
	$.mobile.defaultPageTransition = 'slide';
	$.mobile.loader.prototype.options.text = "Loading . . .";
  	$.mobile.loader.prototype.options.textVisible = true;
  	$.mobile.loader.prototype.options.theme = "a";
  	$.mobile.loader.prototype.options.html = "";
});

// switch-page catch, for firing specific scripts
$(document).bind( "pagechange", function( e, data ) {
	
	// get page id
	if (typeof(data.toPage) == "object"){
		var page = data.toPage.context.URL.split("#")[1];
		
		// switch
		if (page != undefined) runPage(page);
	}
});

// vars
var xmlData;

// main nav switch function
function runPage(id) {
	switch(id) {
		
		case 'xml-page':
			xmlData == undefined ? fetchData() : displayXML();
		break;
		case 'maps-page':
			alert('google maps')
		break;
		case 'accel-page':
			alert('accelerometer')
		break;
		case 'fb-page':
			alert('facebook')
		break;
		case 'twit-page':
			alert('twitter')
		break;
		default:
			alert('Page Not Found');
	}
}


// --------------------------------------------------------------------
// XML APP
// --------------------------------------------------------------------
function fetchData () {
	
	// show loader
	// $.mobile.pageLoading();
	 
	// load XML
	$.ajax({
		type: 		"GET",
		url: 		"test.xml",
		dataType: 	"xml",
		async: 		true,
		success: 	dataLoadComplete,
		error:		dataLoadError });
};

function dataLoadComplete (data) {

	// hide loader
	// $.mobile.pageLoading(true);
	
	// save XML
	xmlData = data;
	
	// display it
	displayXML();
}

function dataLoadError (xhr, ajaxOptions, thrownError){
	alert('error: ' + thrownError);
	
	// hide loader
	// $.mobile.pageLoading(true);
}

function displayXML(){

	// get list
	var list = $( '#xml-page' ).find( '#xml-list' );
	
	// clear it
	list.empty();
	
	// loop through data
	$(xmlData).find('item').each(function() {
		var title = $(this).find('title').text();
		var content = $(this).find('content').text();
		list.append(listNodeAlert(title, content));
	});
	
	list.listview('refresh');
}

function listNodeAlert(title, content){
	return "<li><a onClick=\"alert('" + content + "')\"></p><strong>" + title + "</strong></p></a></li>";  
}