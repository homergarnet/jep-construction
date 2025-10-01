import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useEmployeeListContext from '@/store/employee/employeeList/employeeListContext';
import React from 'react'
import type { EmployeeListFormValues } from '../schema/employeeListFormSchema';
import { Controller, FormProvider, type useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatWithDecimalNum } from '@/utils/formatWithDecimalNum';
import { CREATE_EMPLOYEE, EDIT_EMPLOYEE } from '@/constants/constants';



interface EmployeeDialogProps {
    onStatusChange: (status: string) => void;
    onSubmit: (data: EmployeeListFormValues) => void;
    onError?: (error: any) => void;
    onReset: () => void;
    formMethods: ReturnType<typeof useForm<EmployeeListFormValues>>;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
    onStatusChange,
    onSubmit,
    onError,
    onReset,
    formMethods,
}) => {
    const zIsOpenDialog = useEmployeeListContext(
        (state) => state.zIsOpenDialog
    );
    const zSetIsOpenDialog = useEmployeeListContext(
        (state) => state.zSetIsOpenDialog
    );
    const zDialogTitle = useEmployeeListContext((state) => state.zDialogTitle);

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
                        {zDialogTitle === CREATE_EMPLOYEE
                            ? CREATE_EMPLOYEE
                            : EDIT_EMPLOYEE}
                    </DialogTitle>
                    <DialogDescription>
                        {zDialogTitle === CREATE_EMPLOYEE
                            ? "Fill in the details to add a new employee."
                            : "Edit the employee details below."}
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...formMethods}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        noValidate
                        className="space-y-3"
                    >
                        <Input placeholder="Email" {...register("email")} />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}

                        <Input placeholder="Firstname" {...register("firstname")} />
                        {errors.firstname && (
                            <p className="text-red-500 text-sm">
                                {errors.firstname.message}
                            </p>
                        )}

                        <Input placeholder="Lastname" {...register("lastname")} />
                        {errors.lastname && (
                            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                        )}

                        <Input
                            placeholder="Mobile Number"
                            {...register("mobileNumber")}
                        />
                        {errors.mobileNumber && (
                            <p className="text-red-500 text-sm">
                                {errors.mobileNumber.message}
                            </p>
                        )}

                        <Input placeholder="Position" {...register("position")} />
                        {errors.position && (
                            <p className="text-red-500 text-sm">{errors.position.message}</p>
                        )}

                        <Controller
                            name="salary"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    placeholder="Salary"
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
                        {errors.salary && (
                            <p className="text-red-500 text-sm">{errors.salary.message}</p>
                        )}

                        {errors.salary && (
                            <p className="text-red-500 text-sm">{errors.salary.message}</p>
                        )}

                        {/* ✅ Status Select integrated with RHF */}
                        <div className="flex flex-col space-y-1 w-full">
                            <label className="text-sm font-medium">Status</label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={(val) => {
                                            field.onChange(val); // update form state
                                            onStatusChange(val); // notify parent
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="terminated">Terminated</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.status && (
                                <p className="text-red-500 text-sm">
                                    {errors.status.message}
                                </p>
                            )}
                        </div>

                        <Input type="text" placeholder="Address" {...register("address")} />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )}

                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium">Birthdate</label>
                            <Input type="date" {...register("dateOfBirth")} />
                            {errors.dateOfBirth && (
                                <p className="text-red-500 text-sm">
                                    {errors.dateOfBirth.message}
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

export default EmployeeDialog
