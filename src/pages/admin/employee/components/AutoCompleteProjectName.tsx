import React, { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";
import type { useForm } from "react-hook-form";
import type { AssignProjectFormValues } from "../schema/assignProjectFormSchema";
import useAssignProjectContext from "@/store/assignProject/useAssignProjectContext";
import type { AssignProjectDto, CNamePNameDto } from "@/types/assignProject";
import { useGetProjectIdByCNamePName } from "@/hooks/useProjectManagement";

interface AutoCompleteProjectNameProps {
    items?: CNamePNameDto[];
    formMethods: ReturnType<typeof useForm<AssignProjectFormValues>>;
}

export const AutoCompleteProjectName: React.FC<AutoCompleteProjectNameProps> = ({
    items,
    formMethods
}) => {

    const zEmpList = useAssignProjectContext((state) => state.zEmpList);
    const zProjectId = useAssignProjectContext((state) => state.zProjectId);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
        watch
    } = formMethods;

    const watchCName = watch("clientName");
    const watchPName = watch("projectName");

    const { data: projectIdByCNamePName, isLoading: projectIdByCNamePNameLoading, refetch: refetchProjectIdByCNamePName } = useGetProjectIdByCNamePName({
        cName: watchCName,
        pName: watchPName,
    });

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);


    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return (
            items &&
            items.filter((item) =>
                item.ProjectName.toLowerCase().includes(q))
        );
    }, [items, query]);

    const handleSelect = async (val: string) => {
        setQuery(val);
        setValue("projectName", val, { shouldValidate: true });
        // const { data } = await refetchProjectIdByCNamePName();
        // if (data?.ProjectManagementList?.[0]?.Location) {
        //     setValue("location", data.ProjectManagementList[0].Location, {
        //         shouldValidate: true,
        //     });
        // }
        // console.log("zEmpList: ", zEmpList)
        // const filteredList = zEmpList.filter(
        //     (item) => item.EmployeeNumber?.toLowerCase().includes(val.toLowerCase())
        // );
        // const empObj = filteredList[0];
        // setValue("employeeFullname", empObj.Firstname + " " + empObj.Lastname, { shouldValidate: true });
        setIsOpen(false);
    };

    // ✅ Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const subscription = watch((value) => {
            console.log(value);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        if (zProjectId != 0) {
            setValue("projectId", zProjectId, { shouldValidate: true });
        }
    }, [zProjectId])

    useEffect(() => {
        if (projectIdByCNamePName?.ProjectManagementList?.[0]?.Location) {
            setValue("location", projectIdByCNamePName.ProjectManagementList[0].Location, {
                shouldValidate: true,
            });
        }
    }, [projectIdByCNamePName, setValue]);

    return (
        <div ref={containerRef} className="w-full relative">
            <Input className="h-10" placeholder="Project Name" {...register("projectName")} onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }} autoComplete="off" />
            {errors.projectName && (
                <p className="text-red-500 text-sm">
                    {errors.projectName.message}
                </p>
            )}

            {isOpen && filtered && filtered.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-sm">
                    <Command>
                        <CommandList className="max-h-56 overflow-auto">
                            {filtered.length === 0 ? (
                                <CommandEmpty>No results found.</CommandEmpty>
                            ) : (
                                filtered.map((item) => (
                                    <CommandItem
                                        key={item.Id}
                                        onSelect={() => handleSelect(item.ProjectName)}
                                        className="cursor-pointer"
                                    >
                                        {item.ProjectName}
                                    </CommandItem>
                                ))
                            )}
                        </CommandList>
                    </Command>
                </div>
            )}

            {/* {error && <p className="text-red-500 text-sm mt-1">{error}</p>} */}
        </div>
    );
};
