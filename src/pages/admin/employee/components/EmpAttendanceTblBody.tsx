import { Button } from '@/components/ui/button';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ADMIN_TYPE_NUM, EDIT_EMP_ATTENDANCE } from '@/constants/constants';
import useEmpAttendanceContext from '@/store/employee/empAttendance/empAttendanceContext';
import type { AttendanceListDto } from '@/types/empAttendance';
import { formatDateToMMDDYYYYhhmmA } from '@/utils/formatDateToMMDDYYYYhhmmA';
import { getJwtRoleId } from '@/utils/getJwtRoleId';
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
    const roleId = getJwtRoleId();
    const apiRoot = import.meta.env.VITE_APP_API_ROOT_ENDPOINT;

    const zSetIsOpenDialog2 = useEmpAttendanceContext(
        (state) => state.zSetIsOpenDialog2
    );
    const zSetEaId = useEmpAttendanceContext(
        (state) => state.zSetEaId
    );

    return (
        <TableBody>
            {paginatedAttendance && paginatedAttendance.map((emp) => (
                <TableRow key={emp.Id}>
                    {/* <TableCell>{emp.EmployeeNumber}</TableCell> */}
                    {roleId === ADMIN_TYPE_NUM && <TableCell>{emp.EmployeeName}</TableCell>}
                    {/* <TableCell>{formatDateToMMDDYYYYhhmmA(emp.TimeIn)}</TableCell> */}
                    {/* Make TimeInOutImage an <img> */}
                    {/* <TableCell>
                        {emp.TimeInImage ? (
                            <img
                                src={apiRoot + emp.TimeInImage} // could be base64 or URL
                                alt="Attendance"
                                className="w-[250px] h-[250px] object-cover rounded-md border"
                            />
                        ) : (
                            <span className="text-gray-400 italic">No Image</span>
                        )}
                    </TableCell>
                    <TableCell>{formatDateToMMDDYYYYhhmmA(emp.TimeOut)}</TableCell>
                    <TableCell>
                        {emp.TimeInImage ? (
                            <img
                                src={apiRoot + emp.TimeInImage} // could be base64 or URL
                                alt="Attendance"
                                className="w-[250px] h-[250px] object-cover rounded-md border"
                            />
                        ) : (
                            <span className="text-gray-400 italic">No Image</span>
                        )}
                    </TableCell> */}
                    <TableCell>{emp.Duration}</TableCell>
                    <TableCell className="text-right space-x-2">
                        {roleId === ADMIN_TYPE_NUM && (
                            <>
                                <Button
                                    className="cursor-pointer border-blue-300 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        zSetEaId(emp.Id);
                                        // zSetCREmail(emp.Email);
                                        zSetIsOpenDialog2(true);
                                    }}
                                >
                                    View
                                </Button>
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
                            </>
                        )}

                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default EmpAttendanceTblBody
