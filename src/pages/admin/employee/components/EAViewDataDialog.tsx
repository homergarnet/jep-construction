import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetEmpAttendanceById } from '@/hooks/useEmpAttendance';
import useEmpAttendanceContext from '@/store/employee/empAttendance/empAttendanceContext';
import { formatDateToMMDDYYYYhhmmA } from '@/utils/formatDateToMMDDYYYYhhmmA';
import React from 'react'

const EAViewDataDialog = () => {

    const apiRoot = import.meta.env.VITE_APP_API_ROOT_ENDPOINT;

    const zIsOpenDialog2 = useEmpAttendanceContext(
        (state) => state.zIsOpenDialog2
    );
    const zSetIsOpenDialog2 = useEmpAttendanceContext(
        (state) => state.zSetIsOpenDialog2
    );
    const zEaId = useEmpAttendanceContext(
        (state) => state.zEaId
    );

    const { data: eaById, isLoading, refetch } = useGetEmpAttendanceById({
        id: zEaId,
    });
    return (
        <>
            <Dialog
                open={zIsOpenDialog2}
                onOpenChange={(open) => {
                    zSetIsOpenDialog2(open);
                    // if (!open) {
                    //     zSetReviewId(0);
                    //     clearReviewAEData();
                    // }
                }}
            >
                <DialogContent className="max-w-lg w-full">
                    <DialogHeader>
                        <DialogTitle>
                            {/* {zIsCreateReview
                                ? CREATE_REVIEW
                                : EDIT_REVIEW} */}
                            {/* Create Email */}
                        </DialogTitle>
                        <DialogDescription>
                            {/* {zIsCreateReview
                                ? "Fill in the details to add a new review."
                                : "Edit the review details below."} */}
                            <Card className="w-full max-w-md mx-auto shadow-md border border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-gray-800">
                                        {eaById?.AttendanceList[0].EmployeeNumber}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4 text-sm text-gray-700">
                                    <p>
                                        <span className="font-medium text-gray-600">Name:</span>
                                        {eaById?.AttendanceList[0].EmployeeName}
                                    </p>

                                    <div>
                                        <p className="font-medium text-gray-600">Time In:</p>
                                        <p>{formatDateToMMDDYYYYhhmmA(eaById?.AttendanceList[0].TimeIn ?? "")
                                        }</p>

                                        {/* ⭐ SHOW IMAGE */}
                                        <img
                                            src={apiRoot + eaById?.AttendanceList[0].TimeInImage}
                                            alt="Time In"
                                            className="w-40 h-40 object-cover rounded-md border mt-1"
                                        />
                                    </div>

                                    <div>
                                        <p className="font-medium text-gray-600">Time Out:</p>
                                        {formatDateToMMDDYYYYhhmmA(eaById?.AttendanceList[0].TimeOut ?? "")
                                        }

                                        {/* ⭐ SHOW IMAGE */}
                                        <img
                                            src={apiRoot + eaById?.AttendanceList[0].TimeOutImage}
                                            alt="Time Out"
                                            className="w-40 h-40 object-cover rounded-md border mt-1"
                                        />
                                    </div>

                                    <p>
                                        <span className="font-medium text-gray-600">Duration:</span>
                                        {eaById?.AttendanceList[0].Duration}
                                    </p>
                                </CardContent>
                            </Card>

                        </DialogDescription>
                    </DialogHeader>

                </DialogContent>
            </Dialog>

        </>

    );
}

export default EAViewDataDialog
