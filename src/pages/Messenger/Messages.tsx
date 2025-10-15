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
import NewChatSheet from "./NewChatSheet";
import type { Conversation, ConvoRowDto, ConvoRowResponse, CreateUpdateMessageRequest, Message, MessageDto, User } from "@/types/messages";
import useMessageContext from "@/store/message/messageContext";
import { useCreateMessage, useGetConvoRowList, useGetMessageList, useSetReadById } from "@/hooks/useMessage";
import { getJwtUserId } from "@/utils/getJwtRoleId";
import { formatDateToMMDDYYYYhhmmA } from "@/utils/formatDateToMMDDYYYYhhmmA";
import useSwal from "@/hooks/useSwal";
const apiRoot = import.meta.env.VITE_APP_API_ROOT_ENDPOINT;

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

const ConversationRow = ({ c, active, onClick }: { c: ConvoRowDto; active?: boolean; onClick: () => void }) => {

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
    onSetActiveId,
}: {
    activeId: string
    onSetActiveId: (id: string) => void
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
                <NewChatSheet onSetActiveId={onSetActiveId} />
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

                                            zSetConvoUserId(c.ConvoUserId)
                                        },
                                        onError: (error: Error) => { console.log("error: ", error) },
                                    })

                                    onSetActiveId(c.ConvoUserId.toString())
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

