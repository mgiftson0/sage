import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent } from "@/context/SiteContentContext";
import { useState } from "react";
import { toast } from "sonner";

const AdminPhilosophyConfig = () => {
    const { config, updateConfig } = useSiteContent();
    const [formData, setFormData] = useState({
        philosophyTitle: config.philosophyTitle,
        philosophyContent: config.philosophyContent,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateConfig(formData);
        toast.success("Philosophy section updated successfully");
    };

    return (
        <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl font-bold">Philosophy Configuration</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Philosophy Section</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="philosophyTitle">Title</Label>
                            <Input
                                id="philosophyTitle"
                                name="philosophyTitle"
                                value={formData.philosophyTitle}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="philosophyContent">Content</Label>
                            <Textarea
                                id="philosophyContent"
                                name="philosophyContent"
                                value={formData.philosophyContent}
                                onChange={handleChange}
                                rows={5}
                            />
                        </div>
                        <Button type="submit">Save Changes</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminPhilosophyConfig;
