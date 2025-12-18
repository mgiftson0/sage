import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSiteContent } from "@/context/SiteContentContext";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminCollections() {
    const { collections, addCollection, updateCollection, deleteCollection } = useSiteContent();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: "", description: "", image: "" });

    const resetForm = () => {
        setFormData({ title: "", description: "", image: "" });
        setEditingId(null);
    };

    const handleEdit = (collection: any) => {
        setFormData({ title: collection.title, description: collection.description, image: collection.image });
        setEditingId(collection.id);
        setIsOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this collection?")) {
            deleteCollection(id);
            toast.success("Collection deleted");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateCollection(editingId, formData);
            toast.success("Collection updated");
        } else {
            addCollection(formData);
            toast.success("Collection created");
        }
        setIsOpen(false);
        resetForm();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Collections</h1>
                <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add Collection</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Collection" : "Add New Collection"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">Image URL</Label>
                                <Input id="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <Button type="submit" className="w-full">{editingId ? "Update" : "Create"}</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Collections</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {collections.map((collection) => (
                                <TableRow key={collection.id}>
                                    <TableCell>
                                        <img src={collection.image} alt={collection.title} className="w-10 h-10 object-cover rounded" />
                                    </TableCell>
                                    <TableCell className="font-medium">{collection.title}</TableCell>
                                    <TableCell>{collection.description}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(collection)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(collection.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {collections.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                        No collections found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
