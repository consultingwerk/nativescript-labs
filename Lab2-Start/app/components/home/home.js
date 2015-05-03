var templates = require("../../shared/templates/templates");
var imageModule = require("ui/image");
var gesturesModule = require("ui/gestures");
var _page;

exports.load = function(args) {
    _page = args.object;
};

exports.navigatedTo = function(args) {
	clearOldMemes ( _page.getViewById("templateContainer"));
    
    populateTemplates ();
   	populateMyMemes();
};

function populateTemplates() {
    var container = _page.getViewById("templateContainer");

    templates.getTemplates(function(imageSource){
        var image = new imageModule.Image();
        image.imageSource = imageSource;

        image.observe(gesturesModule.GestureTypes.Tap, function () { 
            templateSelected(imageSource); 
        });        
        
        container.addChild(image);
    });
}

function populateMyMemes() {
	var container = _page.getViewById("myMemeContainer");
	clearOldMemes(container);

	templates.getMyMemes(function(imageSource, fileName){
		var image = new imageModule.Image();
		image.imageSource = imageSource;

		image.observe(gesturesModule.GestureTypes.Tap, function () {
			myMemesActionSheet(imageSource, fileName);
		});

		container.addChild(image);
	});
}

function clearOldMemes(container) {

    for (var i = container.getChildrenCount() - 1; i >= 0; i-- ) {
        var childItem = container.getChildAt(i);
        container.removeChild(childItem);

        // Prevent possible memory leaks
        childItem.imageSource.setNativeSource(null);
        childItem.imageSource = null;
        childItem = null;
    }
    utils.GC();
}

function templateSelected(selectedImageSource) {    
    frameModule.topmost().navigate({
        moduleName: "./components/create-meme/create-meme",
        context: selectedImageSource,
        animated: true
    });
}
