import { Controller, FormProvider, type useForm } from "react-hook-form";
import type { AssignProjectFormValues } from "../schema/assignProjectFormSchema";
import useAssignProjectContext from "@/store/assignProject/useAssignProjectContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CLIENT_TYPE, CREATE_ASSIGN_PROJECT, EDIT_ASSIGN_PROJECT, EMPLOYEE_TYPE } from "@/constants/constants";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { format } from "date-fns"
import { AutoCompleteEmpNumber } from "./AutoCompleteEmpNumber";
import { useGetEmployeeList } from "@/hooks/useEmployeeList";
import { AutoCompleteClientName } from "./AutoCompleteClientName";
import { AutoCompleteProjectName } from "./AutoCompleteProjectName";
import { useGetCNamePNameList } from "@/hooks/useAssignProject";

interface AssignProjectDialogProps {
    onStatusChange: (status: string) => void;
    onSubmit: (data: AssignProjectFormValues) => void;
    onError?: (error: any) => void;
    onReset: () => void;
    formMethods: ReturnType<typeof useForm<AssignProjectFormValues>>;

}

const AssignProjectDialog: React.FC<AssignProjectDialogProps> = ({
    onStatusChange,
    onSubmit,
    onError,
    onReset,
    formMethods,
}) => {

    const zIsOpenDialog = useAssignProjectContext(
        (state) => state.zIsOpenDialog
    );
    const zSetIsOpenDialog = useAssignProjectContext(
        (state) => state.zSetIsOpenDialog
    );
    const zDialogTitle = useAssignProjectContext((state) => state.zDialogTitle);
    const zSetAssignProjectId = useAssignProjectContext((state) => state.zSetAssignProjectId);
    const clearAssProjectAEData = useAssignProjectContext((state) => state.clearAssProjectAEData);
    const zSetEmpList = useAssignProjectContext((state) => state.zSetEmpList);
    const zUserId = useAssignProjectContext((state) => state.zUserId);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
        watch
    } = formMethods;

    const { data: employeeList, isLoading: empListLoading } = useGetEmployeeList({
        keyword: "",
        accountType: EMPLOYEE_TYPE,
        page: 1,
        pageSize: 1000,
    });

    const { data: clientList, isLoading: clientListLoading } = useGetEmployeeList({
        keyword: "",
        accountType: CLIENT_TYPE,
        page: 1,
        pageSize: 1000,
    });

    const { data: cNamePNameList, isLoading: cNamePNameListLoading } = useGetCNamePNameList({
        keyword: "",
        userId: zUserId,
        page: 1,
        pageSize: 1000,
    });

    useEffect(() => {
        if (employeeList) {
            zSetEmpList(employeeList.UserList); // deep copy
        }
    }, [employeeList]);

    return (
        <Dialog
            open={zIsOpenDialog}
            onOpenChange={(open) => {
                zSetIsOpenDialog(open);
                if (!open) {
                    zSetAssignProjectId(0);
                    clearAssProjectAEData();
                }
            }}
        >
            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle>
                        {zDialogTitle === CREATE_ASSIGN_PROJECT
                            ? CREATE_ASSIGN_PROJECT
                            : EDIT_ASSIGN_PROJECT}
                    </DialogTitle>
                    <DialogDescription>
                        {zDialogTitle === CREATE_ASSIGN_PROJECT
                            ? "Fill in the details to add a assign project."
                            : "Edit the assign project details below."}
                    </DialogDescription>
                </DialogHeader>

                <FormProvider {...formMethods}>
                    <form
                        onSubmit={handleSubmit(onSubmit, onError)}
                        noValidate
                        className="space-y-3"
                    >

                        <Controller
                            name="employeeNumber"
                            control={control}
                            render={({ field }) => (
                                <AutoCompleteEmpNumber
                                    items={employeeList?.UserList}
                                    formMethods={formMethods}
                                />
                            )}
                        />

                        <Input placeholder="Employee Fullname" {...register("employeeFullname")} disabled />
                        {errors.employeeFullname && (
                            <p className="text-red-500 text-sm">
                                {errors.employeeFullname.message}
                            </p>
                        )}

                        <Controller
                            name="clientName"
                            control={control}
                            render={({ field }) => (
                                <AutoCompleteClientName
                                    items={clientList?.UserList}
                                    formMethods={formMethods}
                                />
                            )}
                        />

                        <Controller
                            name="projectName"
                            control={control}
                            render={({ field }) => (
                                <AutoCompleteProjectName
                                    items={cNamePNameList?.CNamePNameList}
                                    formMethods={formMethods}
                                />
                            )}
                        />

                        {/* <Input placeholder="Email" {...register("email")} />
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

                        <Input type="text" placeholder="Address" {...register("address")} />
                        {errors.address && (
                            <p className="text-red-500 text-sm">{errors.address.message}</p>
                        )} */}

                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium">Start date</label>
                            <Input
                                type="date"
                                {...register("startDate")}
                                min={format(new Date(), "yyyy-MM-dd")} // Disable yesterday and past dates
                            />
                            {errors.startDate && (
                                <p className="text-red-500 text-sm">{errors.startDate.message}</p>
                            )}
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label className="text-sm font-medium">End date</label>
                            <Input
                                type="date"
                                {...register("endDate")}
                                min={format(new Date(), "yyyy-MM-dd")} // Disable yesterday and past dates
                            />
                            {errors.endDate && (
                                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
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

export default AssignProjectDialog