const Messages = () => {

    const userId = getJwtUserId() ?? 0;
    const zConvoPage = useMessageContext((state) => state.zConvoPage);
    const zSetConvoPage = useMessageContext((state) => state.zSetConvoPage);
    const zConvoPageSize = useMessageContext((state) => state.zConvoPageSize);
    const zMessagePage = useMessageContext((state) => state.zMessagePage);
    const zSetMessagePage = useMessageContext((state) => state.zSetMessagePage);
    const zMessagePageSize = useMessageContext((state) => state.zMessagePageSize);
    const zMessageFilter = useMessageContext((state) => state.zMessageFilter);
    const zConvoUserId = useMessageContext((state) => state.zConvoUserId);
    const zSetIsConvoChange = useMessageContext((state) => state.zSetIsConvoChange);
    const { showConfirm, showToast } = useSwal();
    const createMessage = useCreateMessage();
    const { data: convoRowList, isLoading: convoRowListLoading } = useGetConvoRowList({
        page: zConvoPage,
        pageSize: zConvoPageSize,
    });

    const { data: messageList, isFetching: messageListLoading } = useGetMessageList({
        keyword: zMessageFilter,
        convoUserId: zConvoUserId,
        orderBy: "DESC",
        page: zMessagePage,
        pageSize: zMessagePageSize,
    });

    const messageListLength = messageList?.TotalRecords ?? 0;

    // const [conversations, setConversations] = useState<Conversation[]>(conversationsSeed)
    const initialActiveId = convoRowList?.ConvoList?.[0]?.ConvoUserId?.toString() ?? "";
    const [activeId, setActiveId] = useState<string>(initialActiveId);
    // const [messagesMap, setMessagesMap] = useState<Record<string, Message[]>>(messagesSeed)
    const [mobileOpen, setMobileOpen] = useState(false)
    const active = convoRowList?.ConvoList.find(c =>
        c.ConvoUserId.toString() === activeId.toString()
    );

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isMaxScroll, setIsMaxScroll] = useState(false);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    // const messages = active ? messagesMap[active.ConvoUserId] || [] : []

    const handleSend = (text: string) => {
        if (!active) return

        let payload: CreateUpdateMessageRequest = {
            UserId: userId,
            SenderId: userId,
            ReceiverId: parseInt(activeId),
            Message: text,

        }

        createMessage.mutate(payload, {
            onSuccess: (res) => {
                let message: MessageDto = {
                    Id: res.MessageList[0].Id,
                    UserId: userId,
                    SenderId: userId,
                    ReceiverId: parseInt(activeId),
                    Message: text,
                    ProfileImage: res.MessageList[0].ProfileImage,
                    IsEnabled: true,
                    DateTimeCreated: res.MessageList[0].DateTimeCreated
                }
                setAllUsers(prev => [...prev, message]);
            },
            onError: (error: Error) => showToast(error.message, "error"),
        });
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

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { zIsConvoChange } = useMessageContext.getState(); // ✅ reads latest value
        const target = e.currentTarget;
        const scrollPercentage =
            (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
        // const isGreaterThan = Math.ceil(messageUserListLength / zPageSize);
        // Detect when scrolling near the top instead of bottom
        if (target.scrollTop <= 50 && !messageListLoading && !isMaxScroll && !zIsConvoChange) {

            zSetMessagePage(zMessagePage + 1); // ✅ go to next page
            if (zMessagePage + 1 === Math.ceil(messageListLength / zMessagePageSize)) {
                setIsMaxScroll(true);
            }
            // Example logic:
            // zSetPage(zPage + 1);
        }
    };

    // trigger after clicking convo
    useEffect(() => {
        setAllUsers([])
        zSetMessagePage(1)
        zSetIsConvoChange(true);
        const timer = setTimeout(() => {
            if (messagesEndRef.current) {

                setIsMaxScroll(false)
                messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
                zSetIsConvoChange(false);
            }
        }, 500); // 👈 delay in ms (tweak 50–150 if needed)

        return () => clearTimeout(timer); // cleanup timeout
    }, [zConvoUserId]);

    useEffect(() => {
        if (messageList?.MessageList) {

            if (zMessagePage === 1) {

                setAllUsers(messageList.MessageList.slice().reverse());// reset messages on convo change
            } else {

                setAllUsers(prev => {
                    const newMessages = messageList.MessageList
                        .filter(newMsg => !prev.some(oldMsg => oldMsg.Id === newMsg.Id))
                        .reverse(); // 👈 reverse here
                    return [...newMessages, ...prev]; // prepend only unique messages
                });

                // prepend older messages
            }
        }

        if (!messageListLoading && messagesEndRef.current) {
            // ✅ wait for DOM render first
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    messagesEndRef.current?.scrollTo({
                        top: messagesEndRef.current.scrollTop + 100, // ✅ add 100px
                        behavior: "smooth",
                    });
                });
            });

        }
    }, [messageList]);


    // useEffect(() => {
    //     if (messageList?.MessageList) {
    //         if (zMessagePage === 1) {
    //             // First page - overwrite
    //             setAllUsers(messageList.MessageList);
    //         } else {
    //             // Next pages - append
    //             setAllUsers(prev => [...prev, ...messageList.MessageList]);
    //         }
    //     }
    // }, [messageList]);


    return (
        <div className="h-[100vh] w-full p-4">
            <Card className="h-full overflow-hidden rounded-2xl">
                <div className="grid h-full grid-cols-1 md:grid-cols-[360px_1fr]">
                    {/* Sidebar (desktop) */}
                    <div className="hidden border-r md:block">
                        <Sidebar
                            activeId={activeId}
                            onSetActiveId={(id) => {

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
                                        onSetActiveId={(id) => {
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
                                    <div
                                        ref={messagesEndRef}
                                        className="h-[calc(85vh-160px)] overflow-auto mx-auto space-y-2 px-3 py-4"
                                        onScroll={handleScroll}
                                    >
                                        <DateDivider label="Today" />
                                        <AnimatePresence initial={false}>
                                            {allUsers.map((msg) => {
                                                const isMine = msg.SenderId === userId
                                                return (
                                                    <motion.div key={msg.Id} layout>
                                                        <MessageBubble msg={msg} isMine={isMine} />
                                                    </motion.div>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </div>

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

export default Messages;


// --- Notes ------------------------------------------------------------------
// • Drop this component into your app and render <Messages />
// • Uses shadcn/ui primitives; ensure you've installed avatar, button, card, input, textarea, dropdown-menu, sheet, tooltip, scroll-area, separator.
// • Tailwind required. Dark mode supported via class strategy.
// • Replace seed data with your API data. Wire onSend to your backend.
// • Keyboard: Enter to send, Shift+Enter for newline.
