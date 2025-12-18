import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSiteContent, Material } from "@/context/SiteContentContext";
import { ImageUpload } from "@/admin/components/ImageUpload";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useState } from "react";

const AdminMaterials = () => {
    const { materials, addMaterial, updateMaterial, deleteMaterial } = useSiteContent();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [formData, setFormData] = useState<Partial<Material>>({});

    const handleOpenDialog = (material?: Material) => {
        if (material) {
            setEditingMaterial(material);
            setFormData(material);
        } else {
            setEditingMaterial(null);
            setFormData({});
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.code) return;

        if (editingMaterial) {
            updateMaterial(editingMaterial.id, formData);
        } else {
            addMaterial(formData as Omit<Material, "id">);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold">Materials</h1>
                    <p className="text-muted-foreground">Manage your fabric and material codes.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => handleOpenDialog()}><Plus className="w-4 h-4 mr-2" /> Add Material</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingMaterial ? "Edit Material" : "Add Material"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Material Name</Label>
                                    <Input value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Code (e.g. M1)</Label>
                                    <Input value={formData.code || ""} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Origin</Label>
                                <Input value={formData.origin || ""} onChange={e => setFormData({ ...formData, origin: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Material Image</Label>
                                <ImageUpload value={formData.image} onChange={(value) => setFormData({ ...formData, image: value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <Button onClick={handleSubmit} className="w-full">Save Material</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Material Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Code</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Origin</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {materials.map((material) => (
                                <TableRow key={material.id}>
                                    <TableCell className="font-medium font-mono text-xs bg-muted p-2 rounded text-center">{material.code}</TableCell>
                                    <TableCell className="font-medium">{material.name}</TableCell>
                                    <TableCell>{material.origin}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(material)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMaterial(material.id)}>
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

export default AdminMaterials;
