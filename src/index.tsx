import React from 'react';

import s from './styles.module.css';

type DataGridProps = {
  columns: string[];
  rows: string[][];
};

export const DataGrid: React.FC<DataGridProps> = ({ columns, rows }) => {
  return (
    <div className={s.root}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
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
