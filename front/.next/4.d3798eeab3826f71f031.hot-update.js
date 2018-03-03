webpackHotUpdate(4,{

/***/ "./styles/style.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js?{\"modules\":false,\"minimize\":false,\"sourceMap\":true,\"importLoaders\":1}!./node_modules/sass-loader/lib/loader.js!./styles/style.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"sourceMap":true,"importLoaders":1,"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("./node_modules/css-loader/index.js?{\"modules\":false,\"minimize\":false,\"sourceMap\":true,\"importLoaders\":1}!./node_modules/sass-loader/lib/loader.js!./styles/style.scss", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js?{\"modules\":false,\"minimize\":false,\"sourceMap\":true,\"importLoaders\":1}!./node_modules/sass-loader/lib/loader.js!./styles/style.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

})
//# sourceMappingURL=4.d3798eeab3826f71f031.hot-update.js.map