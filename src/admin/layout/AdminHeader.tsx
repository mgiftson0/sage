import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function AdminHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-1 items-center gap-4 md:gap-8">
                <div className="flex items-center gap-2 mr-auto">
                    <span className="font-display text-xl font-bold tracking-wide">AFIDES</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest border-l pl-2 ml-2">Admin</span>
                </div>

                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-secondary/50"
                        />
                    </div>
                </form>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                </Button>
            </div>
        </header>
    );
}
