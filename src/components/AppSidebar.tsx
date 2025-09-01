import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Folder,
    FolderDot,
    Frame,
    GalleryVerticalEnd,
    IdCardLanyard,
    Map,
    MessageCircle,
    PieChart,
    Settings2,
    SquaresExclude,
    SquareTerminal,
    Stars,
    UserPen,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import TeamSwitcher from "./TeamSwitcher"
import NavMain from "./NavMain"
import logo from "@/assets/logo.jpg";
// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Employee",
            url: "#",
            icon: IdCardLanyard,
            isActive: true,
            items: [
                {
                    title: "Employee List",
                    url: "#",
                },
                {
                    title: "Attendance",
                    url: "#",
                },
                {
                    title: "Payslip",
                    url: "#",
                },
            ],
        },
        {
            title: "Project Management",
            url: "#",
            icon: FolderDot,
            // items: [
            //     {
            //         title: "Genesis",
            //         url: "#",
            //     },
            //     {
            //         title: "Explorer",
            //         url: "#",
            //     },
            //     {
            //         title: "Quantum",
            //         url: "#",
            //     },
            // ],
        },
        {
            title: "Reviews",
            url: "#",
            icon: Stars,
            // items: [
            //     {
            //         title: "Introduction",
            //         url: "#",
            //     },
            //     {
            //         title: "Get Started",
            //         url: "#",
            //     },
            //     {
            //         title: "Tutorials",
            //         url: "#",
            //     },
            //     {
            //         title: "Changelog",
            //         url: "#",
            //     },
            // ],
        },
        {
            title: "Messages",
            url: "#",
            icon: MessageCircle,
            // items: [
            //     {
            //         title: "Introduction",
            //         url: "#",
            //     },
            //     {
            //         title: "Get Started",
            //         url: "#",
            //     },
            //     {
            //         title: "Tutorials",
            //         url: "#",
            //     },
            //     {
            //         title: "Changelog",
            //         url: "#",
            //     },
            // ],
        },
        {
            title: "Inventory",
            url: "#",
            icon: SquaresExclude,
            // items: [
            //     {
            //         title: "General",
            //         url: "#",
            //     },
            //     {
            //         title: "Team",
            //         url: "#",
            //     },
            //     {
            //         title: "Billing",
            //         url: "#",
            //     },
            //     {
            //         title: "Limits",
            //         url: "#",
            //     },
            // ],
        },
        {
            title: "Profile",
            url: "#",
            icon: UserPen,
            // items: [
            //     {
            //         title: "General",
            //         url: "#",
            //     },
            //     {
            //         title: "Team",
            //         url: "#",
            //     },
            //     {
            //         title: "Billing",
            //         url: "#",
            //     },
            //     {
            //         title: "Limits",
            //         url: "#",
            //     },
            // ],
        },
    ],
}

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* Logo at the very top */}
                <div className="flex">
                    <img
                        src={logo}
                        alt="App Logo"
                        className="h-10 w-auto"
                    />
                </div>
                {/* <TeamSwitcher teams={data.teams} />
                <Folder /> */}
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            {/* <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter> */}
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar
