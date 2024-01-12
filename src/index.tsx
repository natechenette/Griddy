import React, { useState } from 'react';

import s from './styles.module.css';

type DataGridProps = {
  columns: string[];
  rows: string[][];
  selectable?: boolean;
};

export const DataGrid: React.FC<DataGridProps> = ({ columns, rows, selectable = false }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleRowSelection = (rowIndex: number) => {
    if (selectable) {
      setSelectedRows((prevSelectedRows) => {
        const isSelected = prevSelectedRows.includes(rowIndex);
        if (isSelected) {
          return prevSelectedRows.filter((selectedRow) => selectedRow !== rowIndex);
        } else {
          return [...prevSelectedRows, rowIndex];
        }
      });
    }
  };

  return (
    <div className={s.root}>
      <table>
        <thead>
          <tr>
            {selectable && <th>Select</th>}
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
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
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
