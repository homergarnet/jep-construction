import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import { useGetMessageUserList, useSetReadById } from "@/hooks/useMessage"
import useMessageContext from "@/store/message/messageContext"
import { debounce } from "lodash"

const NewChatSheet = ({ onSetActiveId }: { onSetActiveId: (id: string) => void }) => {
    const apiRoot = import.meta.env.VITE_APP_API_ROOT_ENDPOINT;

    const zPage = useMessageContext((state) => state.zPage);
    const zSetPage = useMessageContext((state) => state.zSetPage);
    const zPageSize = useMessageContext((state) => state.zPageSize);
    const zStatusFilter = useMessageContext((state) => state.zStatusFilter);
    const zSetStatusFilter = useMessageContext((state) => state.zSetStatusFilter);
    const zSetConvoUserId = useMessageContext((state) => state.zSetConvoUserId);

    const { data: messageUserList, isLoading: messageUserListLoading } = useGetMessageUserList({
        keyword: zStatusFilter,
        page: zPage,
        pageSize: zPageSize,
    });
    const setReadById = useSetReadById();
    const messageUserListLength = messageUserList?.TotalRecords ?? 0;
    const [isMaxScroll, setIsMaxScroll] = useState(false);
    const [allUsers, setAllUsers] = useState<any[]>([]);

    const handleSearch = (value: string) => {
        console.log("value: ", value);
        zSetStatusFilter(value);
    };

    const debouncedHSChange = debounce((value: string) => {
        handleSearch(value);
    }, 1500);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const scrollPercentage =
            (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
        // const isGreaterThan = Math.ceil(messageUserListLength / zPageSize);
        if (scrollPercentage >= 90 && !messageUserListLoading && !isMaxScroll) {

            zSetPage(zPage + 1); // ✅ go to next page
            if (zPage + 1 === Math.ceil(messageUserListLength / zPageSize)) {
                setIsMaxScroll(true);
            }

        }
    };

    useEffect(() => {
        if (messageUserList?.UserList) {
            if (zPage === 1) {
                // First page - overwrite
                setAllUsers(messageUserList.UserList);
            } else {
                // Next pages - append
                setAllUsers(prev => [...prev, ...messageUserList.UserList]);
            }
        }
    }, [messageUserList]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    New Chat
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-80">
                <SheetHeader>
                    <SheetTitle>Start a new chat</SheetTitle>
                </SheetHeader>

                <div className="mt-4 space-y-3 h-full flex flex-col">
                    <Input
                        placeholder="Search people..."
                        // value={zStatusFilter}
                        onChange={(e) => debouncedHSChange(e.target.value)} // 👈 extract value
                    />

                    {/* Scrollable area — 90% height */}
                    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-150px)] pr-2"
                        onScroll={handleScroll}
                    >
                        {allUsers.length === 0 && !messageUserListLoading && (
                            <p className="text-sm text-muted-foreground">No results found</p>
                        )}

                        {allUsers.map((u) => (
                            <button
                                key={u.Id}
                                onClick={() => {
                                    onSetActiveId(u.Id.toString())
                                    setReadById.mutate(u.Id, {
                                        onSuccess: (res) => {
                                            console.log("res: ", res);
                                            zSetConvoUserId(u.Id)

                                        },
                                        onError: (error: Error) => { console.log("error: ", error) },
                                    })
                                }}
                                className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted w-full text-left"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={apiRoot + u.ProfileImage} />
                                    <AvatarFallback>{u.Firstname}</AvatarFallback>
                                </Avatar>
                                <span>{u.Firstname + " " + u.Lastname}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default NewChatSheet;