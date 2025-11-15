import { Input } from '@/components/ui/input'
import { Table, TableCaption } from '@/components/ui/table'
import { Users } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import StatusFilter from '../../../components/StatusFilter'
import EmployeeTblBody from './components/EmployeeTblBody'
import TblPagination from '@/components/TblPagination'
import TblHeader from '@/components/TblHeader'
import { CREATE_EMPLOYEE, EDIT_EMPLOYEE, EMPLOYEE_TYPE, employeeColumns, statusOptions } from '@/constants/constants'
import type { CreateUpdateEmployeeRequest } from '@/types/employeelist'
import EmployeeDialog from './components/EmployeeDialog'
import { employeeListFormSchema, type EmployeeListFormValues } from './schema/employeeListFormSchema'
import useSwal from '@/hooks/useSwal'
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import useEmployeeListContext from '@/store/employee/employeeList/employeeListContext'
import { Button } from '@/components/ui/button'
import { useCreateEmployee, useGetEmployeeById, useGetEmployeeList, useRemoveEmployee, useUpdateEmployee } from '@/hooks/useEmployeeList'
import { debounce } from 'lodash'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import EmpListPagination from './components/EmpListPagination'

const EmployeeListPage = () => {

    const zSetIsOpenDialog = useEmployeeListContext((state) => state.zSetIsOpenDialog);
    const zDialogTitle = useEmployeeListContext((state) => state.zDialogTitle);
    const zSetDialogTitle = useEmployeeListContext((state) => state.zSetDialogTitle);
    const zEmpListAEData = useEmployeeListContext((state) => state.zEmpListAEData);
    const zSetEmpListAEData = useEmployeeListContext((state) => state.zSetEmpListAEData);
    const zPage = useEmployeeListContext((state) => state.zPage);
    const zSetPage = useEmployeeListContext((state) => state.zSetPage);
    const zPageSize = useEmployeeListContext((state) => state.zPageSize);
    const zStatusFilter = useEmployeeListContext((state) => state.zStatusFilter);
    const zSetStatusFilter = useEmployeeListContext((state) => state.zSetStatusFilter);
    const [empId, setEmpId] = useState(0);
    const [empIdDupli, setEmpIdDupli] = useState(0);
    const { showConfirm, showToast } = useSwal();
    const { confirm, ConfirmDialog } = useConfirmDialog();
    const createEmployee = useCreateEmployee();
    const { data: employeeList, isLoading: empListLoading } = useGetEmployeeList({
        keyword: zStatusFilter,
        accountType: "workers",
        page: zPage,
        pageSize: zPageSize,
    });

    const { data: employeeById, isLoading, refetch } = useGetEmployeeById({
        id: empId,
    });

    const updateEmployee = useUpdateEmployee();
    const removeEmployee = useRemoveEmployee();

    const form = useForm<EmployeeListFormValues>({
        resolver: zodResolver(employeeListFormSchema), // Use Zod for validation
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
            gender: "",
            department: "",
            hourlyRate: 0,
            emergencyContactName: "",
            emergencyRelationship: "",
            emergencyContactNo: "",
            dateOfBirth: new Date(), // or new Date().toISOString().split("T")[0] if you want today's date
            userType: "",
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

    const totalRecords = employeeList?.TotalRecords ?? 0;
    const totalPages = Math.ceil(totalRecords / zPageSize);

    const handleEL = (value: string) => {
        console.log("value: ", value);
        zSetStatusFilter(value);
    };

    const debouncedHELChange = debounce((value: string) => {
        handleEL(value);
    }, 1500);

    const handleCreateUpdateEmployeeList = useCallback((type: string, id: number) => {

        zSetIsOpenDialog(true);
        zSetDialogTitle(type);

        if (type === EDIT_EMPLOYEE) {
            setEmpId(id);
            setEmpIdDupli(id);
            if (empIdDupli === id) {
                refetch();
            }

        }
    }, [zSetIsOpenDialog, zSetDialogTitle, empIdDupli]);

    const handleGenderChange = useCallback((value: string) => {
        if (value !== "N/A")
            setValue("gender", value, { shouldValidate: true });
    }, []);

    const handleStatusChange = useCallback((value: string) => {
        setValue("status", value, { shouldValidate: true });
    }, []);

    const handleUserTypeChange = useCallback((value: string) => {
        setValue("userType", value, { shouldValidate: true });
    }, []);


    const handleSubmitForm = useCallback(
        async (data: EmployeeListFormValues) => {
            console.log("Form submitted ", data)
            let statusType = zDialogTitle === CREATE_EMPLOYEE ? "Create" : "Edit"

            if (!isValid) return

            try {
                const ok = await confirm({
                    title: "You won't be able to revert this!",
                    description: `Are you sure you want to ${statusType}?`,
                    confirmLabel: "Yes, Continue",
                    cancelLabel: "No",
                })

                if (!ok) return

                let payload: CreateUpdateEmployeeRequest = {
                    Id: data.id,
                    Email: data.email,
                    Firstname: data.firstname,
                    Lastname: data.lastname,
                    MobileNumber: data.mobileNumber,
                    Position: data.position,
                    Salary: data.salary,
                    Status: data.status,
                    Address: data.address,
                    Gender: data.gender,
                    Department: data.department,
                    HourlyRate: data.hourlyRate ?? 0,
                    EmergencyContactName: data.emergencyContactName,
                    EmergencyRelationship: data.emergencyRelationship,
                    EmergencyContactNo: data.emergencyContactNo,
                    UserType: data.userType,
                    DateOfBirth: data.dateOfBirth,
                }

                if (zDialogTitle === CREATE_EMPLOYEE) {
                    createEmployee.mutate(payload, {

                        onSuccess: (res) => showToast(res.ApiMessage, "success"),
                        onError: (error: any) => {
                            console.log("error: ", error.response.data.ApiMessage)
                            showToast(error.response.data.ApiMessage, "error")
                        },
                    })
                } else {
                    updateEmployee.mutate(payload, {
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

    const handleErrorForm = useCallback((errors: FieldErrors<EmployeeListFormValues>) => {
        console.log("Form Errors: ", errors);
    }, []);

    const handleResetValue = useCallback(() => {
        const values: EmployeeListFormValues = {
            email: "",
            firstname: "",
            lastname: "",
            mobileNumber: "",
            position: "",
            salary: 0, // must be a number
            status: "",
            address: "",
            gender: "",
            department: "",
            hourlyRate: 0,
            emergencyContactName: "",
            emergencyRelationship: "",
            emergencyContactNo: "",
            dateOfBirth: new Date(),
            userType: "",
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

        removeEmployee.mutate(id, {
            onSuccess: (res) => showToast(res.ApiMessage, "success"),
            onError: (error: Error) => showToast(error.message, "error"),
        })
    }

    //for update modal fields
    useEffect(() => {
        console.log("zEmpListAEData: ", zEmpListAEData);
        // Update form values when initialValues changes
        reset(zEmpListAEData);

    }, [zEmpListAEData]);

    return (
        <>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Employee List Page
                    </h2>
                    {/* <Button>Export Report</Button> */}
                </div>
                <p className="text-muted-foreground mt-1">
                    Track and manage employee records.
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
                        onChange={(e) => debouncedHELChange(e.target.value)} // 👈 extract value
                        className="w-64"
                    />
                    {/* Add Employee */}
                    <Button className='cursor-pointer' onClick={(e) => handleCreateUpdateEmployeeList(CREATE_EMPLOYEE, 0)}>{CREATE_EMPLOYEE}</Button>


                </div>

                {/* Employee Table */}
                <Table>
                    <TableCaption>A list of employees</TableCaption>
                    <TblHeader columns={employeeColumns} />
                    <EmployeeTblBody
                        paginatedEmployees={employeeList?.UserList}
                        onRemove={handleRemove}
                        onCreateUpdateEmployeeList={handleCreateUpdateEmployeeList}
                    />
                </Table>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <EmpListPagination
                        totalPages={totalPages}
                    />
                </div>
            </div>
            <EmployeeDialog
                onGenderChange={handleGenderChange}
                onStatusChange={handleStatusChange}
                onUserTypeChange={handleUserTypeChange}
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

export default EmployeeListPage
