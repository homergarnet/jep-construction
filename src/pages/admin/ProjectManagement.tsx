import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users } from 'lucide-react'
import React, { useState } from 'react'

type ProjectManagement = {
    id: number
    projectName: string,
    clientName: string,
    startDate: string,
    endDate: string,
    status: string,
    budget: number,
    location: string,
    description: string,
    completionRate: number,
}

const initialEmployees: ProjectManagement[] = [
    { id: 1, projectName: "Project 1", clientName: "Client 1", startDate: "2022-01-01", endDate: "2022-12-31", status: "In Progress", budget: 100000, location: "New York", description: "Description 1", completionRate: 50 },
    { id: 2, projectName: "Project 2", clientName: "Client 2", startDate: "2022-01-01", endDate: "2022-12-31", status: "In Progress", budget: 100000, location: "New York", description: "Description 1", completionRate: 50 },
    { id: 3, projectName: "Project 3", clientName: "Client 3", startDate: "2022-01-01", endDate: "2022-12-31", status: "In Progress", budget: 100000, location: "New York", description: "Description 1", completionRate: 50 },
    { id: 4, projectName: "Project 4", clientName: "Client 4", startDate: "2022-01-01", endDate: "2022-12-31", status: "In Progress", budget: 100000, location: "New York", description: "Description 1", completionRate: 50 },
    { id: 5, projectName: "Project 5", clientName: "Client 5", startDate: "2022-01-01", endDate: "2022-12-31", status: "In Progress", budget: 100000, location: "New York", description: "Description 1", completionRate: 50 },
    { id: 6, projectName: "Project 6", clientName: "Client 6", startDate: "2022-01-01", endDate: "2022-12-31", status: "In Progress", budget: 100000, location: "New York", description: "Description 1", completionRate: 50 },
    { id: 7, projectName: "Project 7", clientName: "Client 7", startDate: "2022-01-01", endDate: "2022-12-31", status: "In Progress", budget: 100000, location: "New York", description: "Description 1", completionRate: 50 },
    { id: 8, projectName: "Project 8", clientName: "Client 8", startDate: "2022-01-01", endDate: "2022-12-31", status: "In Progress", budget: 100000, location: "New York", description: "Description 1", completionRate: 50 },

]

const ProjectManagement = () => {
    const [employees, setEmployees] = React.useState<ProjectManagement[]>(initialEmployees)
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
            emp.projectName.toLowerCase().includes(search.toLowerCase()) ||
            emp.clientName.toLowerCase().includes(search.toLowerCase()) ||
            emp.startDate?.toLowerCase().includes(search.toLowerCase())

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
        const newEmployee: ProjectManagement = {
            id: employees.length + 1,
            projectName: formData.get("projectName")?.toString() || "",
            clientName: formData.get("clientName")?.toString() || "",
            startDate: formData.get("startDate")?.toString() || "",
            endDate: formData.get("endDate")?.toString() || "",
            status: formData.get("status")?.toString() || "",
            budget: Number(formData.get("budget")) || 0,
            location: formData.get("location")?.toString() || "",
            description: formData.get("description")?.toString() || "",
            completionRate: Number(formData.get("completionRate")) || 0,
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
                    Project Management
                </h2>
                {/* <Button>Export Report</Button> */}
            </div>
            <p className="text-muted-foreground mt-1">
                Project management records.
            </p>
            {/* Header with Status Filter, Search + Add Project */}
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
                    placeholder="Search project..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64"
                />

                {/* Add Project */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Project</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Project</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new project.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddEmployee} className="space-y-3">
                            <Input name="projectName" placeholder="Project Name" required />

                            {/* Client Name */}
                            <Select name="clientName" defaultValue="Client 1">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select client" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Client 1">Client 1</SelectItem>
                                    <SelectItem value="Client 2">Client 2</SelectItem>
                                    <SelectItem value="Client 3">Client 3</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* Dates side by side */}
                            <div className="flex space-x-3">
                                <div className="flex-1">
                                    <label className="text-sm font-medium">Start Date</label>
                                    <Input
                                        name="startDate"
                                        type="date"
                                        required
                                        className="text-left [color-scheme:light] appearance-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium">End Date</label>
                                    <Input
                                        name="endDate"
                                        type="date"
                                        required
                                        className="text-left [color-scheme:light] appearance-none"
                                    />
                                </div>
                            </div>
                            {/* Status */}
                            <Select name="status" defaultValue="active">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="terminated">Terminated</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input name="budget" placeholder="Budget" required />
                            <Input name="location" placeholder="Location" required />
                            <Input name="description" placeholder="Description" required />
                            <Input name="completionRate" type="number" placeholder="Completion Rate" required />





                            <Button type="submit" className="w-full">
                                Save
                            </Button>
                        </form>

                    </DialogContent>
                </Dialog>
            </div>

            {/* Employee Table */}
            <Table>
                <TableCaption>A list of project</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Completion Rate (%)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedEmployees.map((emp) => (
                        <TableRow key={emp.id}>
                            <TableCell>{emp.projectName}</TableCell>
                            <TableCell>{emp.clientName}</TableCell>
                            <TableCell>{emp.startDate}</TableCell>
                            <TableCell>{emp.endDate}</TableCell>
                            <TableCell>{emp.status}</TableCell>
                            <TableCell>{emp.budget}</TableCell>
                            <TableCell>{emp.location}</TableCell>
                            <TableCell>{emp.description}</TableCell>
                            <TableCell>
                                <Input key={emp.id} name="completionRate" type="number" value={emp.completionRate} placeholder="Salary" required />
                            </TableCell>
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

export default ProjectManagement
