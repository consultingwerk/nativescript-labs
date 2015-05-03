// load the frame module
var frameModule = require("ui/frame");

// expose our load function to the page’s loaded event
exports.load = function(args) {
    // Fake some work
    setTimeout(function () {
        // Call the frameModule and navigate away
        frameModule.topmost().navigate({
            moduleName: "./components/home/home",
            animated: true
        });
    }, 100);
};