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
  Flag,
} from "lucide-react";

export const employeeSidebar = {
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
      title: "Attendance",
      url: "#",
      icon: Flag,
      isActive: true,
      items: [
        { title: "In", url: "/employee/in" },
        { title: "Out", url: "/employee/out" },
        { title: "List", url: "/employee/in-out-list" },
      ],
    },
    {
      title: "Profile",
      url: "/employee/profile",
      icon: UserPen,
    },
  ],
};
