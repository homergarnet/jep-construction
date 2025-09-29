import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

type Option = {
    label: string;
    value: string;
};

interface StatusFilterProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
}
const StatusFilter: React.FC<StatusFilterProps> = ({
    value,
    onChange,
    options,
    placeholder = "Select option",
    className = "cursor-pointer w-[150px]"
}) => {
    return (
        <>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}

export default StatusFilter
