import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users } from 'lucide-react'
import React, { useState } from 'react'

type Reviews = {
    id: number
    name: string
    email: string,
    message: string,
    dateTimeCreated: string,

}

const initialEmployees: Reviews[] = [
    {
        id: 1, name: "John Doe 2", email: "myemail@gmail.com", message: "my review", dateTimeCreated: "2023-08-01"
    },
    {
        id: 2, name: "John Doe 2", email: "myemail@gmail.com", message: "my review", dateTimeCreated: "2023-08-01"
    },
    {
        id: 3, name: "John Doe 2", email: "myemail@gmail.com", message: "my review", dateTimeCreated: "2023-08-01"
    },
    {
        id: 4, name: "John Doe 2", email: "myemail@gmail.com", message: "my review", dateTimeCreated: "2023-08-01"
    },
    {
        id: 5, name: "John Doe 2", email: "myemail@gmail.com", message: "my review", dateTimeCreated: "2023-08-01"
    },
    {
        id: 6, name: "John Doe 2", email: "myemail@gmail.com", message: "my review", dateTimeCreated: "2023-08-01"
    },
    {
        id: 7, name: "John Doe 2", email: "myemail@gmail.com", message: "my review", dateTimeCreated: "2023-08-01"
    },
    {
        id: 8, name: "John Doe 2", email: "myemail@gmail.com", message: "my review", dateTimeCreated: "2023-08-01"
    },
];

const Reviews = () => {
    const [employees, setEmployees] = React.useState<Reviews[]>(initialEmployees)
    const [search, setSearch] = React.useState("")
    const [isOpen, setIsOpen] = React.useState(false)

    // Pagination states
    const [page, setPage] = React.useState(1)
    const pageSize = 3

    // Filtering
    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch =
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.email?.toLowerCase().includes(search.toLowerCase())
        return matchesSearch
    })

    const totalPages = Math.ceil(filteredEmployees.length / pageSize)

    const paginatedEmployees = filteredEmployees.slice(
        (page - 1) * pageSize,
        page * pageSize
    )

    const handleRemove = (id: number) => {
        setEmployees(employees.filter((emp) => emp.id !== id))
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Reviews
                </h2>
                {/* <Button>Export Report</Button> */}
            </div>
            <p className="text-muted-foreground mt-1">
                Manage customer feedback records.
            </p>
            {/* Header with Status Filter, Search + Add Employee */}
            <div className="flex justify-end items-center mb-4 space-x-2">
                {/* Search */}
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64"
                />
            </div>
            {/* Employee Table */}
            <Table>
                <TableCaption>A list of employees</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date Time Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedEmployees.map((emp) => (
                        <TableRow key={emp.id}>
                            <TableCell>{emp.name}</TableCell>
                            <TableCell>{emp.email}</TableCell>
                            <TableCell>{emp.message}</TableCell>
                            <TableCell>{emp.dateTimeCreated}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemove(emp.id)}
                                >
                                    Remove
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            />
                        </PaginationItem>

                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={page === i + 1}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default Reviews
