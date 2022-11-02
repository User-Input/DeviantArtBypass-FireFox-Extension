// console.log("Starting...");
var First_Run = false;

function SetContentWarning(){
	try{
		var ContentWarning = $( "div:contains('This content is intended for mature audiences')" ).eq(-2);
		if (ContentWarning.length){
			// console.log(ContentWarning);
			// console.log(ContentWarning.attr('class'));
		}else{
			// console.log('Did not find Content Warning. Trying another method')
			throw 'Did not find Content Warning. Trying another method'
		}
	}catch(e){
		try{
			var ContentWarning = document.body.querySelector("._3Si_X");
			if (ContentWarning != null){
				// console.log("Setting Element Variables");
				// console.log("MatureContentWarning is: ");
				// console.log(ContentWarning);
			}else{
				// console.log('Did not find Content Warning after second try!')
				throw ('Did not find Content Warning after second try!')
			}
		}catch{
			// console.log('COMPLETELY failed to FIND Content Warning!')
		}
		}
	return ContentWarning;
}

function SetImageLink(){
	try{
		var ImageLinkElement = $( "div[style^='background-image']" ).eq(0);
		if ((ImageLinkElement.parent().attr('id') != 'root')){
			
			// console.log("ImageLinkElement is: ");
			// console.log(ImageLinkElement.parent().attr('id'));
			console.log(ImageLinkElement.attr('class'));
		}else{
			console.log('Could not find Image Link...Trying another method');
			throw ('Could not find Image Link...Trying another method');
		}
	}catch(e){
		// console.log("There is error which shows "+e.message); //Handling error
		try{
			var ImageLinkElement = document.body.querySelector("._1MpaL");
			if (ImageLinkElement != null){
				// console.log("ImageLinkElement is: ");
				// console.log(ImageLinkElement);
			}else{
				// console.log('Could not find Image Link second try!');
				throw ('Could not find Image Link second try!');
			}
		}catch{
			// console.log('COMPLETELY failed to find Image Link');
		}
	}
	return ImageLinkElement;
}

function Remove_ContentWarning(Warning) {
	try{
		// console.log("Removing Content Warning...");
		Warning.remove();
		// console.log("Removed Warning.");
  	}catch{
		// console.log('Unable to remove Content Warning...Trying another method');
		try{
			var Warning_Retry_Original = document.body.querySelector("._3Si_X");
			if (Warning_Retry_Original != null){
				Warning_Retry_Original.parentNode.removeChild(Warning_Retry_Original);
				// console.log("Removed Warning.");
			}

		}catch{
			try{
				var Warning_Retry_New = document.body.querySelector(".cZe5b");
				Warning_Retry_New.parentNode.removeChild(Warning_Retry_New);
				// console.log("Removed Warning.");
			}catch{
				// console.log('COMPLETELY failed to remove Content Warning!!!');
				return
			}
		}
	}
	
}

function get_RealUrl(Link){
	// console.log("Getting more Variables.");
	try{
		var GetLink = Link.attr("style");
		var RealURL = String(GetLink.match("https.*\\w"));
		// console.log("RealURL is: ");
		// console.log(RealURL);
		// console.log("Done!");
	}catch{
		// console.log('Get URL Failed!')
	}
	return RealURL;
}

function get_token(url){
	// console.log('Getting Token...');
	try{
		var token = url.match("(?<==)[^&]*");
		var Token = String(token);
		// console.log('Token: ' + Token);
		// console.log("Finished Grabbing Token.");
	}catch{
		// console.log('Get Token Failed!')
	}
	return Token;
}

function parseJwt (token) {
	// console.log("Starting Decode Function...");
	try{
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
		try{
			var better = JSON.parse(jsonPayload);
		}catch{
			// console.log('Var failed...')
		}
		// console.log("Finished Decode Function.");
	}catch{
		// console.log('Decode Failed!')
	}
    return better;
};

function get_width(Obj){
	// console.log('Getting Width');
	try{
		var width = String(Obj.obj[0][0].width).replace(/\W*/, "");
		// console.log(width);
	}catch{
		// console.log("Failed to get width from JWT, using resolution from description...");
		try{
			var ImageDetails = document.body.querySelector("._3rhGt");
			var string = String(ImageDetails[0].innerHTML);
			var regex = /\d+x\d+/g;
			var Found = String(string.match(regex));
			var Resolution = Found.split("x");
			var width = String(Resolution[0]);
			// console.log(width);
		}catch{
			// console.log('Failed getting width from description!');
		}
	}
	return width;
}

