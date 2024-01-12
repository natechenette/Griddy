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

var css_248z = ".styles-module_root__Xsw1F {\n  background: white;\n}\n\n.styles-module_activeRow__iVsQV {\n  background-color: gray;\n}\n\n.styles-module_activeCell__NnV4y {\n  outline: 2px solid blue;\n}";
var s = {"root":"styles-module_root__Xsw1F","activeRow":"styles-module_activeRow__iVsQV","activeCell":"styles-module_activeCell__NnV4y"};
styleInject(css_248z);

const DataGrid = ({ columns, rows, selectionMode = 'row', onRowSelection, customRenderers, }) => {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectedCell, setSelectedCell] = React.useState(null);
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
        setSelectedRows((prevSelectedRows) => {
            const isSelected = prevSelectedRows.includes(rowIndex);
            if (isSelected) {
                const updatedSelectedRows = prevSelectedRows.filter((selectedRow) => selectedRow !== rowIndex);
                onRowSelection === null || onRowSelection === void 0 ? void 0 : onRowSelection(updatedSelectedRows);
                return updatedSelectedRows;
            }
            else {
                const updatedSelectedRows = [...prevSelectedRows, rowIndex];
                onRowSelection === null || onRowSelection === void 0 ? void 0 : onRowSelection(updatedSelectedRows);
                return updatedSelectedRows;
            }
        });
    };
    const handleCheckboxClick = (rowIndex) => {
        setSelectedRows((prevSelectedRows) => {
            const isSelected = prevSelectedRows.includes(rowIndex);
            if (isSelected) {
                return prevSelectedRows.filter((selectedRow) => selectedRow !== rowIndex);
            }
            else {
                return [...prevSelectedRows, rowIndex];
            }
        });
    };
    const handleSelectAllRows = () => {
        const allRowsSelected = selectedRows.length === rows.length;
        if (allRowsSelected) {
            setSelectedRows([]);
        }
        else {
            setSelectedRows([...Array(rows.length).keys()]);
        }
    };
    const handleCellClick = (rowIndex, columnIndex) => {
        setSelectedCell({ row: rowIndex, column: columnIndex });
        if (selectionMode === 'row') {
            handleRowSelection(rowIndex);
        }
    };
    return (React.createElement("div", { className: s.root },
        React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    selectionMode === 'checkbox' && (React.createElement("th", null,
                        React.createElement("input", { type: "checkbox", checked: selectAllChecked === true, onChange: handleSelectAllRows, ref: (input) => {
                                if (input) {
                                    input.indeterminate = selectAllChecked === 'indeterminate';
                                }
                            } }))),
                    columns.map((column, columnIndex) => (React.createElement("th", { key: columnIndex }, column))))),
            React.createElement("tbody", null, rows.map((row, rowIndex) => (React.createElement("tr", { key: rowIndex, className: `${s.selectedRow} ${selectedRows.includes(rowIndex) ? s.activeRow : ''}`, onClick: () => selectionMode === 'row' && handleRowSelection(rowIndex) },
                selectionMode === 'checkbox' && (React.createElement("td", null,
                    React.createElement("input", { type: "checkbox", checked: selectedRows.includes(rowIndex), onChange: () => handleCheckboxClick(rowIndex) }))),
                row.map((cell, columnIndex) => (React.createElement("td", { key: columnIndex, className: (selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.row) === rowIndex && (selectedCell === null || selectedCell === void 0 ? void 0 : selectedCell.column) === columnIndex
                        ? `${s.selectedCell} ${s.activeCell}`
                        : '', onClick: () => handleCellClick(rowIndex, columnIndex) }, (customRenderers === null || customRenderers === void 0 ? void 0 : customRenderers[columnIndex]) ? customRenderers[columnIndex](cell) : cell))))))))));
};

exports.DataGrid = DataGrid;
//# sourceMappingURL=index.js.map
