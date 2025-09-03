import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users } from 'lucide-react'
import React, { useState } from 'react'

type Employee = {
    id: number
    employeeNumber: string,
    name: string
    contactNumber: string,
    position: string,
    salary: number,
    status: string
}

const initialEmployees: Employee[] = [
    { id: 1, employeeNumber: "12345", name: "John Doe", contactNumber: "09123456789", position: "Software Engineer", salary: 50000, status: "Employed" },
    { id: 2, employeeNumber: "12345", name: "John Doe", contactNumber: "09123456789", position: "Software Engineer", salary: 50000, status: "Terminated" },
    { id: 3, employeeNumber: "12345", name: "John Doe", contactNumber: "09123456789", position: "Software Engineer", salary: 50000, status: "Employed" },
    { id: 4, employeeNumber: "12345", name: "John Doe", contactNumber: "09123456789", position: "Software Engineer", salary: 50000, status: "Employed" },
    { id: 5, employeeNumber: "12345", name: "John Doe", contactNumber: "09123456789", position: "Software Engineer", salary: 50000, status: "Employed" },
    { id: 6, employeeNumber: "12345", name: "John Doe", contactNumber: "09123456789", position: "Software Engineer", salary: 50000, status: "Employed" },
    { id: 7, employeeNumber: "12345", name: "John Doe", contactNumber: "09123456789", position: "Software Engineer", salary: 50000, status: "Employed" },
    { id: 8, employeeNumber: "12345", name: "John Doe", contactNumber: "09123456789", position: "Software Engineer", salary: 50000, status: "Employed" },
]

const EmployeeListPage = () => {

    const [employees, setEmployees] = React.useState<Employee[]>(initialEmployees)
    const [search, setSearch] = React.useState("")
    const [isOpen, setIsOpen] = React.useState(false)

    // Pagination states
    const [page, setPage] = React.useState(1)
    const pageSize = 3

    // Status filter
    const [statusFilter, setStatusFilter] = React.useState<string>("all")

    // Filtering
    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch =
            emp.employeeNumber.toLowerCase().includes(search.toLowerCase()) ||
            emp.name.toLowerCase().includes(search.toLowerCase()) ||
            emp.contactNumber?.toLowerCase().includes(search.toLowerCase())

        const matchesStatus =
            statusFilter === "all" ? true : emp.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const totalPages = Math.ceil(filteredEmployees.length / pageSize)

    const paginatedEmployees = filteredEmployees.slice(
        (page - 1) * pageSize,
        page * pageSize
    )

    const handleAddEmployee = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newEmployee: Employee = {
            id: employees.length + 1,
            employeeNumber: formData.get("employeeNumber")?.toString() || "",
            name: formData.get("name")?.toString() || "",
            contactNumber: formData.get("contactNumber")?.toString() || "",
            position: formData.get("position")?.toString() || "",
            salary: Number(formData.get("salary")) || 0,
            status: formData.get("status")?.toString() || "active",
        }
        setEmployees([...employees, newEmployee])
        setIsOpen(false)
    }

    const handleRemove = (id: number) => {
        setEmployees(employees.filter((emp) => emp.id !== id))
    }

    return (
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Employed">Employed</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="Terminated">Terminated</SelectItem>
                    </SelectContent>
                </Select>

                {/* Search */}
                <Input
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64"
                />

                {/* Add Employee */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Employee</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Employee</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new employee.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddEmployee} className="space-y-3">
                            <Input name="employeeNumber" placeholder="Employee Number" required />
                            <Input name="name" placeholder="Full Name" required />
                            <Input name="contactNumber" placeholder="Contact Number" required />
                            <Input name="position" placeholder="Position" required />
                            <Input name="salary" type="number" placeholder="Salary" required />

                            <Select name="status" defaultValue="active">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="terminated">Terminated</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button type="submit" className="w-full">
                                Save
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Employee Table */}
            <Table>
                <TableCaption>A list of employees</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Employee Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedEmployees.map((emp) => (
                        <TableRow key={emp.id}>
                            <TableCell>{emp.employeeNumber}</TableCell>
                            <TableCell>{emp.name}</TableCell>
                            <TableCell>{emp.contactNumber}</TableCell>
                            <TableCell>{emp.position}</TableCell>
                            <TableCell>{emp.salary}</TableCell>
                            <TableCell>{emp.status}</TableCell>
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

export default EmployeeListPage
