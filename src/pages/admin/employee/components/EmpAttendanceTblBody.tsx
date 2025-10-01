import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { EDIT_EMP_ATTENDANCE } from '@/constants/constants';
import type { AttendanceListDto } from '@/types/empAttendance';
import React from 'react'

type EmployeTblBodyProps = {
    paginatedAttendance: AttendanceListDto[] | undefined;
    onRemove: (id: number) => void;
    onCreateUpdateEmpAttendanceList: (type: string, id: number) => void;
}

const EmpAttendanceTblBody: React.FC<EmployeTblBodyProps> = ({
    paginatedAttendance,
    onRemove,
    onCreateUpdateEmpAttendanceList
}) => {
    const apiRoot = import.meta.env.VITE_APP_API_ROOT_ENDPOINT;
    return (
        <TableBody>
            {paginatedAttendance && paginatedAttendance.map((emp) => (
                <TableRow key={emp.Id}>
                    <TableCell>{emp.EmployeeNumber}</TableCell>
                    <TableCell>{emp.EmployeeName}</TableCell>
                    <TableCell>{emp.TimeInOut}</TableCell>

                    {/* Make TimeInOutImage an <img> */}
                    <TableCell>
                        {emp.TimeInOutImage ? (
                            <img
                                src={apiRoot + emp.TimeInOutImage} // could be base64 or URL
                                alt="Attendance"
                                className="w-[250px] h-[250px] object-cover rounded-md border"
                            />
                        ) : (
                            <span className="text-gray-400 italic">No Image</span>
                        )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button className='cursor-pointer' variant="outline" size="sm" onClick={(e) => onCreateUpdateEmpAttendanceList(EDIT_EMP_ATTENDANCE, emp.Id)}>
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

export default EmpAttendanceTblBody
