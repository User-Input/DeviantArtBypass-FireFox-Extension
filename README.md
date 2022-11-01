# DeviantArtBypass-FireFox-Extension
Bypass log in requirement to view mature content on DeviantArt

This does NOT bypass any paywalls, Watchers only, or any other walls. It also does not unblock the download button(Yet).

What this does it when it finds a mature content block it removes the mature content warning/block element and then replaces the blurred image with the image from their image host with the maximum resolution they have allowed via the limits within the JWT found in the blurred image url.

# Issues
I cannot get the original resolution because DeviantArt usually limits the width to 1280 and I cannot bypass this for now. The quality of the image is still very good and should be fine. Especially since it will be scaled to match the image viewer.

Currently the extension requires you to reload the window to bypass the content block of another image. This is because I don't know what I am doing. I assume DeviantArt dynamicly the DOM instead of loading a new page or something. 
Possible fix: Add DomMutation watcher?

Cannot download the original image. The download button links to a url that will redirect you to the original image on their image host with the JWT that gives authorization to download the original image. Issue is when you are not logged in, the download link will not redirect you and instead give a 404 error. So I cannot grab the correct JWT unless I can figure out how to make the redirect succeed while not logged in.

# Installation
1. On Firefox go to about:debugging
2. Click on "This Firefox"
3. Click load a temporary extension and load either DeviantArtBypass.js or the manifest.json file

The extension will be removed upon closing the browser, you can google how to make it permanent. AKA downloading the developer firefox browser
