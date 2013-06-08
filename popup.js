url = "http://www.iit.edu/csl/cs/programs/course_descriptions.shtml"

function Request(url, arg, callback) {
	var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send(null)

    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status == 200) {
            var response = null;
            try {
             response = JSON.parse(req.responseText);
            } catch (e) {
             response = req.responseText;
            }
            callback(arg, response);
		}
    }
}

function search() {
	var course_name = $('#search-course').val();
	if(course_name) {
		Request(url, course_name, extr);
	}
	
	return true;
}

function extr(course_name, response) {
	// find courses
	var str = "<a name=.*" + course_name + ".*>"
	var pattern = new RegExp(str, "i")
	var regions = response.match(pattern)
  var href = regions[0].match('pdf/.*')
  if(href) {
    var regions = regions[0].replace(href, "http://www.iit.edu/csl/cs/programs/"+ href)
  }
	$('#content').html(regions)
} 

window.onload = function() {
  	$('#search-course').focus()
  					   .keydown(function(event) {
  					   		if(event.which==13) {
  					   			search();
  					   		}
  					   });
  	$('#search-button').click(search);
}
