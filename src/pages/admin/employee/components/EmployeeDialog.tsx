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
    onGenderChange: (gender: string) => void;
    onStatusChange: (status: string) => void;
    onUserTypeChange: (userType: string) => void;
    onSubmit: (data: EmployeeListFormValues) => void;
    onError?: (error: any) => void;
    onReset: () => void;
    formMethods: ReturnType<typeof useForm<EmployeeListFormValues>>;
}

const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
    onGenderChange,
    onStatusChange,
    onUserTypeChange,
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
                        <div className="flex gap-4">
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="email" className="text-sm font-medium">Email</label>
                                <Input id="email" placeholder="" {...register("email")} />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="firstName" className="text-sm font-medium">Firstname</label>
                                <Input id="firstName" {...register("firstname")} />
                                {errors.firstname && (
                                    <p className="text-red-500 text-sm">{errors.firstname.message}</p>
                                )}
                            </div>

                            {/* Lastname */}
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="lastName" className="text-sm font-medium">Lastname</label>
                                <Input id="lastName" {...register("lastname")} />
                                {errors.lastname && (
                                    <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="mobileNumber" className="text-sm font-medium">Mobile Number</label>
                                <Input
                                    id="mobileNumber"
                                    placeholder=""
                                    {...register("mobileNumber")}
                                />
                                {errors.mobileNumber && (
                                    <p className="text-red-500 text-sm">
                                        {errors.mobileNumber.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1 w-full">
                                <label className="text-sm font-medium">Gender</label>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={(val) => {
                                                field.onChange(val); // update form state
                                                onGenderChange(val); // notify parent
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="N/A">Select Gender</SelectItem>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
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

                            {/* Lastname */}
                            <div className="flex flex-col space-y-1 w-full">
                                <label className="text-sm font-medium">Birthdate</label>
                                <Input type="date" {...register("dateOfBirth")} />
                                {errors.dateOfBirth && (
                                    <p className="text-red-500 text-sm">
                                        {errors.dateOfBirth.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="address" className="text-sm font-medium">Address</label>
                                <Input id="address" type="text" placeholder="Address" {...register("address")} />
                                {errors.address && (
                                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                                )}
                            </div>
                        </div>
                        <DialogTitle>
                            Employment Information
                        </DialogTitle>
                        <div className="flex gap-4">
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
                                                <SelectValue placeholder="" />
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
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="position" className="text-sm font-medium">Position</label>
                                <Input id="position" placeholder="" {...register("position")} />
                                {errors.position && (
                                    <p className="text-red-500 text-sm">{errors.position.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="department" className="text-sm font-medium">Department</label>
                                <Input id="department" {...register("department")} />
                                {errors.department && (
                                    <p className="text-red-500 text-sm">{errors.department.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="salary" className="text-sm font-medium">Salary</label>
                                <Controller
                                    name="salary"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder=""
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

                            </div>
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="hourlyRate" className="text-sm font-medium">Hourly Rate</label>
                                <Controller
                                    name="hourlyRate"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="text"
                                            placeholder=""
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
                                {errors.hourlyRate && (
                                    <p className="text-red-500 text-sm">{errors.hourlyRate.message}</p>
                                )}

                                {errors.hourlyRate && (
                                    <p className="text-red-500 text-sm">{errors.hourlyRate.message}</p>
                                )}
                            </div>
                        </div>
                        <DialogTitle>
                            Emergency Contact
                        </DialogTitle>

                        <div className="flex gap-4">
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="emergencyContactName" className="text-sm font-medium">Emergency Contact Name</label>
                                <Input id="emergencyContactName" {...register("emergencyContactName")} />
                                {errors.emergencyContactName && (
                                    <p className="text-red-500 text-sm">{errors.emergencyContactName.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="emergencyRelationship" className="text-sm font-medium">Emergency Relationship</label>
                                <Input id="emergencyRelationship" {...register("emergencyRelationship")} />
                                {errors.emergencyRelationship && (
                                    <p className="text-red-500 text-sm">{errors.emergencyRelationship.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1 w-full">
                                <label htmlFor="emergencyContactNo" className="text-sm font-medium">Emergency Contact No</label>
                                <Input id="emergencyContactNo" {...register("emergencyContactNo")} />
                                {errors.emergencyContactNo && (
                                    <p className="text-red-500 text-sm">{errors.emergencyContactNo.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex flex-col space-y-1 w-full">
                                <label className="text-sm font-medium">Access Per Role</label>
                                <Controller
                                    name="userType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={(val) => {
                                                field.onChange(val); // update form state
                                                onUserTypeChange(val); // notify parent
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="project manager">Project Manager</SelectItem>
                                                <SelectItem value="hr">HR</SelectItem>
                                                <SelectItem value="finance">Finance</SelectItem>
                                                <SelectItem value="foreman">Foreman</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.userType && (
                                    <p className="text-red-500 text-sm">
                                        {errors.userType.message}
                                    </p>
                                )}
                            </div>
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
