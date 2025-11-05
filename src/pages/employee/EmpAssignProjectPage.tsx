import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAssProjectList } from "@/hooks/useAssignProject";
import useEmpAssignProjectContext from "@/store/assignProject/useEmpAssignProjectContext";
import { getJwtUserId } from "@/utils/getJwtRoleId";
import { formatDateToMMDDYYYY } from "@/utils/formatDateToMMDDYYYY";

const EmpAssignProjectPage = () => {
    const empUserId = getJwtUserId();
    const zPage = useEmpAssignProjectContext((state) => state.zPage);
    const zSetPage = useEmpAssignProjectContext((state) => state.zSetPage);
    const zPageSize = useEmpAssignProjectContext((state) => state.zPageSize);
    const zStatusFilter = useEmpAssignProjectContext((state) => state.zStatusFilter);

    const { data: assProjectList, isLoading: assProjectListLoading } = useGetAssProjectList({
        keyword: zStatusFilter,
        userId: empUserId,
        page: zPage,
        pageSize: zPageSize,
    });

    return (
        <>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        {/* <Users className="h-6 w-6 text-primary" /> */}
                        Employee Assign Project Page
                    </h2>
                    {/* <Button>Export Report</Button> */}
                </div>
                <p className="text-muted-foreground mt-1">
                    Track employee assign project records.
                </p>
            </div>
            <section className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assProjectList && assProjectList.AssignProjectList.map((item) => (
                        <Card
                            key={item.Id}
                            className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl"
                        >
                            {/* Optional image section */}
                            {/* {item.imageUrl && (
                            <div className="h-40 w-full overflow-hidden">
                                <img
                                src={item.imageUrl}
                                alt={item.ProjectName}
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            )} */}

                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
                                <CardTitle className="text-xl font-semibold text-gray-800">
                                    {item.ProjectName}
                                </CardTitle>
                                <p className="text-sm text-gray-500">{item.ClientName}</p>
                            </CardHeader>

                            <CardContent className="p-4 space-y-2 text-sm text-gray-700">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-600">Position:</span>
                                    <span>{item.Position}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-600">Start:</span>
                                    <span>{formatDateToMMDDYYYY(item.StartDate)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-600">End:</span>
                                    <span>{formatDateToMMDDYYYY(item.EndDate)}</span>
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-end p-4">
                                {/* <Button
                                size="sm"
                                variant="outline"
                                className="hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                View Details
                            </Button> */}
                            </CardFooter>
                        </Card>
                    ))}

                </div>
            </section>
        </>

    );
}

export default EmpAssignProjectPage
