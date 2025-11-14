import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableCaption } from '@/components/ui/table'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import { useCreateProjectManagement, useGetProjectManagementById, useGetProjectManagementList, useRemoveProjectManagement, useUpdateProjectManagement } from '@/hooks/useProjectManagement'
import useSwal from '@/hooks/useSwal'
import useProjectManagementContext from '@/store/projectManagement/projectManagementContext'
import { Users } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'
import { useForm, type FieldErrors } from 'react-hook-form'
import { projectManagementFormSchema, type ProjectManagementFormValues } from './schema/projectManagementFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import { ADMIN_TYPE_NUM, CREATE_PROJECT_MANAGEMENT, projectManagementColumns } from '@/constants/constants'
import type { CreateUpdateProjectManagementRequest } from '@/types/projectmanagement'
import TblHeader from '@/components/TblHeader'
import ProjectManagementDialog from './components/ProjectManagementDialog'
import { getJwtRoleId } from '@/utils/getJwtRoleId'
import ReviewDialog from './components/ReviewDialog'
import useReviewContext from '@/store/review/reviewContext'
import PMPagination from './components/PMPagination'
import ProjectManagementCard from './components/ProjectManagementCard'

const ProjectManagementPage = () => {

    const roleId = getJwtRoleId();
    const zSetIsOpenDialog = useProjectManagementContext((state) => state.zSetIsOpenDialog);
    const zSetIsOpenDialog2 = useProjectManagementContext((state) => state.zSetIsOpenDialog2);
    const zDialogTitle = useProjectManagementContext((state) => state.zDialogTitle);
    const zSetDialogTitle = useProjectManagementContext((state) => state.zSetDialogTitle);
    const zProjectManagementAEData = useProjectManagementContext((state) => state.zProjectManagementAEData);
    const zSetprojectManagementAEData = useProjectManagementContext((state) => state.zSetprojectManagementAEData);
    const zReviewAEData = useReviewContext((state) => state.zReviewAEData);
    const zPage = useProjectManagementContext((state) => state.zPage);
    const zSetPage = useProjectManagementContext((state) => state.zSetPage);
    const zPageSize = useProjectManagementContext((state) => state.zPageSize);
    const zStatusFilter = useProjectManagementContext((state) => state.zStatusFilter);
    const zSetStatusFilter = useProjectManagementContext((state) => state.zSetStatusFilter);
    const zProjectManagementId = useProjectManagementContext((state) => state.zProjectManagementId);
    const zSetProjectManagementId = useProjectManagementContext((state) => state.zSetProjectManagementId);
    const zSetReviewId = useProjectManagementContext((state) => state.zSetReviewId);
    const clearReviewAEData = useReviewContext((state) => state.clearReviewAEData);
    const zSetIsCreateReview = useReviewContext((state) => state.zSetIsCreateReview);

    const { showConfirm, showToast } = useSwal();
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const createProjectManagement = useCreateProjectManagement();
    const { data: projectManagementList, isLoading: empListLoading } = useGetProjectManagementList({
        keyword: zStatusFilter,
        page: zPage,
        pageSize: zPageSize,
    });

    const { data: projectManagementById, isLoading, refetch } = useGetProjectManagementById({
        id: zProjectManagementId,
    });

    const updateProjectManagement = useUpdateProjectManagement();
    const removeProjectManagement = useRemoveProjectManagement();

    const form = useForm<ProjectManagementFormValues>({
        resolver: zodResolver(projectManagementFormSchema), // Use Zod for validation
        defaultValues: {
            id: undefined,
            userId: 0,
            projectName: "",
            startDate: new Date(), // or new Date().toISOString().split("T")[0] if you want today's date
            endDate: new Date(), // or new Date().toISOString().split("T")[0] if you want today's date
            // budget: 0,
            location: "",
            description: "",
            // completionStatus: 0,
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

    const totalRecords = projectManagementList?.TotalRecords ?? 0;
    const totalPages = Math.ceil(totalRecords / zPageSize);

    const handlePM = (value: string) => {
        console.log("value: ", value);
        zSetStatusFilter(value);
    };

    const debouncedHPMChange = debounce((value: string) => {
        handlePM(value);
    }, 1500);

    const handleCreateUpdateProjectManagement = useCallback((type: string, id: number) => {

        zSetIsOpenDialog(true);
        zSetDialogTitle(type);
        zSetProjectManagementId(id);

    }, [zSetIsOpenDialog, zSetDialogTitle, zSetProjectManagementId]);

    const handleCreateUpdateReview = useCallback((type: string, projectManagementId: number, reviewId: number) => {
        // always set the createReview to true
        zSetIsCreateReview(true);
        zSetIsOpenDialog2(true);
        zSetDialogTitle(type);
        zSetProjectManagementId(projectManagementId);
        zSetReviewId(reviewId);
    }, [zSetIsCreateReview, zSetIsOpenDialog2, zSetDialogTitle, zSetProjectManagementId, zSetReviewId]);

    const handleClientNameChange = useCallback((value: string) => {
        setValue("userId", parseInt(value), { shouldValidate: true });
    }, [setValue]);


    const handleSubmitForm = useCallback(
        async (data: ProjectManagementFormValues) => {
            console.log("Form submitted ", data)
            let statusType = zDialogTitle === CREATE_PROJECT_MANAGEMENT ? "Create" : "Edit"

            if (!isValid) return

            try {
                const ok = await confirm({
                    title: "You won't be able to revert this!",
                    description: `Are you sure you want to ${statusType}?`,
                    confirmLabel: "Yes, Continue",
                    cancelLabel: "No",
                })

                if (!ok) return

                let payload: CreateUpdateProjectManagementRequest = {
                    Id: zProjectManagementId,
                    UserId: data.userId,
                    ProjectName: data.projectName,
                    StartDate: data.startDate,
                    EndDate: data.endDate,
                    // Budget: data.budget,
                    Location: data.location,
                    Description: data.description,
                    // CompletionStatus: data.completionStatus
                }

                if (zDialogTitle === CREATE_PROJECT_MANAGEMENT) {
                    createProjectManagement.mutate(payload, {
                        onSuccess: (res) => showToast(res.ApiMessage, "success"),
                        onError: (error: Error) => showToast(error.message, "error"),
                    })
                } else {
                    updateProjectManagement.mutate(payload, {
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

    const handleErrorForm = useCallback((errors: FieldErrors<ProjectManagementFormValues>) => {
        console.log("Form Errors: ", errors);
    }, []);

    const handleResetValue = useCallback(() => {
        const values: ProjectManagementFormValues = {
            id: undefined,
            userId: 0,
            projectName: "",
            startDate: new Date(), // or new Date().toISOString().split("T")[0] if you want today's date
            endDate: new Date(), // or new Date().toISOString().split("T")[0] if you want today's date
            // budget: 0,
            location: "",
            description: "",
            // completionStatus: 0,
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

        removeProjectManagement.mutate(id, {
            onSuccess: (res) => showToast(res.ApiMessage, "success"),
            onError: (error: Error) => showToast(error.message, "error"),
        })
    }

    //for update modal fields
    useEffect(() => {
        console.log("zProjectManagementAEData: ", zProjectManagementAEData);
        // Update form values when initialValues changes
        reset(zProjectManagementAEData);

    }, [zProjectManagementAEData]);

    return (
        <>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Project Management
                    </h2>
                    {/* <Button>Export Report</Button> */}
                </div>
                <p className="text-muted-foreground mt-1">
                    Project management records.
                </p>
                {/* Header with Status Filter, Search + Add Project */}
                <div className="flex justify-end items-center mb-4 space-x-2">
                    {/* Search */}
                    <Input
                        placeholder="Search project..."
                        onChange={(e) => debouncedHPMChange(e.target.value)} // 👈 extract value
                        className="w-64"
                    />
                    {/* Add Project Management */}
                    {roleId === ADMIN_TYPE_NUM && <Button className='cursor-pointer' onClick={(e) => handleCreateUpdateProjectManagement(CREATE_PROJECT_MANAGEMENT, 0)}>{CREATE_PROJECT_MANAGEMENT}</Button>}
                </div>
                <ProjectManagementCard
                    paginatedProjectManagements={projectManagementList?.ProjectManagementList}
                    onRemove={handleRemove}
                    onCreateUpdateProjectManagement={handleCreateUpdateProjectManagement}
                    onCreateUpdateReview={handleCreateUpdateReview}
                />
                {/* Employee Table */}
                {/* <Table>
                    <TableCaption>A list of employees</TableCaption>
                    <TblHeader columns={projectManagementColumns} headerType="project management" />
                    <ProjectManagementTblBody
                        paginatedProjectManagements={projectManagementList?.ProjectManagementList}
                        onRemove={handleRemove}
                        onCreateUpdateProjectManagement={handleCreateUpdateProjectManagement}
                        onCreateUpdateReview={handleCreateUpdateReview}
                    />
                </Table> */}
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <PMPagination
                        totalPages={totalPages}
                    />
                </div>
            </div>
            <ProjectManagementDialog
                onClientNameChange={handleClientNameChange}
                onSubmit={handleSubmitForm}
                onError={handleErrorForm}
                onReset={handleResetValue}
                formMethods={form}
            />
            <ReviewDialog
            />
            {/* Important: must render this once per component */}
            {ConfirmDialog}
        </>

    )
}

export default ProjectManagementPage
