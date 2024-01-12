import React, { useState, useEffect } from 'react';

import s from './styles.module.css';

type DataGridProps = {
  columns: string[];
  rows: string[][];
  selectionMode?: 'checkbox' | 'row';
  onRowSelection?: (selectedRows: number[]) => void;
  customRenderers?: { [columnIndex: number]: (cellValue: string) => React.ReactNode };
};

export const DataGrid: React.FC<DataGridProps> = ({
  columns,
  rows,
  selectionMode = 'row',
  onRowSelection,
  customRenderers,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedCell, setSelectedCell] = useState<{ row: number; column: number } | null>(null);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean | 'indeterminate'>(false);

  useEffect(() => {
    // Determine the state of the header checkbox based on selectedRows
    if (selectedRows.length === 0) {
      setSelectAllChecked(false);
    } else if (selectedRows.length === rows.length) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked('indeterminate');
    }
  }, [selectedRows, rows]);

  const handleRowSelection = (rowIndex: number) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(rowIndex);
      if (isSelected) {
        const updatedSelectedRows = prevSelectedRows.filter((selectedRow) => selectedRow !== rowIndex);
        onRowSelection?.(updatedSelectedRows);
        return updatedSelectedRows;
      } else {
        const updatedSelectedRows = [...prevSelectedRows, rowIndex];
        onRowSelection?.(updatedSelectedRows);
        return updatedSelectedRows;
      }
    });
  };

  const handleCheckboxClick = (rowIndex: number) => {
    setSelectedRows((prevSelectedRows) => {
      const isSelected = prevSelectedRows.includes(rowIndex);
      if (isSelected) {
        return prevSelectedRows.filter((selectedRow) => selectedRow !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
  };

  const handleSelectAllRows = () => {
    const allRowsSelected = selectedRows.length === rows.length;
    if (allRowsSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...Array(rows.length).keys()]);
    }
  };

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    setSelectedCell({ row: rowIndex, column: columnIndex });
    if (selectionMode === 'row') {
      handleRowSelection(rowIndex);
    }
  };

  return (
    <div className={s.root}>
      <table>
        <thead>
          <tr>
            {selectionMode === 'checkbox' && (
              <th>
                <input
                  type="checkbox"
                  checked={selectAllChecked === true}
                  onChange={handleSelectAllRows}
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = selectAllChecked === 'indeterminate';
                    }
                  }}
                />
              </th>
            )}
            {columns.map((column, columnIndex) => (
              <th key={columnIndex}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${s.selectedRow} ${selectedRows.includes(rowIndex) ? s.activeRow : ''}`}
              onClick={() => selectionMode === 'row' && handleRowSelection(rowIndex)}
            >
              {selectionMode === 'checkbox' && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleCheckboxClick(rowIndex)}
                  />
                </td>
              )}
              {row.map((cell, columnIndex) => (
                <td
                  key={columnIndex}
                  className={
                    selectedCell?.row === rowIndex && selectedCell?.column === columnIndex
                      ? `${s.selectedCell} ${s.activeCell}`
                      : ''
                  }
                  onClick={() => handleCellClick(rowIndex, columnIndex)}
                >
                  {customRenderers?.[columnIndex] ? customRenderers[columnIndex](cell) : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
