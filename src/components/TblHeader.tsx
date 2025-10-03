import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ADMIN_TYPE_NUM } from '@/constants/constants';
import { getJwtRoleId } from '@/utils/getJwtRoleId';
import React from 'react'

type Column = {
    key: string;
    label: string;
    className?: string;
};

interface DataTableHeaderProps {
    columns: Column[];
    headerType?: string;
}

export const TblHeader: React.FC<DataTableHeaderProps> = ({ columns, headerType }) => {
    var roleId = getJwtRoleId();

    return (

        <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
                {columns.map((col) => {
                    if (headerType === "attendance") {
                        if (col.key !== "employeeName" && col.key !== "actions" || roleId === ADMIN_TYPE_NUM) {
                            return (
                                <TableHead key={col.key} className={col.className}>
                                    {col.label}
                                </TableHead>
                            )
                        } else if (col.key !== "employeeName" && col.key !== "actions") {
                            return (
                                <TableHead key={col.key} className={col.className}>
                                    {col.label}
                                </TableHead>
                            )
                        }
                    }
                    else if (headerType === "inventory") {
                        if (col.key !== "clientName" && col.key !== "actions" || roleId === ADMIN_TYPE_NUM) {
                            return (
                                <TableHead key={col.key} className={col.className}>
                                    {col.label}
                                </TableHead>
                            )
                        } else if (col.key !== "clientName" && col.key !== "actions") {
                            return (
                                <TableHead key={col.key} className={col.className}>
                                    {col.label}
                                </TableHead>
                            )
                        }
                    }
                    else if (headerType === "project management") {
                        if (col.key !== "actions" || roleId === ADMIN_TYPE_NUM) {
                            return (
                                <TableHead key={col.key} className={col.className}>
                                    {col.label}
                                </TableHead>
                            )
                        } else if (col.key !== "actions") {
                            return (
                                <TableHead key={col.key} className={col.className}>
                                    {col.label}
                                </TableHead>
                            )
                        }
                    }
                    else {
                        return (
                            <TableHead key={col.key} className={col.className}>
                                {col.label}
                            </TableHead>
                        )
                    }

                }
                )}
            </TableRow>
        </TableHeader>
    );
};

export default TblHeader;
