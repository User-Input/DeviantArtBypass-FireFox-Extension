//window.addEventListener


console.log("Starting...");
console.log("Setting Element Variables");
const ImageLinkElement = document.getElementsByClassName("_1MpaL");
console.log("ImageLinkElement is: ");
console.log(ImageLinkElement);
console.log("ImageLinkElement Length: " + ImageLinkElement.length);
const MatureContentWarning = document.getElementsByClassName("_3Si_X");
console.log("MatureContentWarning is: ");
console.log(MatureContentWarning);
console.log("MatureContentWarning Length: " + MatureContentWarning.length);
console.log("Done!");

console.log(document.childNodes)

if (MatureContentWarning.length == 0) {
	throw "Couldn't find Mature Content element. Has it already been removed?"
}

console.log("Removing Content Warning...");
MatureContentWarning[0].parentNode.removeChild(MatureContentWarning[0]);
console.log("Removed Warning.");

console.log("Getting more Variables.");
NodeName = ImageLinkElement[0].parentNode;
console.log("NodeName is: ");
console.log(NodeName);
console.log("NodeName Length: " + NodeName.length);
GetLink = ImageLinkElement[0].getAttribute("style");
console.log("GetLink is: ");
console.log(GetLink);
console.log("GetLink Length: " + GetLink.length);
RealURL = String(GetLink.match("https.*\\w"));
console.log("RealURL is: ");
console.log(RealURL);
console.log("RealURL Length: " + RealURL.length);
console.log("Done!");

console.log("Grabbing Token...");
Token = RealURL.match("(?<==)[^&]*");
console.log(Token);
console.log("Token: " + Token)
Token = String(Token);
console.log(Token.length);
console.log("Finished Grabbing Token.");

function parseJwt (token) {
	console.log("Starting Decode Function...")
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
	console.log("Finished Decode Function.");
    return JSON.parse(jsonPayload);
};

console.log("Decoding JWT...");
if (Token !== 'null') {
	OBJ = parseJwt(Token);
	console.log("OBJ is: ");
	console.log(OBJ);
	console.log("OBJ Length: " + OBJ.length);
	console.log("Decoded Token.");

	console.log("Grabbing Resolution...")
	width = String(OBJ.obj[0][0].width).replace(/\W*/, "");
	height = String(OBJ.obj[0][0].height).replace(/\W*/, "");
	console.log("Width: " + width + " Height: " + height);
	
} else {
	console.log("Did not find token, using resolution from description...");
	ImageDetails = document.getElementsByClassName("_3rhGt");
	const str = String(ImageDetails[0].innerHTML);
	const regex = /\d+x\d+/g;
	console.log(str);
	const Found = String(str.match(regex));
	console.log("Found: " + Found);
	const Resolution = Found.split("x");
	console.log("Whole: " + Resolution + "	X: " + Resolution[0] + "	Y: " + Resolution[1]);
	width = String(Resolution[0])
	height = String(Resolution[1])
}

console.log("Fixing URL...");
FixedURL = RealURL.replace(/w_\d+,h_\d+/, "w_" + width + ",h_" + height);
console.log(FixedURL)
FixedURL = FixedURL.replace(/q_\d+/, "q_100");

console.log("Creating image Variable");
frame = document.createElement("img");
console.log("Done!");
console.log("Setting image src");
frame.src = FixedURL;
console.log("Done!");
console.log("Getting style");
Style = ImageLinkElement[0].parentNode.parentNode.getAttribute("style");
console.log("Done!");
console.log("Setting image attributes");
frame.setAttribute("style", "width:100%;height:100%");
console.log("Done!");
//Append to another element:
console.log("Appending image to image window");
NodeName.parentNode.appendChild(frame);
console.log("Done!");
console.log("Removing old censored image");
ImageLinkElement[0].parentNode.removeChild(ImageLinkElement[0]);
console.log("Done!");

console.log("Script Done!");