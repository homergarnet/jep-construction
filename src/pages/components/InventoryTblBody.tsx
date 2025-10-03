import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { InventoryDto } from '@/types/inventory';
import { ADMIN_TYPE_NUM, EDIT_INVENTORY } from '@/constants/constants';
import { getJwtRoleId } from '@/utils/getJwtRoleId';


type InventoryTblBodyProps = {
    paginatedInventories: InventoryDto[] | undefined;
    onRemove: (id: number) => void;
    onCreateUpdateInventory: (type: string, id: number) => void;
}

const InventoryTblBody: React.FC<InventoryTblBodyProps> = ({
    paginatedInventories,
    onRemove,
    onCreateUpdateInventory
}) => {
    const roleId = getJwtRoleId();
    return (
        <TableBody>
            {paginatedInventories && paginatedInventories.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.Id}</TableCell>
                    {roleId === ADMIN_TYPE_NUM && <TableCell>{emp.ClientName}</TableCell>}
                    <TableCell>{emp.ItemName}</TableCell>
                    <TableCell>{emp.Category}</TableCell>
                    <TableCell>{emp.Quantity}</TableCell>
                    <TableCell>{emp.UnitOfMeasure}</TableCell>
                    <TableCell>{emp.ReOrderLevel}</TableCell>
                    <TableCell>{emp.ReOrderQuantity}</TableCell>
                    <TableCell>{emp.Description}</TableCell>
                    <TableCell className="text-right space-x-2">
                        {roleId === ADMIN_TYPE_NUM && (
                            <>
                                <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => onCreateUpdateInventory(EDIT_INVENTORY, emp.Id)}>
                                    Edit
                                </Button>
                                <Button
                                    className='cursor-pointer'
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onRemove(emp.Id)}
                                >
                                    Remove
                                </Button>
                            </>
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default InventoryTblBody
