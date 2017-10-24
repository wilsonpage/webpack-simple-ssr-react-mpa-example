webpackJsonp([2],{

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__(0);

var _app = __webpack_require__(8);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.getElementById('main');
var props = window.__props;

(0, _preact.render)((0, _preact.h)(_app2.default, props), container, container.lastElementChild);

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _styles = __webpack_require__(9);

var _styles2 = _interopRequireDefault(_styles);

var _preact = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppContact = function (_Component) {
  _inherits(AppContact, _Component);

  function AppContact() {
    _classCallCheck(this, AppContact);

    return _possibleConstructorReturn(this, (AppContact.__proto__ || Object.getPrototypeOf(AppContact)).apply(this, arguments));
  }

  _createClass(AppContact, [{
    key: 'render',
    value: function render() {
      return (0, _preact.h)(
        'h1',
        null,
        'Contact'
      );
    }
  }]);

  return AppContact;
}(_preact.Component);

exports.default = AppContact;

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"contact":"contactd06452e6"};

/***/ })

},[7]);