import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import React from 'react'

import { Controller, FormProvider, type useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatWithDecimalNum } from '@/utils/formatWithDecimalNum';
import { CLIENT_TYPE, CREATE_EMPLOYEE, CREATE_PROJECT_MANAGEMENT, EDIT_EMPLOYEE, EDIT_PROJECT_MANAGEMENT } from '@/constants/constants';
import useProjectManagementContext from '@/store/projectManagement/projectManagementContext';
import type { ProjectManagementFormValues } from '../schema/projectManagementFormSchema';
import { useGetEmployeeList } from '@/hooks/useEmployeeList';



interface ProjectManagementDialogProps {
    onClientNameChange: (userId: string) => void;
    onSubmit: (data: ProjectManagementFormValues) => void;
    onError?: (error: any) => void;
    onReset: () => void;
    formMethods: ReturnType<typeof useForm<ProjectManagementFormValues>>;
}

const ProjectManagementDialog: React.FC<ProjectManagementDialogProps> = ({
    onClientNameChange,
    onSubmit,
    onError,
    onReset,
    formMethods,
}) => {

    const { data: clientList, isLoading: empListLoading } = useGetEmployeeList({
        keyword: "",
        accountType: CLIENT_TYPE,
        page: 1,
        pageSize: 10000,
    });

    const zIsOpenDialog = useProjectManagementContext(
        (state) => state.zIsOpenDialog
    );
    const zSetIsOpenDialog = useProjectManagementContext(
        (state) => state.zSetIsOpenDialog
    );
    const zDialogTitle = useProjectManagementContext((state) => state.zDialogTitle);
    const zSetProjectManagementId = useProjectManagementContext((state) => state.zSetProjectManagementId);
    const clearProjectManagementAEData = useProjectManagementContext((state) => state.clearProjectManagementAEData);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = formMethods;

    return (
        <Dialog
            open={zIsOpenDialog}
            onOpenChange={(open) => {
                zSetIsOpenDialog(open);
                if (!open) {
                    zSetProjectManagementId(0);
                    clearProjectManagementAEData();
                }
            }}
        >
            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>
                        {zDialogTitle === CREATE_PROJECT_MANAGEMENT
                            ? CREATE_PROJECT_MANAGEMENT
                            : EDIT_PROJECT_MANAGEMENT}
                    </DialogTitle>
                    <DialogDescription>
                        {zDialogTitle === CREATE_PROJECT_MANAGEMENT
                            ? "Fill in the details to add a new project management."
                            : "Edit the project management details below."}
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...formMethods}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        noValidate
                        className="space-y-3"
                    >
                        <Input placeholder="Project Name" {...register("projectName")} />
                        {errors.projectName && (
                            <p className="text-red-500 text-sm">{errors.projectName.message}</p>
                        )}

                        {/* ✅ UserId Select */}
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="text-sm font-medium">Client Name</label>
                            <Controller
                                name="userId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value?.toString() ?? ""}
                                        onValueChange={(val) => {
                                            field.onChange(val); // update form state
                                            onClientNameChange(val); // notify parent
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select client" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clientList && clientList.UserList.map((client) => (
                                                <SelectItem
                                                    key={client.Id}
                                                    value={client.Id.toString()}
                                                >
                                                    {client.Firstname} {client.Lastname} {/* or Firstname + Lastname if separate */}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.userId && (
                                <p className="text-red-500 text-sm">
                                    {errors.userId.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium">Start Date</label>
                            <Input type="date" {...register("startDate")} />
                            {errors.startDate && (
                                <p className="text-red-500 text-sm">
                                    {errors.startDate.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium">End Date</label>
                            <Input type="date" {...register("endDate")} />
                            {errors.endDate && (
                                <p className="text-red-500 text-sm">
                                    {errors.endDate.message}
                                </p>
                            )}
                        </div>

                        <Controller
                            name="budget"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Budget"
                                    value={
                                        field.value !== undefined && field.value !== null
                                            ? formatWithDecimalNum(field.value.toString(), 2) // show formatted value
                                            : ""
                                    }
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/,/g, ""); // strip commas
                                        const num = parseFloat(raw);

                                        // store as number (decimal) in form state
                                        field.onChange(isNaN(num) ? null : num);
                                    }}
                                />
                            )}
                        />
                        {errors.budget && (
                            <p className="text-red-500 text-sm">{errors.budget.message}</p>
                        )}

                        {errors.budget && (
                            <p className="text-red-500 text-sm">{errors.budget.message}</p>
                        )}

                        <Input placeholder="Location" {...register("location")} />
                        {errors.location && (
                            <p className="text-red-500 text-sm">
                                {errors.location.message}
                            </p>
                        )}

                        <textarea
                            placeholder="Description"
                            {...register("description")}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}

                        <Input
                            type="number"
                            placeholder="Completion Status"
                            {...register("completionStatus", { valueAsNumber: true })}
                        />

                        <Button type="submit" className="w-full cursor-pointer">
                            Save
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectManagementDialog
