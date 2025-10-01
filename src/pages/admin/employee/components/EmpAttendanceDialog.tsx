import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useEmployeeListContext from '@/store/employee/employeeList/employeeListContext';
import React from 'react'
import type { EmployeeListFormValues } from '../schema/employeeListFormSchema';
import { Controller, FormProvider, type useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatWithDecimalNum } from '@/utils/formatWithDecimalNum';
import { CREATE_EMP_ATTENDANCE, CREATE_EMPLOYEE, EDIT_EMP_ATTENDANCE, EDIT_EMPLOYEE } from '@/constants/constants';
import type { EmpAttendanceFormValues } from '../schema/empAttendanceFormSchema';
import useEmpAttendanceContext from '@/store/employee/empAttendance/empAttendanceContext';



interface EmpAttendanceDialogProps {
    onTimeInOutTypeChange: (status: string) => void;
    onSubmit: (data: EmpAttendanceFormValues) => void;
    onError?: (error: any) => void;
    onReset: () => void;
    formMethods: ReturnType<typeof useForm<EmpAttendanceFormValues>>;
}

const EmpAttendanceDialogProps: React.FC<EmpAttendanceDialogProps> = ({
    onTimeInOutTypeChange,
    onSubmit,
    onError,
    onReset,
    formMethods,
}) => {
    const zIsOpenDialog = useEmpAttendanceContext(
        (state) => state.zIsOpenDialog
    );
    const zSetIsOpenDialog = useEmpAttendanceContext(
        (state) => state.zSetIsOpenDialog
    );
    const zDialogTitle = useEmpAttendanceContext((state) => state.zDialogTitle);

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
                    reset(); // clears form
                    onReset(); // external reset callback
                }
            }}
        >
            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>
                        {zDialogTitle === CREATE_EMP_ATTENDANCE
                            ? CREATE_EMP_ATTENDANCE
                            : EDIT_EMP_ATTENDANCE}
                    </DialogTitle>
                    <DialogDescription>
                        {zDialogTitle === CREATE_EMP_ATTENDANCE
                            ? "Fill in the details to add a new attendance."
                            : "Edit the attendance details below."}
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...formMethods}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        noValidate
                        className="space-y-3"
                    >

                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium">Time In/Out</label>
                            <Input
                                type="datetime-local"
                                {...register("timeInOut")}
                            />
                            {errors.timeInOut && (
                                <p className="text-red-500 text-sm">{errors.timeInOut.message}</p>
                            )}
                        </div>
                        {/* ✅ Status Select integrated with RHF */}
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="text-sm font-medium">Time In/Out Type</label>
                            <Controller
                                name="timeInOutType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={(val) => {
                                            field.onChange(val); // update form state
                                            onTimeInOutTypeChange(val); // notify parent
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in">In</SelectItem>
                                            <SelectItem value="out">Out</SelectItem>

                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.timeInOutType && (
                                <p className="text-red-500 text-sm">
                                    {errors.timeInOutType.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit" className="w-full cursor-pointer">
                            Save
                        </Button>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default EmpAttendanceDialogProps
