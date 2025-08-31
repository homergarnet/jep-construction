import AppSidebar from '@/components/AppSidebar'
import Header from '@/components/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main className="flex-1">
                <Header />

                <>
                    {/* {children} */}
                    <Outlet />
                </>
            </main>
        </SidebarProvider>
    );
}

export default Layout
