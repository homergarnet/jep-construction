import * as React from "react"
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

// Example mock users (replace with API later)
const MOCK_USERS = [
    { id: "2", name: "Alice", avatar: "https://i.pravatar.cc/150?u=alice" },
    { id: "3", name: "Bob", avatar: "https://i.pravatar.cc/150?u=bob" },
    { id: "4", name: "Charlie", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "5", name: "libs", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "6", name: "live", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "7", name: "long", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "8", name: "little", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "9", name: "litter", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "10", name: "rome", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "11", name: "lonter", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "12", name: "teriaki", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "13", name: "can do", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "14", name: "dohan", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "15", name: "roda", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "16", name: "soda", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "17", name: "rone", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "18", name: "rin", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: "19", name: "Charlie last", avatar: "https://i.pravatar.cc/150?u=charlie" },
]

export function NewChatSheet({ onCreate }: { onCreate: (user: any) => void }) {
    const [query, setQuery] = React.useState("")
    const results = MOCK_USERS.filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase())
    )

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
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    {/* Scrollable area — 90% height */}
                    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-150px)] pr-2">
                        {results.length === 0 && (
                            <p className="text-sm text-muted-foreground">No results found</p>
                        )}
                        {results.map((u) => (
                            <button
                                key={u.id}
                                onClick={() => {
                                    onCreate(u)
                                    setQuery("")
                                }}
                                className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted w-full text-left"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={u.avatar} />
                                    <AvatarFallback>{u.name[0]}</AvatarFallback>
                                </Avatar>
                                <span>{u.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
