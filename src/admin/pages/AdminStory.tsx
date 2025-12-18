import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent } from "@/context/SiteContentContext";
import { ImageUpload } from "@/admin/components/ImageUpload";

const AdminStory = () => {
    const { storyConfig, updateStoryConfig } = useSiteContent();

    const handleValueUpdate = (index: number, field: string, value: string) => {
        const newValues = [...storyConfig.values];
        newValues[index] = { ...newValues[index], [field]: value };
        updateStoryConfig({ values: newValues });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold">Our Story Page</h1>
                <p className="text-muted-foreground">Manage the content of your About/Story page.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Hero Image</Label>
                        <ImageUpload
                            value={storyConfig.heroImage}
                            onChange={(value) => updateStoryConfig({ heroImage: value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Mission Text</Label>
                        <Textarea
                            value={storyConfig.missionText}
                            onChange={(e) => updateStoryConfig({ missionText: e.target.value })}
                            className="min-h-[100px]"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Core Values</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                        {storyConfig.values.map((val, index) => (
                            <div key={index} className="space-y-4 border p-4 rounded-lg">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={val.title}
                                        onChange={(e) => handleValueUpdate(index, "title", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        value={val.description}
                                        onChange={(e) => handleValueUpdate(index, "description", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Image</Label>
                                    <ImageUpload
                                        value={val.image}
                                        onChange={(value) => handleValueUpdate(index, "image", value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminStory;
