import TblHeader from '@/components/TblHeader'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ADMIN_TYPE_NUM, CREATE_EMP_ATTENDANCE, EDIT_EMP_ATTENDANCE, empAttendanceColumns } from '@/constants/constants'
import { Users } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import EmpAttendanceTblBody from './components/EmpAttendanceTblBody'
import { useGetEmpAttendanceById, useGetEmpAttendanceList, useRemoveEmpAttendance, useUpdateEmpAttendance } from '@/hooks/useEmpAttendance'
import useEmpAttendanceContext from '@/store/employee/empAttendance/empAttendanceContext'
import TblPagination from '@/components/TblPagination'
import { debounce } from 'lodash'
import useSwal from '@/hooks/useSwal'
import { useConfirmDialog } from '@/hooks/useConfirmDialog'
import EmpAttendanceDialog from './components/EmpAttendanceDialog'
import type { EmployeeListFormValues } from './schema/employeeListFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { empAttendanceFormSchema, type EmpAttendanceFormValues } from './schema/empAttendanceFormSchema'
import { useForm, type FieldErrors } from 'react-hook-form'
import type { CreateUpdateEmpAttendanceRequest } from '@/types/empAttendance'
import { getJwtRoleId } from '@/utils/getJwtRoleId'
import EmpAttendancePagination from './components/EmpAttendancePagination'
import EAViewDataDialog from './components/EAViewDataDialog'

