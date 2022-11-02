console.log("Starting...");
console.log("Setting Element Variables");
const config = { attributes: true, childList: true, subtree: true };

function SetContentWarning(){
	try{
		var ContentWarning = document.body.querySelector("._3Si_X");
		console.log("MatureContentWarning is: ");
		console.log(ContentWarning);
	}catch(e){
		console.log("There is error which shows "+e.message); //Handling error
		var ContentWarning = document.body.querySelector(".cZe5b");
		}
	return ContentWarning;
}
const MatureContentWarning = SetContentWarning();

function SetImageLink(){
	try{
		var ImageLinkElement = document.body.querySelector("._1MpaL");
		console.log("ImageLinkElement is: ");
		console.log(ImageLinkElement);
	}catch(e){
		console.log("There is error which shows "+e.message); //Handling error
		var ImageLinkElement = document.body.querySelector("._3fEJw");
		}
	return ImageLinkElement;
}
const ImageLinkElement = SetImageLink();
console.log("Done!");

function Remove_ContentWarning(Warning) {
	try{
		Warning.parentNode.removeChild(Warning);
  	}catch{
		console.log('Unable to remove Content Warning...Trying another method');
		try{
		var Warning_Retry_Original = document.body.querySelector("._3Si_X");
		Warning_Retry_Original.parentNode.removeChild(Warning_Retry_Original);
		}catch{
			try{
				var Warning_Retry_New = document.body.querySelector(".cZe5b");
				Warning_Retry_New.parentNode.removeChild(Warning_Retry_New);
			}catch{
				console.log('COMPLETELY failed to remove Content Warning!!!');
			}
		}
	}
}

const callback = (mutationList, observer) => {
	for (const mutation of mutationList) {
		if (mutation.type === 'childList') {
			console.log('A child node has been added or removed.');
		}else if (mutation.type === 'attributes') {
			console.log(`The ${mutation.attributeName} attribute was modified.`);
		}
		
		//Make big try statement?
		try{
			var Warn = SetContentWarning();
			try{
				Remove_ContentWarning(Warn);
			}catch{
				console.log('DOM CHANGE: Failed to remove Content Warning!!!');
			}
		}catch{
			console.log('DOM CHANGE: Failed to set Content Warning Variable...I hope...');
			console.log('DOM CHANGE: ' + Warn);
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
				console.log('Something failed during chaining')
				throw ("There is error which shows "+err.message); //Handling error
			}
		}catch{
			console.log('DOM CHANGE: Failed to set Image Link Variable');
		}
		// console.log($( "input[name='first_name']" ));
	}
};

console.log("Removing Content Warning...");
Remove_ContentWarning(MatureContentWarning);
console.log("Removed Warning.");

function get_RealUrl(Link){
	var GetLink = Link.getAttribute("style");
	var RealURL = String(GetLink.match("https.*\\w"));
	console.log("RealURL is: ");
	console.log(RealURL);
	return RealURL;
}
console.log("Getting more Variables.");
const RealURL = get_RealUrl(ImageLinkElement);
console.log("Done!");

function get_token(url){
	var token = url.match("(?<==)[^&]*");
	var Token = String(token);
	console.log(Token);
	return Token;
}
console.log("Grabbing Token...");
const Token = get_token(RealURL);
console.log("Finished Grabbing Token.");


function parseJwt (token) {
	console.log("Starting Decode Function...");
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
	console.log("Finished Decode Function.");
    return JSON.parse(jsonPayload);
};
console.log('Parsing Token...');
const OBJ = parseJwt(Token);
console.log('Finished Parsing Token');

function get_width(Obj){
	try{
		var width = String(Obj.obj[0][0].width).replace(/\W*/, "");
	}catch{
		console.log("Failed to get width from JWT, using resolution from description...");
		var ImageDetails = document.body.querySelector("._3rhGt");
		var string = String(ImageDetails[0].innerHTML);
		var regex = /\d+x\d+/g;
		var Found = String(string.match(regex));
		var Resolution = Found.split("x");
		var width = String(Resolution[0]);
	}
	return width;
}
console.log('Getting Width');
const width = get_width(OBJ);
console.log(width);

function get_height(Obj){
	try{
		var height = String(Obj.obj[0][0].height).replace(/\W*/, "");
	}catch{
		console.log("Failed to get height from JWT, using resolution from description...");
		var ImageDetails = document.body.querySelector("._3rhGt");
		var string = String(ImageDetails[0].innerHTML);
		var regex = /\d+x\d+/g;
		var Found = String(string.match(regex));
		var Resolution = Found.split("x");
		var height = String(Resolution[1]);
	}
	return height;
}
console.log('Getting Height');
const height = get_height(OBJ);
console.log(height);

console.log("Width: " + width + " Height: " + height);

function fix_url(url, width, height){
	var Fixing = url.replace(/w_\d+,h_\d+/, "w_" + width + ",h_" + height);
	console.log(Fixing);
	var FixedURL = Fixing.replace(/q_\d+/, "q_100");
	return FixedURL;
}
console.log('Fixing URL..');
const FixedURL = fix_url(RealURL, width, height);
console.log(FixedURL);

function create_img(url, link){
	console.log("Creating Image...");
	var frame = document.createElement("img");
	console.log("Done!");
	console.log("Setting image src");
	frame.src = url;
	console.log("Setting image attributes");
	frame.setAttribute("style", "width:100%;height:100%");
	console.log("Done!");
	console.log("Appending image to image window");
	link.parentNode.appendChild(frame);
	console.log("Done!");
	console.log("Removing old censored image");
	link.parentNode.removeChild(link);
	console.log("Done!");
}
create_img(FixedURL, ImageLinkElement);

console.log("Script Done!");

const observer = new MutationObserver(callback);
observer.observe(document.body, config);
