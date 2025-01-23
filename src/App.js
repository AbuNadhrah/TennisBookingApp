// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports["default"] = void 0;
// var _react = _interopRequireDefault(require("react"));
// var _UserForm = _interopRequireDefault(require("./src/components/UserForm"));
// function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// var App = function App() {
//   return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Tennis Booking App"), /*#__PURE__*/_react["default"].createElement(_UserForm["default"], null));
// };
// var _default = exports["default"] = App;

import React from 'react';
import UserForm from './components/UserForm.js';

const App = () => {
    return (
        <div>
            <h1>Tennis Booking App</h1>
            <UserForm />
        </div>
    );
};

export default App;
