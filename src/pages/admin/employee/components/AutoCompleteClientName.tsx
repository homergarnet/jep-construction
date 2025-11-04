import React, { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";
import type { UserListDto } from "@/types/clientlist";
import type { useForm } from "react-hook-form";
import type { AssignProjectFormValues } from "../schema/assignProjectFormSchema";
import useAssignProjectContext from "@/store/assignProject/useAssignProjectContext";

interface AutoCompleteClientNameProps {
    items?: UserListDto[];
    formMethods: ReturnType<typeof useForm<AssignProjectFormValues>>;
}

export const AutoCompleteClientName: React.FC<AutoCompleteClientNameProps> = ({
    items,
    formMethods
}) => {

    const zEmpList = useAssignProjectContext((state) => state.zEmpList);
    const zSetUserId = useAssignProjectContext((state) => state.zSetUserId);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue
    } = formMethods;
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);


    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return (
            items &&
            items.filter((item) =>
                item.Firstname.toLowerCase().includes(q) ||
                item.Lastname.toLowerCase().includes(q) ||
                (`${item.Firstname} ${item.Lastname}`).toLowerCase().includes(q)
            )
        );
    }, [items, query]);

    const handleSelect = (val: string, userId: number) => {
        setQuery(val);
        setValue("clientName", val, { shouldValidate: true });
        setValue("projectName", "", { shouldValidate: true });
        setValue("projectId", 0, { shouldValidate: true });
        zSetUserId(userId);
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

    return (
        <div ref={containerRef} className="w-full relative">
            <Input className="h-10" placeholder="Client Name" {...register("clientName")} onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }} autoComplete="off" />
            {errors.clientName && (
                <p className="text-red-500 text-sm">
                    {errors.clientName.message}
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
                                        onSelect={() => handleSelect(item.Firstname + " " + item.Lastname, item.Id)}
                                        className="cursor-pointer"
                                    >
                                        {item.Firstname + " " + item.Lastname}
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
