import AppSidebar from '@/components/AppSidebar'
import Header from '@/components/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full"> {/* ✅ Full width layout */}
                <AppSidebar />

                {/* ✅ Main content column */}
                <div className="flex flex-1 flex-col">
                    <Header />

                    {/* ✅ Scrollable page content area */}
                    <div className="flex-1 overflow-auto p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default Layout;