const EmployeeAttendancePage = () => {
  const roleId = getJwtRoleId();
  const zSetIsOpenDialog = useEmpAttendanceContext((state) => state.zSetIsOpenDialog);
  const zDialogTitle = useEmpAttendanceContext((state) => state.zDialogTitle);
  const zSetDialogTitle = useEmpAttendanceContext((state) => state.zSetDialogTitle);
  const zPage = useEmpAttendanceContext((state) => state.zPage);
  const zSetPage = useEmpAttendanceContext((state) => state.zSetPage);
  const zPageSize = useEmpAttendanceContext((state) => state.zPageSize);
  const zStatusFilter = useEmpAttendanceContext((state) => state.zStatusFilter);
  const zSetStatusFilter = useEmpAttendanceContext((state) => state.zSetStatusFilter);
  const zEmpAttendanceAEData = useEmpAttendanceContext((state) => state.zEmpAttendanceAEData);

  const [empAttendanceId, setEmpAttendanceId] = useState(0);
  const [empAttendanceIdDupli, setEmpAttendanceIdDupli] = useState(0);
  const [date, setDate] = useState("");
  const { showConfirm, showToast } = useSwal();
  const { confirm, ConfirmDialog } = useConfirmDialog();
  const { data: empAttendanceList, isLoading: empAttendanceLoading } = useGetEmpAttendanceList({
    keyword: zStatusFilter,
    page: zPage,
    pageSize: zPageSize,
  });

  const { data: empAttendanceById, isLoading, refetch } = useGetEmpAttendanceById({
    id: empAttendanceId,
  });

  const updateEmpAttendance = useUpdateEmpAttendance();
  const removeEmpAttendance = useRemoveEmpAttendance();

  const form = useForm<EmpAttendanceFormValues>({
    resolver: zodResolver(empAttendanceFormSchema), // Use Zod for validation
    defaultValues: {
      id: undefined,
      timeInOut: "",
      timeInOutType: "",

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

  const totalRecords = empAttendanceList?.TotalRecords ?? 0;
  const totalPages = Math.ceil(totalRecords / zPageSize);

  const handleSE = (value: string) => {
    console.log("value: ", value);
    zSetStatusFilter(value);
  };

  const debouncedHSEnChange = debounce((value: string) => {
    handleSE(value);
  }, 1500);

  const handleCreateUpdateEmpAttendanceList = useCallback((type: string, id: number) => {

    zSetIsOpenDialog(true);
    zSetDialogTitle(type);

    if (type === EDIT_EMP_ATTENDANCE) {
      setEmpAttendanceId(id);
      setEmpAttendanceIdDupli(id);
      if (empAttendanceIdDupli === id) {
        refetch();
      }

    }
  }, [zSetIsOpenDialog, zSetDialogTitle, empAttendanceIdDupli]);

  const handleTimeInOutTypeChange = useCallback((value: string) => {
    setValue("timeInOutType", value, { shouldValidate: true });
  }, []);


  const handleSubmitForm = useCallback(
    async (data: EmpAttendanceFormValues) => {
      console.log("Form submitted ", data)
      let statusType = zDialogTitle === CREATE_EMP_ATTENDANCE ? "Create" : "Edit"

      if (!isValid) return

      try {
        const ok = await confirm({
          title: "You won't be able to revert this!",
          description: `Are you sure you want to ${statusType}?`,
          confirmLabel: "Yes, Continue",
          cancelLabel: "No",
        })

        if (!ok) return

        let payload: CreateUpdateEmpAttendanceRequest = {
          Id: data.id,
          TimeInOut: data.timeInOut,
          TimeInOutType: data.timeInOutType,
        }

        if (zDialogTitle === CREATE_EMP_ATTENDANCE) {
          // createEmployee.mutate(payload, {
          //   onSuccess: (res) => showToast(res.ApiMessage, "success"),
          //   onError: (error: Error) => showToast(error.message, "error"),
          // })
        } else {
          updateEmpAttendance.mutate(payload, {
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

    removeEmpAttendance.mutate(id, {
      onSuccess: (res) => showToast(res.ApiMessage, "success"),
      onError: (error: Error) => showToast(error.message, "error"),
    })
  }



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // keep only digits

    // Auto-insert slashes
    if (input.length > 2 && input.length <= 4)
      input = `${input.slice(0, 2)}/${input.slice(2)}`;
    else if (input.length > 4)
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4, 8)}`;

    // ✅ Check if it's a valid date (dd/mm/yyyy)
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = input.match(datePattern);

    if (match) {
      const [_, day, month, year] = match.map(Number);
      const date = new Date(year, month - 1, day);

      // Ensure date parts match (e.g. 32/01/2025 → invalid)
      if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      ) {
        console.log("✅ Valid date:", input);
        zSetStatusFilter(input);
      }
    }

    setDate(input);
  };


  //for update modal fields
  useEffect(() => {
    console.log("zEmpAttendanceAEData: ", zEmpAttendanceAEData);
    // Update form values when initialValues changes
    reset(zEmpAttendanceAEData);

  }, [zEmpAttendanceAEData]);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Employee Attendance
          </h2>
          {/* <Button>Export Report</Button> */}
        </div>
        <p className="text-muted-foreground mt-1">
          {roleId === ADMIN_TYPE_NUM ? "Track and manage employee daily attendance records." : "Daily attendance records."}
        </p>
        {/* Wrapper for Date + Search */}
        <div className="flex justify-between items-center mb-4">
          {/* Date Input */}
          <Input
            type="text"
            placeholder="search by dd/mm/yyyy"
            value={date}
            onChange={handleChange}
            maxLength={10}
            className="w-64"
          />
          {/* Search Input */}
          <Input
            placeholder="Search attendance..."
            onChange={(e) => debouncedHSEnChange(e.target.value)}
            className="w-64"
          />
        </div>

        {/* Employee Table */}
        <Table>
          <TableCaption>A list of attendance</TableCaption>
          <TblHeader columns={empAttendanceColumns} headerType="attendance" />
          <EmpAttendanceTblBody
            paginatedAttendance={empAttendanceList?.AttendanceList}
            onRemove={handleRemove}
            onCreateUpdateEmpAttendanceList={handleCreateUpdateEmpAttendanceList}
          />
        </Table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <EmpAttendancePagination
            totalPages={totalPages}
          />
        </div>
      </div >
      <EmpAttendanceDialog
        onTimeInOutTypeChange={handleTimeInOutTypeChange}
        onSubmit={handleSubmitForm}
        onError={handleErrorForm}
        onReset={handleResetValue}
        formMethods={form}
      />
      <EAViewDataDialog />
      {/* Important: must render this once per component */}
      {ConfirmDialog}
    </>


  )
}

export default EmployeeAttendancePage
