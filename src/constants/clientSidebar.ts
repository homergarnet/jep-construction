import {
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  IdCardLanyard,
  FolderDot,
  Stars,
  GitPullRequest,
  MessageCircle,
  SquaresExclude,
  UserPen,
} from "lucide-react";

export const clientSidebar = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd, // component reference
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
    // {
    //   title: "Employee",
    //   url: "#",
    //   icon: IdCardLanyard,
    //   isActive: true,
    //   items: [
    //     { title: "Employee List", url: "/admin/employee-list" },
    //     { title: "Attendance", url: "/admin/attendance" },
    //     { title: "Payslip", url: "/admin/payslip" },
    //   ],
    // },
    {
      title: "My Projects",
      url: "/client/my-projects",
      icon: FolderDot,
    },
    {
      title: "Inventory",
      url: "/client/inventory",
      icon: SquaresExclude,
    },
    {
      title: "Messages",
      url: "/client/messages",
      icon: MessageCircle,
    },
    {
      title: "Profile",
      url: "/client/profile",
      icon: UserPen,
    },
  ],
};
