import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useGetClientRequestById } from '@/hooks/useClientRequest';
import useClientRequestContext from '@/store/clientRequest/clientRequestContext';
import { formatDateToMMDDYYYYhhmmA } from '@/utils/formatDateToMMDDYYYYhhmmA';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import React from 'react'

const CRViewDataDialog = () => {

  const zIsOpenDialog2 = useClientRequestContext(
    (state) => state.zIsOpenDialog2
  );
  const zSetIsOpenDialog2 = useClientRequestContext(
    (state) => state.zSetIsOpenDialog2
  );
  const zCRId = useClientRequestContext(
    (state) => state.zCRId
  );

  const { data: crById, isLoading, refetch } = useGetClientRequestById({
    id: zCRId,
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
                  <CardTitle className="text-lg font-semibold text-gray-800">{crById?.ClientRequestList[0].Name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-medium text-gray-600">Email:</span> {crById?.ClientRequestList[0].Email}</p>
                  <p><span className="font-medium text-gray-600">Mobile:</span> {crById?.ClientRequestList[0].MobileNumber}</p>
                  <p><span className="font-medium text-gray-600">Message:</span> {crById?.ClientRequestList[0].Message}</p>
                  {/* <p><span className="font-medium text-gray-600">Date Created:</span> {formatDateToMMDDYYYYhhmmA(crById?.ClientRequestList[0].DateTimeCreated)}</p> */}
                  <p>
                    <span className="font-medium text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${crById?.ClientRequestList[0].HasReply ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}
                    >
                      {crById?.ClientRequestList[0].HasReply ? "Sent reply" : "Not yet"}
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

export default CRViewDataDialog
