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

export const adminSidebar = {
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
    {
      title: "Employee",
      url: "#",
      icon: IdCardLanyard,
      isActive: true,
      items: [
        { title: "Employee List", url: "/admin/employee-list" },
        { title: "Attendance", url: "/admin/attendance" },
        { title: "Payslip", url: "/admin/payslip" },
      ],
    },
    {
      title: "Project Management",
      url: "/admin/project-management",
      icon: FolderDot,
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: Stars,
    },
    {
      title: "Client Request",
      url: "/admin/client-request",
      icon: GitPullRequest,
    },
    {
      title: "Messages",
      url: "/admin/messages",
      icon: MessageCircle,
    },
    {
      title: "Inventory",
      url: "/admin/inventory",
      icon: SquaresExclude,
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: UserPen,
    },
  ],
};