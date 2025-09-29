import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react'

type Column = {
    key: string;
    label: string;
    className?: string;
};

interface DataTableHeaderProps {
    columns: Column[];
}

export const TblHeader: React.FC<DataTableHeaderProps> = ({ columns }) => {
    return (
        <TableHeader>
            <TableRow>
                {columns.map((col) => (
                    <TableHead key={col.key} className={col.className}>
                        {col.label}
                    </TableHead>
                ))}
            </TableRow>
        </TableHeader>
    );
};

export default TblHeader;
