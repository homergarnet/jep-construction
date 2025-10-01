import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import type { InventoryDto } from '@/types/inventory';
import { EDIT_INVENTORY } from '@/constants/constants';


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

    return (
        <TableBody>
            {paginatedInventories && paginatedInventories.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.Id}</TableCell>
                    <TableCell>{emp.ClientName}</TableCell>
                    <TableCell>{emp.ItemName}</TableCell>
                    <TableCell>{emp.Category}</TableCell>
                    <TableCell>{emp.Quantity}</TableCell>
                    <TableCell>{emp.UnitOfMeasure}</TableCell>
                    <TableCell>{emp.ReOrderLevel}</TableCell>
                    <TableCell>{emp.ReOrderQuantity}</TableCell>
                    <TableCell>{emp.Description}</TableCell>

                    <TableCell className="text-right space-x-2">
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
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default InventoryTblBody