function get_height(Obj){
	// console.log('Getting Height');
	try{
		var height = String(Obj.obj[0][0].height).replace(/\W*/, "");
		// console.log(height);
	}catch{
		// console.log("Failed to get height from JWT, using resolution from description...");
		try{
			var ImageDetails = document.body.querySelector("._3rhGt");
			var string = String(ImageDetails[0].innerHTML);
			var regex = /\d+x\d+/g;
			var Found = String(string.match(regex));
			var Resolution = Found.split("x");
			var height = String(Resolution[1]);
			// console.log(height);
		}catch{
			// console.log('Failed to get height from description!')
		}
	}
	return height;
}

function fix_url(url, width, height){
	// console.log("Width: " + width + " Height: " + height);
	// console.log('Fixing URL..');
	try{
		var Fixing = url.replace(/w_\d+,h_\d+/, "w_" + width + ",h_" + height);
		// console.log(Fixing);
		var FixedURL = Fixing.replace(/q_\d+/, "q_100");
		// console.log('Fixed URL: ' + FixedURL);
	}catch{
		// console.log('Fixing URL Failed!')
	}
	return FixedURL;
}

function create_img(url, link){
	// console.log("Creating Image...");
	try{
		var frame = document.createElement("img");
		// console.log("Done!");
		// console.log("Setting image src");
		frame.src = url;
		// console.log("Setting image attributes");
		frame.setAttribute("style", "width:100%;height:100%");
		// console.log("Done!");
		// console.log("Appending image to image window");
		link.parent().append(frame);
		// console.log("Done!");
		// console.log("Removing old censored image");
		link.remove();
		// console.log("Done!");
		// console.log("Script Done!");
	}catch{
		// console.log('Create Image Failed!')
	}
}



try{
	const MatureContentWarning = SetContentWarning();
	const ImageLinkElement = SetImageLink();
	Remove_ContentWarning(MatureContentWarning);
	const RealURL = get_RealUrl(ImageLinkElement);
	const Token = get_token(RealURL);
	const OBJ = parseJwt(Token);
	const width = get_width(OBJ);
	const height = get_height(OBJ);
	const FixedURL = fix_url(RealURL, width, height);
	create_img(FixedURL, ImageLinkElement);
}catch{
	// console.log('First(?) Run Failed!')
}finally{
	First_Run = true
}


// console.log('First Run: ' + First_Run)
const config = { attributes: false, childList: true, subtree: true };
const callback = (mutationList, observer) => {
	for (const mutation of mutationList) {
		if (mutation.type === 'childList') {
			// console.log('A child node has been added or removed.');
		}else if (mutation.type === 'attributes') {
			// console.log(`The ${mutation.attributeName} attribute was modified.`);
		}
		if (First_Run == false){
			// console.log('First run has not completed yet!')
			break
		}
		$( document ).ready(function() {
			// console.log( "ready!" );
			try{
				var Warn = SetContentWarning();
				try{
					Remove_ContentWarning(Warn);
				}catch{
					// console.log('DOM CHANGE: Failed to remove Content Warning!!!');
				}
			}catch{
				throw ('DOM CHANGE: Failed to set Content Warning Variable...I hope...');
				// console.log('DOM CHANGE: ' + Warn);
			}
			try{
				var Link = SetImageLink();
				try{
					var URL = get_RealUrl(Link);
					var Token = get_token(URL);
					var OBJ = parseJwt(Token);
					var width = get_width(OBJ);
					var height = get_height(OBJ);
					var FixedURL = fix_url(URL, width, height);
					create_img(FixedURL, Link);
				}catch(err){
					// console.log('Something failed during chaining.')
					// console.log("There is error which shows "+err.message); //Handling error
				}
			}catch{
				// console.log('DOM CHANGE: Failed to set Image Link Variable!');
			}
		});
	}
};



const observer = new MutationObserver(callback);
observer.observe(document, config);
