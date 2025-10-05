import StatusFilter from '@/components/StatusFilter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableCaption } from '@/components/ui/table'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import useSwal from '@/hooks/useSwal'
import useClientListContext from '@/store/client/clientListContext'
import { Users } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { clientListFormSchema, type ClientListFormValues } from './schema/clientListFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type FieldErrors } from 'react-hook-form'
import { debounce } from 'lodash'
import { CLIENT_TYPE, clientColumns, clientListStatusOptions, CREATE_CLIENT, EDIT_CLIENT } from '@/constants/constants'
import { useCreateClientRequest, useGetClientById, useGetClientList, useRemoveClient, useUpdateClient } from '@/hooks/useClientList'
import type { CreateUpdateClientRequest } from '@/types/clientlist'
import TblHeader from '@/components/TblHeader'
import ClientTblBody from './components/ClientTblBody'
import ClientDialog from './components/ClientDialog'
import ClientListPagination from './components/ClientListPagination'

const ClientListPage = () => {

    const zSetIsOpenDialog = useClientListContext((state) => state.zSetIsOpenDialog);
    const zDialogTitle = useClientListContext((state) => state.zDialogTitle);
    const zSetDialogTitle = useClientListContext((state) => state.zSetDialogTitle);
    const zClientListAEData = useClientListContext((state) => state.zClientListAEData);
    const zSetClientListAEData = useClientListContext((state) => state.zSetClientListAEData);
    const zPage = useClientListContext((state) => state.zPage);
    const zSetPage = useClientListContext((state) => state.zSetPage);
    const zPageSize = useClientListContext((state) => state.zPageSize);
    const zStatusFilter = useClientListContext((state) => state.zStatusFilter);
    const zSetStatusFilter = useClientListContext((state) => state.zSetStatusFilter);
    const [clientId, setClientId] = useState(0);
    const [empIdDupli, setClientIdDupli] = useState(0);
    const { showConfirm, showToast } = useSwal();
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const createClient = useCreateClientRequest();
    const { data: clientList, isLoading: clientListLoading } = useGetClientList({
        keyword: zStatusFilter,
        accountType: CLIENT_TYPE,
        page: zPage,
        pageSize: zPageSize,
    });

    const { data: clientById, isLoading, refetch } = useGetClientById({
        id: clientId,
    });

    const updateClient = useUpdateClient();
    const removeClient = useRemoveClient();

    const form = useForm<ClientListFormValues>({
        resolver: zodResolver(clientListFormSchema), // Use Zod for validation
        defaultValues: {
            id: undefined,
            email: "",
            firstname: "",
            lastname: "",
            mobileNumber: "",
            position: "",
            salary: 0,
            status: "",
            address: "",
            dateOfBirth: new Date(), // or new Date().toISOString().split("T")[0] if you want today's date
        },
        //for validation way choices "onBlur"(When you exit the textbox hover) | "onChange"(When you change the field not recommended performance issue) | "onSubmit" (Default and when user click the button) | "onTouched (on the first load event and every change event)" | "all" (Both change and blur event)
        mode: "onTouched",
    });
    const {
        register,
        control,
        handleSubmit,
        formState,
        watch,
        getValues,
        setValue,
        reset,
        trigger,
    } = form;
    const {
        errors,
        touchedFields,
        dirtyFields,
        isDirty,
        isValid,
        isSubmitting,
        isSubmitted,
        isSubmitSuccessful,
        submitCount,
    } = formState;

    const totalRecords = clientList?.TotalRecords ?? 0;
    const totalPages = Math.ceil(totalRecords / zPageSize);

    const handleSC = (value: string) => {
        console.log("value: ", value);
        zSetStatusFilter(value);
    };

    const debouncedHSCnChange = debounce((value: string) => {
        handleSC(value);
    }, 1500);

    const handleCreateUpdateClientList = useCallback((type: string, id: number) => {

        zSetIsOpenDialog(true);
        zSetDialogTitle(type);

        if (type === EDIT_CLIENT) {
            setClientId(id);
            setClientIdDupli(id);
            if (empIdDupli === id) {
                refetch();
            }

        }
    }, [zSetIsOpenDialog, zSetDialogTitle, empIdDupli]);

    const handleStatusChange = useCallback((value: string) => {
        setValue("status", value, { shouldValidate: true });
    }, []);


    const handleSubmitForm = useCallback(
        async (data: ClientListFormValues) => {
            console.log("Form submitted ", data)

            let statusType = zDialogTitle === CREATE_CLIENT ? "Create" : "Edit"

            if (!isValid) return

            try {
                const ok = await confirm({
                    title: "You won't be able to revert this!",
                    description: `Are you sure you want to ${statusType}?`,
                    confirmLabel: "Yes, Continue",
                    cancelLabel: "No",
                })

                if (!ok) return

                let payload: CreateUpdateClientRequest = {
                    Id: data.id,
                    Email: data.email,
                    Firstname: data.firstname,
                    Lastname: data.lastname,
                    MobileNumber: data.mobileNumber,
                    Position: "N/A",
                    Salary: 0,
                    Status: data.status,
                    Address: data.address,
                    AccountType: CLIENT_TYPE,
                    DateOfBirth: data.dateOfBirth,
                }

                if (zDialogTitle === CREATE_CLIENT) {
                    createClient.mutate(payload, {
                        onSuccess: (res) => showToast(res.ApiMessage, "success"),
                        onError: (error: Error) => showToast(error.message, "error"),
                    })
                } else {
                    updateClient.mutate(payload, {
                        onSuccess: (res) => showToast(res.ApiMessage, "success"),
                        onError: (error: Error) => showToast(error.message, "error"),
                    })
                }
            } catch (error) {
                console.error("Failed to submit form", error)
            }
        },
        [zDialogTitle, isValid, confirm]
    )

    const handleErrorForm = useCallback((errors: FieldErrors<ClientListFormValues>) => {
        console.log("Form Errors: ", errors);
    }, []);

    const handleResetValue = useCallback(() => {
        const values: ClientListFormValues = {
            email: "",
            firstname: "",
            lastname: "",
            mobileNumber: "",
            position: "",
            salary: 0, // must be a number
            status: "",
            address: "",
            dateOfBirth: new Date(),
        };
        reset(values);
    }, [reset]);

    const handleRemove = async (id: number) => {
        const ok = await confirm({
            title: "You won't be able to revert this!",
            description: `Are you sure you want to remove?`,
            confirmLabel: "Yes, Continue",
            cancelLabel: "No",
        })

        if (!ok) return

        removeClient.mutate(id, {
            onSuccess: (res) => showToast(res.ApiMessage, "success"),
            onError: (error: Error) => showToast(error.message, "error"),
        })
    }

    //for update modal fields
    useEffect(() => {
        console.log("zClientListAEData: ", zClientListAEData);
        // Update form values when initialValues changes
        reset(zClientListAEData);

    }, [zClientListAEData]);

    return (
        <>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Client List Page
                    </h2>
                    {/* <Button>Export Report</Button> */}
                </div>
                <p className="text-muted-foreground mt-1">
                    Track and manage client records.
                </p>
                {/* Header with Status Filter, Search + Add Client */}
                <div className="flex justify-end items-center mb-4 space-x-2">
                    {/* Status Filter */}
                    <StatusFilter
                        value={zStatusFilter}
                        onChange={zSetStatusFilter}
                        options={clientListStatusOptions}
                        placeholder='Filter by status'
                    />

                    {/* Search */}
                    <Input
                        placeholder="Search client..."
                        onChange={(e) => debouncedHSCnChange(e.target.value)} // 👈 extract value
                        className="w-64"
                    />

                    {/* Add Client */}
                    <Button className='cursor-pointer' onClick={(e) => handleCreateUpdateClientList(CREATE_CLIENT, 0)}>{CREATE_CLIENT}</Button>
                </div>

                {/* Client Table */}
                <Table>
                    <TableCaption>A list of clients</TableCaption>
                    <TblHeader columns={clientColumns} />
                    <ClientTblBody
                        paginatedClients={clientList?.UserList}
                        onRemove={handleRemove}
                        onCreateUpdateClientList={handleCreateUpdateClientList}
                    />
                </Table>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <ClientListPagination
                        totalPages={totalPages}
                    />
                </div>
            </div>
            <ClientDialog
                onStatusChange={handleStatusChange}
                onSubmit={handleSubmitForm}
                onError={handleErrorForm}
                onReset={handleResetValue}
                formMethods={form}
            />
            {/* Important: must render this once per component */}
            {ConfirmDialog}
        </>
    )


}

export default ClientListPage
