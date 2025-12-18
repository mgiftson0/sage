import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteContent } from "@/context/SiteContentContext";

const AdminDashboard = () => {
    const { config } = useSiteContent();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Hero Title</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold truncate">{config.heroTitle}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Philosophy Title</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold truncate">{config.philosophyTitle}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold text-green-500">Active</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
