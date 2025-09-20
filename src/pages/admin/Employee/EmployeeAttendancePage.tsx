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
  timeIn: string,
  timeOut: string,
}

const initialEmployees: Employee[] = [
  { id: 1, employeeNumber: "12345", name: "John Doe", timeIn: "09:40AM", timeOut: "05:20PM"},
  { id: 2, employeeNumber: "12345", name: "John Doe", timeIn: "09:40AM", timeOut: "05:20PM"},
  { id: 3, employeeNumber: "12345", name: "John Doe", timeIn: "09:40AM", timeOut: "05:20PM"},
  { id: 4, employeeNumber: "12345", name: "John Doe", timeIn: "09:40AM", timeOut: "05:20PM"},
  { id: 5, employeeNumber: "12345", name: "John Doe", timeIn: "09:40AM", timeOut: "05:20PM"},
  { id: 6, employeeNumber: "12345", name: "John Doe", timeIn: "09:40AM", timeOut: "05:20PM"},
  { id: 7, employeeNumber: "12345", name: "John Doe", timeIn: "09:40AM", timeOut: "05:20PM"},
  { id: 8, employeeNumber: "12345", name: "John Doe", timeIn: "09:40AM", timeOut: "05:20PM"},
]
const EmployeeAttendancePage = () => {

  const [employees, setEmployees] = React.useState<Employee[]>(initialEmployees)
  const [search, setSearch] = React.useState("")

  // Pagination states
  const [page, setPage] = React.useState(1)
  const pageSize = 3

  // Filtering
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.employeeNumber.toLowerCase().includes(search.toLowerCase()) ||
      emp.name.toLowerCase().includes(search.toLowerCase())
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
          Employee Attendance
        </h2>
        {/* <Button>Export Report</Button> */}
      </div>
      <p className="text-muted-foreground mt-1">
        Track and manage employee daily attendance records.
      </p>

      {/* Header with Status Filter, Search + Add Employee */}
      <div className="flex justify-end items-center mb-4 space-x-2">
        {/* Search */}
        <Input
          placeholder="Search employee..."
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
            <TableHead>Employee Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Time In</TableHead>
            <TableHead>Time Out</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEmployees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.employeeNumber}</TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.timeIn}</TableCell>
              <TableCell>{emp.timeOut}</TableCell>
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
    </div >
  )
}

export default EmployeeAttendancePage
