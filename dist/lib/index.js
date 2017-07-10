(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("typescript-starter-node", [], factory);
	else if(typeof exports === 'object')
		exports["typescript-starter-node"] = factory();
	else
		root["typescript-starter-node"] = factory();
})(this, function() {
return webpackJsonptypescript_starter_node([0],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(32);
const styles = __webpack_require__(33);
class Hello extends React.Component {
    render() {
        const show = this.props.show ? 'block' : 'none';
        return (React.createElement("div", null,
            React.createElement("p", { className: styles.title, style: { display: show } }, "Hello World"),
            React.createElement("button", { className: 'btn btn-default', onClick: this.props.toggle.bind(this) }, "Click Me!")));
    }
}
exports.default = Hello;


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(34)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Hello_1 = __webpack_require__(12);
exports.Hello = Hello_1.default;


/***/ })

},[36]);
});
//# sourceMappingURL=index.ts.map