import React, { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandList, CommandItem, CommandEmpty } from "@/components/ui/command";
import type { UserListDto } from "@/types/clientlist";
import type { useForm } from "react-hook-form";
import type { AssignProjectFormValues } from "../schema/assignProjectFormSchema";
import useAssignProjectContext from "@/store/assignProject/useAssignProjectContext";

interface AutoCompleteEmpNumberProps {
    items?: UserListDto[];
    formMethods: ReturnType<typeof useForm<AssignProjectFormValues>>;
}

export const AutoCompleteEmpNumber: React.FC<AutoCompleteEmpNumberProps> = ({
    items,
    formMethods
}) => {
    const zEmpList = useAssignProjectContext((state) => state.zEmpList);
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
        return items && items.filter((item) => item.EmployeeNumber.toLowerCase().includes(q));
    }, [items, query]);

    const handleSelect = (val: string, userId: number) => {
        setQuery(val);
        setValue("employeeNumber", val, { shouldValidate: true });
        setValue("userId", userId, { shouldValidate: true });
        console.log("zEmpList: ", zEmpList)
        const filteredList = zEmpList.filter(
            (item) => item.EmployeeNumber?.toLowerCase().includes(val.toLowerCase())
        );
        const empObj = filteredList[0];
        setValue("employeeFullname", empObj.Firstname + " " + empObj.Lastname, { shouldValidate: true });

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
            <Input className="h-10" placeholder="Employee Number" {...register("employeeNumber")} onFocus={() => setIsOpen(true)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }} autoComplete="off" />
            {errors.employeeNumber && (
                <p className="text-red-500 text-sm">
                    {errors.employeeNumber.message}
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
                                        onSelect={() => handleSelect(item.EmployeeNumber, item.Id)}
                                        className="cursor-pointer"
                                    >
                                        {item.EmployeeNumber}
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
