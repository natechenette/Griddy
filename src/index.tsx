import React, { useState, useEffect } from 'react';

import s from './styles.module.css';

type DataGridProps = {
  columns: string[];
  rows: string[][];
  selectable?: boolean;
  onRowSelection?: (selectedRows: number[]) => void;
};

export const DataGrid: React.FC<DataGridProps> = ({ columns, rows, selectable = false, onRowSelection }) => {
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
    if (selectable) {
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
    }
  };

  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    setSelectedCell({ row: rowIndex, column: columnIndex });
  };

  const handleSelectAllRows = () => {
    if (selectable) {
      const allRowsSelected = selectedRows.length === rows.length;
      if (allRowsSelected) {
        setSelectedRows([]);
      } else {
        setSelectedRows([...Array(rows.length).keys()]);
      }
    }
  };

  return (
    <div className={s.root}>
      <table>
        <thead>
          <tr>
            {selectable && (
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
            <tr key={rowIndex}>
              {selectable && (
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => handleRowSelection(rowIndex)}
                  />
                </td>
              )}
              {row.map((cell, columnIndex) => (
                <td
                  key={columnIndex}
                  className={selectedCell?.row === rowIndex && selectedCell?.column === columnIndex ? s.selectedCell : ''}
                  onClick={() => handleCellClick(rowIndex, columnIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
