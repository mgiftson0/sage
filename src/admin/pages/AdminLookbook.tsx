import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent, LookbookSeason } from "@/context/SiteContentContext";
import { ImageUpload } from "@/admin/components/ImageUpload";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AdminLookbook = () => {
    const { lookbookSeasons, addLookbookSeason, updateLookbookSeason, deleteLookbookSeason } = useSiteContent();
    // For simplicity in this demo, we'll just edit the first season found, or list them.
    // A full implementation would allow adding/removing seasons.

    // We will build a UI to edit the FIRST season for now to keep it manageable, 
    // or loop through them.

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newSeason, setNewSeason] = useState<Partial<LookbookSeason>>({ images: [] });

    const handleImageUpdate = (seasonId: string, imageId: number, field: string, value: string) => {
        const season = lookbookSeasons.find(s => s.id === seasonId);
        if (!season) return;

        const updatedImages = season.images.map(img =>
            img.id === imageId ? { ...img, [field]: value } : img
        );

        updateLookbookSeason(seasonId, { images: updatedImages });
    };

    const handleTextUpdate = (seasonId: string, field: keyof LookbookSeason, value: string) => {
        updateLookbookSeason(seasonId, { [field]: value });
    };

    const handleAddImage = (seasonId: string) => {
        const season = lookbookSeasons.find(s => s.id === seasonId);
        if (!season) return;

        const newImage = {
            id: Date.now(),
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1962&auto=format&fit=crop",
            title: "New Look",
            aspect: "portrait" as const
        };
        updateLookbookSeason(seasonId, { images: [...season.images, newImage] });
    };

    const handleDeleteImage = (seasonId: string, imageId: number) => {
        const season = lookbookSeasons.find(s => s.id === seasonId);
        if (!season) return;
        updateLookbookSeason(seasonId, { images: season.images.filter(img => img.id !== imageId) });
    };

    const createSeason = () => {
        if (!newSeason.season || !newSeason.title) return;
        addLookbookSeason({
            season: newSeason.season,
            title: newSeason.title,
            description: newSeason.description || "",
            images: []
        });
        setIsAddDialogOpen(false);
        setNewSeason({ images: [] });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold">Lookbook Management</h1>
                    <p className="text-muted-foreground">Manage your visual collections and galleries.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="w-4 h-4 mr-2" /> Add Season</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Season</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Season Name (e.g. "SS25")</Label>
                                <Input value={newSeason.season || ""} onChange={e => setNewSeason({ ...newSeason, season: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input value={newSeason.title || ""} onChange={e => setNewSeason({ ...newSeason, title: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea value={newSeason.description || ""} onChange={e => setNewSeason({ ...newSeason, description: e.target.value })} />
                            </div>
                            <Button onClick={createSeason} className="w-full">Create Season</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {lookbookSeasons.map(season => (
                <Card key={season.id} className="relative">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>Season: {season.season}</CardTitle>
                                <CardDescription>Edit details and images for this collection.</CardDescription>
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => deleteLookbookSeason(season.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label>Season Name</Label>
                                <Input
                                    value={season.season}
                                    onChange={(e) => handleTextUpdate(season.id, "season", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Collection Title</Label>
                                <Input
                                    value={season.title}
                                    onChange={(e) => handleTextUpdate(season.id, "title", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={season.description}
                                    onChange={(e) => handleTextUpdate(season.id, "description", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium">Gallery Images</h3>
                                <Button variant="outline" size="sm" onClick={() => handleAddImage(season.id)}>
                                    <ImageIcon className="w-4 h-4 mr-2" /> Add Image
                                </Button>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {season.images.map(img => (
                                    <div key={img.id} className="border p-4 rounded-lg space-y-3 relative group">
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleDeleteImage(season.id, img.id)}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Image</Label>
                                            <ImageUpload
                                                value={img.image}
                                                onChange={(value) => handleImageUpdate(season.id, img.id, "image", value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Title</Label>
                                            <Input
                                                className="h-8 text-xs"
                                                value={img.title}
                                                onChange={(e) => handleImageUpdate(season.id, img.id, "title", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AdminLookbook;
