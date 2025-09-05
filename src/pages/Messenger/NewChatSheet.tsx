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
                <div className="mt-4 space-y-3">
                    <Input
                        placeholder="Search people..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="space-y-2">
                        {results.length === 0 && (
                            <p className="text-sm text-muted-foreground">No results found</p>
                        )}
                        {results.map((u) => (
                            <button
                                key={u.id}
                                onClick={() => {
                                    onCreate(u) // ✅ create conversation
                                    setQuery("") // clear search
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