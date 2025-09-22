import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Users } from 'lucide-react'
import React, { useState } from 'react'

type Inventory = {
    id: number
    clientName: string,
    itemName: string,
    category: string,
    quantity: number,
    unitOfMeasure: string,
    reOrderLevel: number,
    reOrderQuantity: number,
    description: string
}

const initialInventory: Inventory[] = [
    { id: 1, clientName: "Client name", itemName: "Inventory 1", category: "Raw Material", quantity: 10, unitOfMeasure: "PCS", reOrderLevel: 2, reOrderQuantity: 8, description: "Description" },
    { id: 2, clientName: "Client name", itemName: "Inventory 1", category: "Raw Material", quantity: 10, unitOfMeasure: "PCS", reOrderLevel: 2, reOrderQuantity: 8, description: "Description" },
    { id: 3, clientName: "Client name", itemName: "Inventory 1", category: "Raw Material", quantity: 10, unitOfMeasure: "PCS", reOrderLevel: 2, reOrderQuantity: 8, description: "Description" },
    { id: 4, clientName: "Client name", itemName: "Inventory 1", category: "Raw Material", quantity: 10, unitOfMeasure: "PCS", reOrderLevel: 2, reOrderQuantity: 8, description: "Description" },
    { id: 5, clientName: "Client name", itemName: "Inventory 1", category: "Raw Material", quantity: 10, unitOfMeasure: "PCS", reOrderLevel: 2, reOrderQuantity: 8, description: "Description" },
    { id: 6, clientName: "Client name", itemName: "Inventory 1", category: "Raw Material", quantity: 10, unitOfMeasure: "PCS", reOrderLevel: 2, reOrderQuantity: 8, description: "Description" },
    { id: 7, clientName: "Client name", itemName: "Inventory 1", category: "Raw Material", quantity: 10, unitOfMeasure: "PCS", reOrderLevel: 2, reOrderQuantity: 8, description: "Description" },
    { id: 8, clientName: "Client name", itemName: "Inventory 1", category: "Raw Material", quantity: 10, unitOfMeasure: "PCS", reOrderLevel: 2, reOrderQuantity: 8, description: "Description" },

]

const Inventory = () => {
    const [employees, setEmployees] = React.useState<Inventory[]>(initialInventory)
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
            emp.itemName.toLowerCase().includes(search.toLowerCase())

        return matchesSearch
    })

    const totalPages = Math.ceil(filteredEmployees.length / pageSize)

    const paginatedEmployees = filteredEmployees.slice(
        (page - 1) * pageSize,
        page * pageSize
    )

    const handleAddEmployee = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newEmployee: Inventory = {
            id: employees.length + 1,
            clientName: formData.get("clientName")?.toString() || "",
            itemName: formData.get("itemName")?.toString() || "",
            category: formData.get("category")?.toString() || "",
            quantity: Number(formData.get("quantity")) || 0,
            unitOfMeasure: formData.get("unitOfMeasure")?.toString() || "",
            reOrderLevel: Number(formData.get("reOrderLevel")) || 0,
            reOrderQuantity: Number(formData.get("reOrderQuantity")) || 0,
            description: formData.get("description")?.toString() || "",
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
                    Inventory List Page
                </h2>
                {/* <Button>Export Report</Button> */}
            </div>
            <p className="text-muted-foreground mt-1">
                Track and manage inventory records.
            </p>
            {/* Header with Status Filter, Search + Add Inventory */}
            <div className="flex justify-end items-center mb-4 space-x-2">
                {/* Search */}
                <Input
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64"
                />

                {/* Add Inventory */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Add Inventory</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Inventory</DialogTitle>
                            <DialogDescription>
                                Fill in the details to add a new inventory.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddEmployee} className="space-y-3">
                            <Select name="clientName">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select client" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Raw materials">Raw Materials</SelectItem>
                                    <SelectItem value="Finishing materials">Finishing Materials</SelectItem>
                                    <SelectItem value="Concrete & masonry">Concrete & Masonry</SelectItem>
                                    <SelectItem value="Plumbing & electrical">Plumbing & Electrical</SelectItem>
                                    <SelectItem value="Metal Sheets & plates">Metal Sheets & Plates</SelectItem>
                                    <SelectItem value="Welding Supplies">Welding Supplies</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input name="itemName" placeholder="Item Name" required />
                            <Select name="category">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Raw materials">Raw Materials</SelectItem>
                                    <SelectItem value="Finishing materials">Finishing Materials</SelectItem>
                                    <SelectItem value="Concrete & masonry">Concrete & Masonry</SelectItem>
                                    <SelectItem value="Plumbing & electrical">Plumbing & Electrical</SelectItem>
                                    <SelectItem value="Metal Sheets & plates">Metal Sheets & Plates</SelectItem>
                                    <SelectItem value="Welding Supplies">Welding Supplies</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input type="number" name="quantity" placeholder="Quantity" required />
                            <Input name="unitOfMeasure" placeholder="Unit of Measure" required />
                            <Input name="reOrderLevel" placeholder="Re-Order Level" required />
                            <Input name="reOrderQuantity" placeholder="Re-Order Quantity" required />
                            <Input name="descriptionNotes" placeholder="Description/Notes" required />
                            <Button type="submit" className="w-full">
                                Save
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Inventory Table */}
            <Table>
                <TableCaption>A list of inventory</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Inventory ID</TableHead>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Of Measure</TableHead>
                        <TableHead>RE-Order Level</TableHead>
                        <TableHead>RE-Order Quantity</TableHead>
                        <TableHead>Description/Notes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedEmployees.map((emp) => (
                        <TableRow key={emp.id}>
                            <TableCell>{emp.id}</TableCell>
                            <TableCell>{emp.clientName}</TableCell>
                            <TableCell>{emp.itemName}</TableCell>
                            <TableCell>{emp.category}</TableCell>
                            <TableCell>{emp.quantity}</TableCell>
                            <TableCell>{emp.unitOfMeasure}</TableCell>
                            <TableCell>{emp.reOrderLevel}</TableCell>
                            <TableCell>{emp.reOrderQuantity}</TableCell>
                            <TableCell>{emp.description}</TableCell>
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

export default Inventory
