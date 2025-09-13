import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Folder,
    FolderDot,
    Frame,
    GalleryVerticalEnd,
    GitPullRequest,
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
import { adminSidebar } from "@/constants/adminSidebar";
import { getJwtRoleId } from "@/utils/getJwtRoleId";
import { clientSidebar } from "@/constants/clientSidebar";
import { employeeSidebar } from "@/constants/employeeSidebar";
import { ADMIN_ROLE_ID, CLIENT_ROLE_ID } from "@/constants/constants";
// This is sample data.
const roleId = getJwtRoleId();
const data = roleId === ADMIN_ROLE_ID ? adminSidebar : roleId === CLIENT_ROLE_ID ? employeeSidebar : clientSidebar;

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
