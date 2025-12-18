import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent, JournalPost } from "@/context/SiteContentContext";
import { ImageUpload } from "@/admin/components/ImageUpload";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminJournal = () => {
    const { journalPosts, addJournalPost, updateJournalPost, deleteJournalPost } = useSiteContent();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<JournalPost | null>(null);
    const [formData, setFormData] = useState<Partial<JournalPost>>({});

    const handleOpenDialog = (post?: JournalPost) => {
        if (post) {
            setEditingPost(post);
            setFormData(post);
        } else {
            setEditingPost(null);
            setFormData({});
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPost) {
            updateJournalPost(editingPost.id, formData);
        } else {
            addJournalPost(formData as Omit<JournalPost, "id">);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold">Journal</h1>
                    <p className="text-muted-foreground">Manage your blog posts and stories.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()}>
                            <Plus className="w-4 h-4 mr-2" /> Add Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>{editingPost ? "Edit Post" : "Add New Post"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input id="category" value={formData.category || ""} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Post Image</Label>
                                <ImageUpload value={formData.image} onChange={(value) => setFormData({ ...formData, image: value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea id="excerpt" value={formData.excerpt || ""} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" value={formData.date || ""} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="readTime">Read Time</Label>
                                    <Input id="readTime" value={formData.readTime || ""} onChange={e => setFormData({ ...formData, readTime: e.target.value })} required />
                                </div>
                            </div>
                            <Button type="submit" className="w-full">Save Post</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Published Posts</CardTitle>
                    <CardDescription>All your blog articles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {journalPosts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <img src={post.image} alt={post.title} className="w-10 h-10 object-cover rounded" />
                                    </TableCell>
                                    <TableCell className="font-medium">{post.title}</TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>{post.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(post)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteJournalPost(post.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminJournal;
