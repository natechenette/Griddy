'use strict';

var React = require('react');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".styles-module_root__Xsw1F {\n  background: gold;\n}\n";
var s = {"root":"styles-module_root__Xsw1F"};
styleInject(css_248z);

const DataGrid = ({ columns, rows }) => {
    return (React.createElement("div", { className: s.root },
        React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null, columns.map((column, index) => (React.createElement("th", { key: index }, column))))),
            React.createElement("tbody", null, rows.map((row, rowIndex) => (React.createElement("tr", { key: rowIndex }, row.map((cell, cellIndex) => (React.createElement("td", { key: cellIndex }, cell))))))))));
};

exports.DataGrid = DataGrid;
//# sourceMappingURL=index.js.map
