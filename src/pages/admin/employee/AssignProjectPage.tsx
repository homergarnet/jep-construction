import { useCreateAssignProject, useGetAssignProjectById, useGetAssProjectList, useRemoveAssignProject, useUpdateAssignProject } from '@/hooks/useAssignProject';
import { useConfirmDialog } from '@/hooks/useConfirmDialog';
import useSwal from '@/hooks/useSwal';
import useAssignProjectContext from '@/store/assignProject/useAssignProjectContext';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, type FieldErrors } from 'react-hook-form';
import { assignProjectFormSchema, type AssignProjectFormValues } from './schema/assignProjectFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { assignProjectColumns, CREATE_ASSIGN_PROJECT, EDIT_ASSIGN_PROJECT } from '@/constants/constants';
import type { CreateUpdateAssignProjectRequest } from '@/types/assignProject';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableCaption } from '@/components/ui/table';
import TblHeader from '@/components/TblHeader';
import AssignProjectTblBody from './components/AssignProjectTblBody';
import AssignProjectPagination from './components/AssignProjectPagination';
import AssignProjectDialog from './components/AssignProjectDialog';

const AssignProjectPage = () => {
    const zSetIsOpenDialog = useAssignProjectContext((state) => state.zSetIsOpenDialog);
    const zDialogTitle = useAssignProjectContext((state) => state.zDialogTitle);
    const zSetDialogTitle = useAssignProjectContext((state) => state.zSetDialogTitle);
    const zAssProjectAEData = useAssignProjectContext((state) => state.zAssProjectAEData);
    const zSetAssProjectAEData = useAssignProjectContext((state) => state.zSetAssProjectAEData);
    const zPage = useAssignProjectContext((state) => state.zPage);
    const zSetPage = useAssignProjectContext((state) => state.zSetPage);
    const zPageSize = useAssignProjectContext((state) => state.zPageSize);
    const zStatusFilter = useAssignProjectContext((state) => state.zStatusFilter);
    const zSetStatusFilter = useAssignProjectContext((state) => state.zSetStatusFilter);
    const zAssignProjectId = useAssignProjectContext((state) => state.zAssignProjectId);
    const zSetAssignProjectId = useAssignProjectContext((state) => state.zSetAssignProjectId);
    const { showConfirm, showToast } = useSwal();
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const createAssignProject = useCreateAssignProject();
    const { data: assProjectList, isLoading: assProjectListLoading } = useGetAssProjectList({
        keyword: zStatusFilter,
        page: zPage,
        pageSize: zPageSize,
    });

    const { data: assProjectById, isLoading, refetch } = useGetAssignProjectById({
        id: zAssignProjectId,
    });

    const updateAssignProject = useUpdateAssignProject();
    const removeAssignProject = useRemoveAssignProject();

    const form = useForm<AssignProjectFormValues>({
        resolver: zodResolver(assignProjectFormSchema), // Use Zod for validation
        defaultValues: {
            id: undefined,
            employeeNumber: "",
            userId: 0,
            projectId: 0,
            startDate: new Date(), // or new Date().toISOString().split("T")[0] if you want today's date
            endDate: new Date(), // or new Date().toISOString().split("T")[0] if you want today's date
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

    const totalRecords = assProjectList?.TotalRecords ?? 0;
    const totalPages = Math.ceil(totalRecords / zPageSize);

    const handleAS = (value: string) => {
        console.log("value: ", value);
        zSetStatusFilter(value);
    };

    const debouncedHASChange = debounce((value: string) => {
        handleAS(value);
    }, 1500);

    const handleCreateUpdateAssignProject = useCallback((type: string, id: number) => {

        zSetIsOpenDialog(true);
        zSetDialogTitle(type);
        zSetAssignProjectId(id);

    }, [zSetIsOpenDialog, zSetDialogTitle, zSetAssignProjectId]);

    const handleStatusChange = useCallback((value: string) => {
        // setValue("status", value, { shouldValidate: true });
    }, []);

    const handleSubmitForm = useCallback(
        async (data: AssignProjectFormValues) => {
            console.log("Form submitted ", data)
            let statusType = zDialogTitle === CREATE_ASSIGN_PROJECT ? "Create" : "Edit"

            if (!isValid) return

            try {
                const ok = await confirm({
                    title: "You won't be able to revert this!",
                    description: `Are you sure you want to ${statusType}?`,
                    confirmLabel: "Yes, Continue",
                    cancelLabel: "No",
                })

                if (!ok) return

                let payload: CreateUpdateAssignProjectRequest = {
                    Id: data.id,
                    UserId: data.userId,
                    ProjectId: data.projectId,
                    StartDate: data.startDate,
                    EndDate: data.endDate,
                }

                if (zDialogTitle === CREATE_ASSIGN_PROJECT) {
                    createAssignProject.mutate(payload, {
                        onSuccess: (res) => showToast(res.ApiMessage, "success"),
                        onError: (error: any) => {
                            const apiMessage =
                                error?.response?.data?.ApiMessage ||
                                error?.message ||
                                "An unexpected error occurred.";
                            showToast(apiMessage, "error");
                        },
                    })
                } else {
                    updateAssignProject.mutate(payload, {
                        onSuccess: (res) => showToast(res.ApiMessage, "success"),
                        onError: (error: any) => {
                            const apiMessage =
                                error?.response?.data?.ApiMessage ||
                                error?.message ||
                                "An unexpected error occurred.";
                            showToast(apiMessage, "error");
                        },
                    })
                }
            } catch (error) {
                console.error("Failed to submit form", error)
            }
        },
        [zDialogTitle, isValid, confirm]
    )

    const handleErrorForm = useCallback((errors: FieldErrors<AssignProjectFormValues>) => {
        console.log("Form Errors: ", errors);
    }, []);

    const handleResetValue = useCallback(() => {
        const values: AssignProjectFormValues = {
            userId: 0,
            projectId: 0,
            employeeNumber: "",
            employeeFullname: "",
            clientName: "",
            projectName: "",
            startDate: new Date(),
            endDate: new Date(),
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

        removeAssignProject.mutate(id, {
            onSuccess: (res) => showToast(res.ApiMessage, "success"),
            onError: (error: Error) => showToast(error.message, "error"),
        })
    }

    //for update modal fields
    useEffect(() => {
        console.log("zAssProjectAEData: ", zAssProjectAEData);
        // Update form values when initialValues changes
        reset(zAssProjectAEData);

    }, [zAssProjectAEData]);

    return (
        <>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Assign Project Page
                    </h2>
                    {/* <Button>Export Report</Button> */}
                </div>
                <p className="text-muted-foreground mt-1">
                    Track and manage assign project records.
                </p>
                {/* Header with Status Filter, Search + Add Employee */}
                <div className="flex justify-end items-center mb-4 space-x-2">
                    {/* Status Filter */}
                    {/* <StatusFilter
                        value={zStatusFilter}
                        onChange={zSetStatusFilter}
                        options={statusOptions}
                        placeholder='Filter by status'
                    /> */}

                    {/* Search */}
                    <Input
                        placeholder="Search employee..."
                        onChange={(e) => debouncedHASChange(e.target.value)} // 👈 extract value
                        className="w-64"
                    />
                    {/* Add Employee */}
                    <Button className='cursor-pointer' onClick={(e) => handleCreateUpdateAssignProject(CREATE_ASSIGN_PROJECT, 0)}>{CREATE_ASSIGN_PROJECT}</Button>
                </div>
                {/* Employee Table */}
                <Table>
                    <TableCaption>A list of assign projects</TableCaption>
                    <TblHeader columns={assignProjectColumns} />
                    <AssignProjectTblBody
                        paginatedAssignProject={assProjectList?.AssignProjectList}
                        onRemove={handleRemove}
                        onCreateUpdateAssignProjectList={handleCreateUpdateAssignProject}
                    />
                </Table>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <AssignProjectPagination
                        totalPages={totalPages}
                    />
                </div>
            </div>
            <AssignProjectDialog
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

export default AssignProjectPage
