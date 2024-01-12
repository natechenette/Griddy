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

const DataGrid = ({ columns, rows, selectable = false }) => {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectAllChecked, setSelectAllChecked] = React.useState(false);
    React.useEffect(() => {
        // Determine the state of the header checkbox based on selectedRows
        if (selectedRows.length === 0) {
            setSelectAllChecked(false);
        }
        else if (selectedRows.length === rows.length) {
            setSelectAllChecked(true);
        }
        else {
            setSelectAllChecked('indeterminate');
        }
    }, [selectedRows, rows]);
    const handleRowSelection = (rowIndex) => {
        if (selectable) {
            setSelectedRows((prevSelectedRows) => {
                const isSelected = prevSelectedRows.includes(rowIndex);
                if (isSelected) {
                    return prevSelectedRows.filter((selectedRow) => selectedRow !== rowIndex);
                }
                else {
                    return [...prevSelectedRows, rowIndex];
                }
            });
        }
    };
    const handleSelectAllRows = () => {
        if (selectable) {
            const allRowsSelected = selectedRows.length === rows.length;
            if (allRowsSelected) {
                setSelectedRows([]);
            }
            else {
                setSelectedRows([...Array(rows.length).keys()]);
            }
        }
    };
    return (React.createElement("div", { className: s.root },
        React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    selectable && (React.createElement("th", null,
                        React.createElement("input", { type: "checkbox", checked: selectAllChecked === true, onChange: handleSelectAllRows, ref: (input) => {
                                if (input) {
                                    input.indeterminate = selectAllChecked === 'indeterminate';
                                }
                            } }))),
                    columns.map((column, index) => (React.createElement("th", { key: index }, column))))),
            React.createElement("tbody", null, rows.map((row, rowIndex) => (React.createElement("tr", { key: rowIndex, className: selectedRows.includes(rowIndex) ? s.selectedRow : '' },
                selectable && (React.createElement("td", null,
                    React.createElement("input", { type: "checkbox", checked: selectedRows.includes(rowIndex), onChange: () => handleRowSelection(rowIndex) }))),
                row.map((cell, cellIndex) => (React.createElement("td", { key: cellIndex }, cell))))))))));
};

exports.DataGrid = DataGrid;
//# sourceMappingURL=index.js.map
