import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users } from 'lucide-react'
import React, { useState } from 'react'

type Client = {
    id: number
    employeeNumber: string,
    email: string,
    firstName: string,
    lastName: string,
    mobileNumber: string,
    status: string,
    address: string,
    dateOfBirth: string,
}

const initialEmployees: Client[] = [
    { id: 1, employeeNumber: "12345", email: "myemail@gmail.com", firstName: "John", lastName: "Doe", mobileNumber: "09123456789", status: "active", address: "Imus", dateOfBirth: "1990-01-01", },
    { id: 2, employeeNumber: "12345", email: "myemail@gmail.com", firstName: "John", lastName: "Doe", mobileNumber: "09123456789", status: "inactive", address: "Imus", dateOfBirth: "1990-01-01", },
    { id: 3, employeeNumber: "12345", email: "myemail@gmail.com", firstName: "John", lastName: "Doe", mobileNumber: "09123456789", status: "active", address: "Imus", dateOfBirth: "1990-01-01", },
    { id: 4, employeeNumber: "12345", email: "myemail@gmail.com", firstName: "John", lastName: "Doe", mobileNumber: "09123456789", status: "inactive", address: "Imus", dateOfBirth: "1990-01-01", },
    { id: 5, employeeNumber: "12345", email: "myemail@gmail.com", firstName: "John", lastName: "Doe", mobileNumber: "09123456789", status: "active", address: "Imus", dateOfBirth: "1990-01-01", },
    { id: 6, employeeNumber: "12345", email: "myemail@gmail.com", firstName: "John", lastName: "Doe", mobileNumber: "09123456789", status: "inactive", address: "Imus", dateOfBirth: "1990-01-01", },
    { id: 7, employeeNumber: "12345", email: "myemail@gmail.com", firstName: "John", lastName: "Doe", mobileNumber: "09123456789", status: "active", address: "Imus", dateOfBirth: "1990-01-01", },
    { id: 8, employeeNumber: "12345", email: "myemail@gmail.com", firstName: "John", lastName: "Doe", mobileNumber: "09123456789", status: "inactive", address: "Imus", dateOfBirth: "1990-01-01", },
]

const ClientInfo = () => {

    const [employees, setEmployees] = React.useState<Client[]>(initialEmployees)
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
            emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
            emp.mobileNumber?.toLowerCase().includes(search.toLowerCase())

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
        const newEmployee: Client = {
            id: employees.length + 1,
            employeeNumber: formData.get("employeeNumber")?.toString() || "",
            email: formData.get("email")?.toString() || "",
            firstName: formData.get("firstName")?.toString() || "",
            lastName: formData.get("lastName")?.toString() || "",
            mobileNumber: formData.get("mobileNumber")?.toString() || "",
            status: formData.get("status")?.toString() || "active",
            address: formData.get("address")?.toString() || "",
            dateOfBirth: formData.get("dateOfBirth")?.toString() || "",
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
                    Client List Page
                </h2>
                {/* <Button>Export Report</Button> */}
            </div>
            <p className="text-muted-foreground mt-1">
                Track and manage client records.
            </p>
            {/* Header with Status Filter, Search + Add Client */}
            <div className="flex justify-end items-center mb-4 space-x-2">
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>

                {/* Search */}
                <Input
                    placeholder="Search client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64"
                />

                {/* Add Client */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Client</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg w-full"> {/* make dialog wider */}
                        <DialogHeader>
                            <DialogTitle>Add Client</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new client.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleAddEmployee} className="space-y-3 w-full">
                            <Input name="email" placeholder="Email" required className="w-full" />
                            <Input name="firstName" placeholder="First Name" required className="w-full" />
                            <Input name="lastName" placeholder="Last Name" required className="w-full" />
                            <Input name="mobileNumber" placeholder="Mobile Number" required className="w-full" />
                            <Select name="status" defaultValue="active">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input name="address" type="text" placeholder="Address" required className="w-full" />
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium">Birthdate</label>
                                <Input
                                    name="birthDate"
                                    type="date"
                                    required
                                    className="w-full text-left [color-scheme:light] appearance-none"
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Save
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Client Table */}
            <Table>
                <TableCaption>A list of clients</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client Number</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Mobile Number</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Date Of Birth</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedEmployees.map((emp) => (
                        <TableRow key={emp.id}>
                            <TableCell>{emp.employeeNumber}</TableCell>
                            <TableCell>{emp.email}</TableCell>
                            <TableCell>{emp.firstName}</TableCell>
                            <TableCell>{emp.lastName}</TableCell>
                            <TableCell>{emp.mobileNumber}</TableCell>
                            <TableCell>{emp.status}</TableCell>
                            <TableCell>{emp.address}</TableCell>
                            <TableCell>{emp.dateOfBirth}</TableCell>
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

export default ClientInfo
