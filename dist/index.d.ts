import React from 'react';
type DataGridProps = {
    columns: string[];
    rows: string[][];
    selectable?: boolean;
    onRowSelection?: (selectedRows: number[]) => void;
};
export declare const DataGrid: React.FC<DataGridProps>;
export {};
