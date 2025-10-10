import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Paperclip,
    Send,
    Smile,
    Phone,
    Video,
    MoreVertical,
    Search,
    Plus,
    Check,
    CheckCheck,
    Circle,
    Menu,
    Image as ImageIcon,
    FileText,
    Mic,
    Pin,
    Trash2,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewChatSheet } from "./NewChatSheet";
import type { Conversation, ConvoRowDto, ConvoRowResponse, Message, MessageDto, User } from "@/types/messages";
import useMessageContext from "@/store/message/messageContext";
import { useGetConvoRowList, useGetMessageList, useSetReadById } from "@/hooks/useMessage";
import { getJwtUserId } from "@/utils/getJwtRoleId";
import { formatDateToMMDDYYYYhhmmA } from "@/utils/formatDateToMMDDYYYYhhmmA";
const apiRoot = import.meta.env.VITE_APP_API_ROOT_ENDPOINT;
// --- Sample Data -------------------------------------------------------------
const ME = { id: "me", name: "You", avatar: "https://i.pravatar.cc/100?img=13" };

const conversationsSeed: Conversation[] = [
    {
        id: "c1",
        title: "Team Alpha",
        lastMessage: "Let’s lock scope by EOD.",
        unread: 2,
        participants: [
            { id: "me", name: "You", avatar: ME.avatar, online: true },
            { id: "u2", name: "Maya", avatar: "https://i.pravatar.cc/100?img=5", online: true },
            { id: "u3", name: "Ken", avatar: "https://i.pravatar.cc/100?img=32" },
        ],
    },
    {
        id: "c2",
        title: "Design Squad",
        lastMessage: "Pushed the latest Figma.",
        unread: 0,
        participants: [
            { id: "me", name: "You", avatar: ME.avatar },
            { id: "u4", name: "Isha", avatar: "https://i.pravatar.cc/100?img=20", online: true },
        ],
    },
    {
        id: "c3",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c4",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c5",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c6",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c7",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c8",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c9",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c10",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c11",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c12",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c13",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c14",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c15",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c16",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c17",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
    {
        id: "c18",
        title: "Design Squad",
        participants: [
            ME,
            { id: "4", name: "Jane", avatar: "/jane.png" },
            { id: "5", name: "Mark", avatar: "/mark.png" },
        ],
        lastMessage: "Let’s review the new mockups tomorrow",
        unread: 3, // ✅ unread by default
    },
];

const messagesSeed: Record<string, Message[]> = {
    c1: [
        {
            id: "m1",
            authorId: "u2",
            authorName: "Maya",
            authorAvatar: "https://i.pravatar.cc/100?img=5",
            text: "Morning! Standup in 10?",
            createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
            status: "read",
        },
        {
            id: "m2",
            authorId: "me",
            authorName: "You",
            authorAvatar: ME.avatar,
            text: "Yup, hopping in.",
            createdAt: new Date(Date.now() - 1000 * 60 * 43).toISOString(),
            status: "read",
        },
        {
            id: "m3",
            authorId: "u3",
            authorName: "Ken",
            authorAvatar: "https://i.pravatar.cc/100?img=32",
            imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1000&q=802zz",
            text: "Draft banner – thoughts?",
            createdAt: new Date(Date.now() - 1000 * 60 * 39).toISOString(),
            status: "delivered",
        },
    ],
    c2: [
        {
            id: "m21",
            authorId: "u4",
            authorName: "Isha",
            authorAvatar: "https://i.pravatar.cc/100?img=20",
            text: "Shared the new components.",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            status: "read",
        },
    ],
    c3: [],
};

// --- Helpers ----------------------------------------------------------------
const timeShort = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const classNames = (...args: (string | false | null | undefined)[]) => args.filter(Boolean).join(' ');

// --- UI Pieces ---------------------------------------------------------------
const MessageStatusIcon = ({ status }: { status?: Message["status"] }) => {
    if (!status) return null;
    if (status === "sending") return <Circle className="h-3 w-3" />;
    if (status === "sent") return <Check className="h-4 w-4" />;
    if (status === "delivered") return <CheckCheck className="h-4 w-4" />;
    if (status === "read") return (
        <CheckCheck className="h-4 w-4 text-primary" />
    );
    return null;
}

const MessageBubble = ({ msg, isMine }: { msg: MessageDto; isMine: boolean }) => {
    return (
        <div className={classNames(
            "flex gap-2 items-end",
            isMine ? "justify-end" : "justify-start"
        )}>
            {!isMine && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={apiRoot + msg.ProfileImage} alt={"image"} />
                    <AvatarFallback>{msg.ProfileImage}</AvatarFallback>
                </Avatar>
            )}
            <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className={classNames(
                    "max-w-[72%] rounded-2xl px-3 py-2 shadow-sm",
                    "border",
                    isMine ? "bg-primary text-primary-foreground" : "bg-muted/50"
                )}
            >
                {/* {msg.imageUrl && (
                    <a href={msg.imageUrl} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl">
                        <img src={msg.imageUrl} alt="attachment" className="max-h-64 w-full object-cover" />
                    </a>
                )} */}
                {/* {msg.fileName && (
                    <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{msg.fileName}</span>
                        {msg.fileSize && <span className="text-muted-foreground">· {msg.fileSize}</span>}
                    </div>
                )} */}
                {msg.Message && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.Message}</p>}
                <div className={classNames(
                    "mt-1 flex items-center gap-2 text-[10px]",
                    isMine ? "justify-end" : "justify-start text-muted-foreground"
                )}>
                    <span>{formatDateToMMDDYYYYhhmmA(msg.DateTimeCreated)}</span>
                    {/* {isMine && <MessageStatusIcon status={msg.status} />} */}
                </div>
            </motion.div>
            {isMine && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={apiRoot + msg.ProfileImage} alt={"image"} />
                    <AvatarFallback>{msg.ProfileImage}</AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}

const DateDivider = ({ label }: { label: string }) => {
    return (
        <div className="my-4 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">{label}</span>
            <Separator className="flex-1" />
        </div>
    );
}

const Composer = ({
    onSend,
}: {
    onSend: (text: string) => void;
}) => {
    const [value, setValue] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = () => {
        const v = value.trim();
        if (!v) return;
        setSending(true);
        onSend(v);
        setValue("");
        setTimeout(() => setSending(false), 400);
    }

    return (
        <div className="p-3">
            <Card className="border-muted-foreground/20">
                <CardContent className="p-2">
                    <div className="flex items-end gap-2">
                        <TooltipProvider>
                            <div className="flex items-center gap-1">
                                {/* <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-2xl">
                                            <Paperclip className="h-5 w-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Attach</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-2xl">
                                            <ImageIcon className="h-5 w-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Image</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-2xl">
                                            <Mic className="h-5 w-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Voice</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="rounded-2xl">
                                            <Smile className="h-5 w-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Emoji</TooltipContent>
                                </Tooltip> */}
                            </div>
                        </TooltipProvider>
                        <Textarea
                            placeholder="Write a message…"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="min-h-[48px] resize-none rounded-2xl bg-background focus-visible:ring-0"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                        <Button onClick={handleSend} disabled={sending} className="rounded-2xl">
                            <Send className="mr-2 h-4 w-4" /> Send
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

const ChatHeader = ({ active, onDelete }: { active: ConvoRowDto; onDelete: () => void }) => {

    const online = true;

    return (
        <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={apiRoot + active.ConvoImage} />
                        <AvatarFallback>{active.ConvoName}</AvatarFallback>
                    </Avatar>
                    {online && (
                        <span className="absolute -bottom-0 -right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-background" />
                    )}
                </div>
                <div>
                    <div className="font-medium leading-tight">{active.ConvoName}</div>
                    <div className="text-xs text-muted-foreground">
                        {/* {online ? "Online" : "Last seen recently"} */}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-1">
                {/* <Button variant="ghost" size="icon" className="rounded-2xl">
                    <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-2xl">
                    <Video className="h-5 w-5" />
                </Button> */}
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-2xl">
                            <MoreVertical className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Pin className="mr-2 h-4 w-4" /> Pin conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Search className="mr-2 h-4 w-4" /> Search in chat
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={onDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </div>
        </div>
    );
}

function ConversationRow({ c, active, onClick }: { c: ConvoRowDto; active?: boolean; onClick: () => void }) {

    return (
        <button
            onClick={onClick}
            className={classNames(
                "w-full text-left p-3 rounded-2xl transition-colors",
                active ? "bg-primary/10" : "hover:bg-muted"
            )}
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={apiRoot + c.ConvoImage} />
                    <AvatarFallback>{c.ConvoName} </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-medium">{c.ConvoName}</span>
                        {c.UnreadCount > 0 && (
                            <span className="ml-2 inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                                {c.UnreadCount}
                            </span>
                        )}
                    </div>
                    <div
                        className={classNames(
                            "truncate text-sm",
                            c.UnreadCount > 0 ? "font-semibold text-foreground" : "text-muted-foreground"
                        )}
                    >
                        {c.LastMessage}
                    </div>
                </div>
            </div>
        </button>
    );
}

// ---------- Sidebar ----------

const Sidebar = ({
    activeId,
    setActiveId,
}: {
    activeId: string
    setActiveId: (id: string) => void
}) => {

    const zConvoPage = useMessageContext((state) => state.zConvoPage);
    const zSetConvoUserId = useMessageContext((state) => state.zSetConvoUserId);
    const zConvoPageSize = useMessageContext((state) => state.zConvoPageSize);

    const { data: convoRowList, isLoading: convoRowListLoading } = useGetConvoRowList({
        page: zConvoPage,
        pageSize: zConvoPageSize,
    });

    const setReadById = useSetReadById();


    return (
        <div className="flex h-screen flex-col"> {/* ensure full screen height */}
            <div className="p-2 border-b">
                <NewChatSheet onSetActiveId={setActiveId} />
            </div>
            <ScrollArea className="flex-1 min-h-0"> {/* min-h-0 is important for scroll */}
                <div className="space-y-1 p-2">
                    {convoRowList && convoRowList.ConvoList.map((c) => {

                        return (
                            // for unread logic
                            <ConversationRow
                                key={c.ConvoUserId}
                                c={c}
                                active={c.ConvoUserId.toString() === activeId}
                                onClick={() => {
                                    setReadById.mutate(c.ConvoUserId, {
                                        onSuccess: (res) => {
                                            console.log("res: ", res);
                                            zSetConvoUserId(c.ConvoUserId)
                                        },
                                        onError: (error: Error) => { console.log("error: ", error) },
                                    })

                                    setActiveId(c.ConvoUserId.toString())
                                }}
                            />
                        )
                    }
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}

// ---------- Main Chat App ----------

const ChatAppUI = () => {
    const userId = getJwtUserId() ?? 0;
    const zConvoPage = useMessageContext((state) => state.zConvoPage);
    const zSetConvoPage = useMessageContext((state) => state.zSetConvoPage);
    const zConvoPageSize = useMessageContext((state) => state.zConvoPageSize);

    const zMessagePage = useMessageContext((state) => state.zMessagePage);
    const zMessagePageSize = useMessageContext((state) => state.zMessagePageSize);
    const zMessageFilter = useMessageContext((state) => state.zMessageFilter);
    const zConvoUserId = useMessageContext((state) => state.zConvoUserId);

    const { data: convoRowList, isLoading: convoRowListLoading } = useGetConvoRowList({
        page: zConvoPage,
        pageSize: zConvoPageSize,
    });

    const { data: messageList, isLoading: messageListLoading } = useGetMessageList({
        keyword: zMessageFilter,
        convoUserId: zConvoUserId,
        page: zMessagePage,
        pageSize: zMessagePageSize,
    });

    // const [conversations, setConversations] = useState<Conversation[]>(conversationsSeed)
    const initialActiveId = convoRowList?.ConvoList?.[0]?.ConvoUserId?.toString() ?? "";
    const [activeId, setActiveId] = useState<string>(initialActiveId);
    // const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(messagesSeed)
    const [mobileOpen, setMobileOpen] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)

    const active = convoRowList?.ConvoList.find(c =>
        c.ConvoUserId.toString() === activeId.toString()
    );

    // const messages = active ? messagesMap[active.ConvoUserId] || [] : []

    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [messageList && messageList.MessageList.length]);

    const handleSend = (text: string) => {
        if (!active) return
        const temp: Message = {
            id: Math.random().toString(36).slice(2),
            authorId: ME.id,
            authorName: ME.name,
            authorAvatar: ME.avatar,
            text,
            createdAt: new Date().toISOString(),
            status: "sending",
        }
        // setMessagesMap((m) => ({
        //     ...m,
        //     [active.id]: [...(m[active.id] || []), temp],
        // }))
        // // Simulate server ack
        // setTimeout(() => {
        //     setMessagesMap((m) => ({
        //         ...m,
        //         [active.id]: (m[active.id] || []).map((x) =>
        //             x.id === temp.id ? { ...x, status: "read" } : x
        //         ),
        //     }))
        // }, 800)
    }

    const handleCreateConversation = (user: User) => {
        // const existing = conversations.find((c) =>
        //     c.participants.some((p) => p.id === user.id)
        // )
        // if (existing) {
        //     setActiveId(existing.id)
        //     return
        // }

        // const newConv: Conversation = {
        //     id: Date.now().toString(),
        //     title: user.name,
        //     participants: [ME, user],
        //     lastMessage: null,
        //     unread: 0,
        // }

        // setConversations((prev) => [newConv, ...prev])
        // setActiveId(newConv.id)
        // setMessagesMap((prev) => ({ ...prev, [newConv.id]: [] }))
    }

    const handleDeleteConversation = (id: number) => {
        // setConversations((prev) => prev.filter((c) => c.id !== id))

        // setMessagesMap((prev) => {
        //     const copy = { ...prev }
        //     delete copy[id]
        //     return copy
        // })

        // if (activeId === id) {
        //     const next = conversations.find((c) => c.id !== id)
        //     if (next) {
        //         setActiveId(next.id)
        //     } else {
        //         setActiveId("")
        //     }
        // }
    }

    return (
        <div className="h-[100vh] w-full p-4">
            <Card className="h-full overflow-hidden rounded-2xl">
                <div className="grid h-full grid-cols-1 md:grid-cols-[360px_1fr]">
                    {/* Sidebar (desktop) */}
                    <div className="hidden border-r md:block">
                        <Sidebar
                            activeId={activeId}
                            setActiveId={(id) => {

                                setActiveId(id)
                                // setConversations((prev) =>
                                //     prev.map((conv) =>
                                //         conv.id === id ? { ...conv, unread: 0 } : conv
                                //     )
                                // )
                            }}
                        />
                    </div>

                    {/* Chat area */}
                    <div className="flex h-full flex-col">
                        <div className="flex items-center gap-2 border-b px-2 py-2 md:hidden">
                            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-2xl">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 w-[88vw] sm:w-[420px]">
                                    <SheetHeader className="p-3">
                                        <SheetTitle>Chats</SheetTitle>
                                    </SheetHeader>
                                    {/* for unread logic */}
                                    <Sidebar
                                        activeId={activeId}
                                        setActiveId={(id) => {
                                            setActiveId(id)
                                            // setConversations((prev) =>
                                            //     prev.map((conv) =>
                                            //         conv.id === id ? { ...conv, unread: 0 } : conv
                                            //     )
                                            // )
                                        }}
                                    />
                                </SheetContent>
                            </Sheet>
                            <div className="text-sm font-medium">{active?.ConvoName}</div>
                        </div>

                        {active ? (
                            <>
                                <ChatHeader
                                    active={active}
                                    onDelete={() => handleDeleteConversation(active.ConvoUserId)}
                                />
                                <div className="flex-1 min-h-0">   {/* 👈 allow flex child to shrink */}
                                    <ScrollArea className="h-[calc(85vh-160px)]">

                                        <div
                                            ref={listRef}
                                            className="h-[calc(85vh-160px)] overflow-auto mx-auto space-y-2 px-3 py-4"
                                        >
                                            <DateDivider label="Today" />
                                            Message list
                                            <AnimatePresence initial={false}>
                                                {messageList && messageList.MessageList.map((msg) => {
                                                    const isMine = msg.SenderId === userId
                                                    return (
                                                        <motion.div key={msg.Id} layout>
                                                            <MessageBubble msg={msg} isMine={isMine} />
                                                        </motion.div>
                                                    )
                                                })}
                                            </AnimatePresence>
                                        </div>
                                    </ScrollArea>
                                    <Composer onSend={handleSend} />
                                </div>

                            </>
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                Select a conversation or start a new one
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ChatAppUI;


// --- Notes ------------------------------------------------------------------
// • Drop this component into your app and render <ChatAppUI />
// • Uses shadcn/ui primitives; ensure you've installed avatar, button, card, input, textarea, dropdown-menu, sheet, tooltip, scroll-area, separator.
// • Tailwind required. Dark mode supported via class strategy.
// • Replace seed data with your API data. Wire onSend to your backend.
// • Keyboard: Enter to send, Shift+Enter for newline.
