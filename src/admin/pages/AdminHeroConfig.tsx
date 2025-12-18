import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteContent } from "@/context/SiteContentContext";
import { useState } from "react";
import { toast } from "sonner";

const AdminHeroConfig = () => {
    const { config, updateConfig } = useSiteContent();
    const [formData, setFormData] = useState({
        heroTitle: config.heroTitle,
        heroSubtitle: config.heroSubtitle,
        heroImage: config.heroImage,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateConfig(formData);
        toast.success("Hero section updated successfully");
    };

    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl font-bold">Hero Configuration</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Hero Section</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="heroTitle">Title</Label>
                            <Input
                                id="heroTitle"
                                name="heroTitle"
                                value={formData.heroTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heroSubtitle">Subtitle</Label>
                            <Input
                                id="heroSubtitle"
                                name="heroSubtitle"
                                value={formData.heroSubtitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heroImage">Image URL</Label>
                            <Input
                                id="heroImage"
                                name="heroImage"
                                value={formData.heroImage}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminHeroConfig;
