import React from 'react';
type DataGridProps = {
    columns: string[];
    rows: string[][];
    selectionMode?: 'checkbox' | 'row';
    onRowSelection?: (selectedRows: number[]) => void;
    customRenderers?: {
        [columnIndex: number]: (cellValue: string) => React.ReactNode;
    };
};
export declare const DataGrid: React.FC<DataGridProps>;
export {};
