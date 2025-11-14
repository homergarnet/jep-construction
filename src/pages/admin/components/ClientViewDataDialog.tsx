import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetClientById } from '@/hooks/useClientList';
import useClientListContext from '@/store/client/clientListContext';
import React from 'react'

const ClientViewDataDialog = () => {
    const zIsOpenDialog2 = useClientListContext(
        (state) => state.zIsOpenDialog2
    );
    const zSetIsOpenDialog2 = useClientListContext(
        (state) => state.zSetIsOpenDialog2
    );
    const zClientId = useClientListContext(
        (state) => state.zClientId
    );

    const { data: clientById, isLoading, refetch } = useGetClientById({
        id: zClientId,
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
                                    <CardTitle className="text-lg font-semibold text-gray-800">{clientById?.UserList[0].EmployeeNumber}</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-2 text-sm text-gray-700">
                                    <p><span className="font-medium text-gray-600">Firstname:</span> {clientById?.UserList[0].Firstname}</p>
                                    <p><span className="font-medium text-gray-600">Lastname:</span> {clientById?.UserList[0].Lastname}</p>
                                    <p><span className="font-medium text-gray-600">Mobile number:</span> {clientById?.UserList[0].MobileNumber}</p>
                                    {/* <p><span className="font-medium text-gray-600">Date Created:</span> {formatDateToMMDDYYYYhhmmA(crById?.ClientRequestList[0].DateTimeCreated)}</p> */}
                                    <p>
                                        <span className="font-medium text-gray-600">Status:</span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${clientById?.UserList[0].Status === "active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-red-700"
                                                }`}
                                        >
                                            {clientById?.UserList[0].Status}
                                        </span>
                                    </p>
                                </CardContent>

                                {/* <CardFooter className="flex justify-end text-xs text-gray-400">
                  <span>Last updated: dateCreated</span>
                </CardFooter> */}
                            </Card>
                        </DialogDescription>
                    </DialogHeader>

                </DialogContent>
            </Dialog>

        </>

    );
}

export default ClientViewDataDialog
