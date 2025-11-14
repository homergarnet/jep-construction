import TblHeader from '@/components/TblHeader'
import { Input } from '@/components/ui/input'
import { Table, TableCaption } from '@/components/ui/table'
import { clientRequestColumns } from '@/constants/constants'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import useSwal from '@/hooks/useSwal'
import useClientRequestContext from '@/store/clientRequest/clientRequestContext'
import { debounce } from 'lodash'
import { Users } from 'lucide-react'
import React from 'react'
import ClientRequestTblBody from './components/ClientRequestTblBody'
import { useGetClientRequestList, useRemoveClientRequest } from '@/hooks/useClientRequest'
import ClientRequestPagination from './components/ClientRequestPagination'
import CRReplyDialog from './components/CRReplyDialog'
import CRViewDataDialog from './components/CRViewDataDialog'

const ClientRequestPage = () => {
    const zSetIsOpenDialog = useClientRequestContext((state) => state.zSetIsOpenDialog);
    const zDialogTitle = useClientRequestContext((state) => state.zDialogTitle);
    const zSetDialogTitle = useClientRequestContext((state) => state.zSetDialogTitle);
    const zPage = useClientRequestContext((state) => state.zPage);
    const zSetPage = useClientRequestContext((state) => state.zSetPage);
    const zPageSize = useClientRequestContext((state) => state.zPageSize);
    const zStatusFilter = useClientRequestContext((state) => state.zStatusFilter);
    const zSetStatusFilter = useClientRequestContext((state) => state.zSetStatusFilter);
    const { showConfirm, showToast } = useSwal();
    const { confirm, ConfirmDialog } = useConfirmDialog();

    const { data: clientRequestList, isLoading: clientRequestLoading } = useGetClientRequestList({
        keyword: zStatusFilter,
        page: zPage,
        pageSize: zPageSize,
    });

    const removeClientRequest = useRemoveClientRequest();

    const totalRecords = clientRequestList?.TotalRecords ?? 0;
    const totalPages = Math.ceil(totalRecords / zPageSize);

    const handleClientRequest = (value: string) => {
        console.log("value: ", value);
        zSetStatusFilter(value);
    };

    const debouncedHCRChange = debounce((value: string) => {
        handleClientRequest(value);
    }, 1500);

    const handleRemove = async (id: number) => {
        const ok = await confirm({
            title: "You won't be able to revert this!",
            description: `Are you sure you want to remove?`,
            confirmLabel: "Yes, Continue",
            cancelLabel: "No",
        })

        if (!ok) return

        removeClientRequest.mutate(id, {
            onSuccess: (res) => showToast(res.ApiMessage, "success"),
            onError: (error: Error) => showToast(error.message, "error"),
        })
    }

    return (
        <>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Client Request Page
                    </h2>
                    {/* <Button>Export Report</Button> */}
                </div>
                <p className="text-muted-foreground mt-1">
                    Track and manage client request records.
                </p>
                {/* Header with Status Filter, Search + Add Employee */}
                <div className="flex justify-end items-center mb-4 space-x-2">
                    {/* Search */}
                    <Input
                        placeholder="Search client..."
                        onChange={(e) => debouncedHCRChange(e.target.value)} // 👈 extract value
                        className="w-64"
                    />
                </div>
                {/* Employee Table */}
                <Table>
                    <TableCaption>A list of employees</TableCaption>
                    <TblHeader columns={clientRequestColumns} />
                    <ClientRequestTblBody
                        paginatedClientRequests={clientRequestList?.ClientRequestList}
                        onRemove={handleRemove}
                    />
                </Table>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <ClientRequestPagination
                        totalPages={totalPages}
                    />
                </div>
            </div>

            <CRReplyDialog
            />
            <CRViewDataDialog
            />
            {/* <EmployeeDialog
                onStatusChange={handleStatusChange}
                onSubmit={handleSubmitForm}
                onError={handleErrorForm}
                onReset={handleResetValue}
                formMethods={form}
            /> */}
            {/* Important: must render this once per component */}
            {ConfirmDialog}
        </>

    )
}

export default ClientRequestPage
