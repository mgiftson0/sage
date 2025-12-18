import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSiteContent, Order } from "@/context/SiteContentContext";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminOrders = () => {
    const { orders, addOrder, updateOrder, deleteOrder } = useSiteContent();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newOrder, setNewOrder] = useState<Partial<Order>>({});

    const handleCreate = () => {
        if (!newOrder.customer || !newOrder.total) return;
        addOrder({
            customer: newOrder.customer,
            total: Number(newOrder.total),
            items: Number(newOrder.items) || 1,
            status: "Pending",
            date: new Date().toISOString().split('T')[0]
        });
        setIsDialogOpen(false);
        setNewOrder({});
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold">Orders</h1>
                    <p className="text-muted-foreground">Manage orders and status.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="w-4 h-4 mr-2" /> Create Order</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Manual Order Entry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Customer Name</Label>
                                <Input value={newOrder.customer || ""} onChange={e => setNewOrder({ ...newOrder, customer: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Total Amount ($)</Label>
                                <Input type="number" value={newOrder.total || ""} onChange={e => setNewOrder({ ...newOrder, total: Number(e.target.value) })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Items Count</Label>
                                <Input type="number" value={newOrder.items || ""} onChange={e => setNewOrder({ ...newOrder, items: Number(e.target.value) })} />
                            </div>
                            <Button onClick={handleCreate} className="w-full">Create Order</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Manage order statuses and deletions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={order.status}
                                            onValueChange={(val) => updateOrder(order.id, { status: val as Order['status'] })}
                                        >
                                            <SelectTrigger className="w-[120px] h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Processing">Processing</SelectItem>
                                                <SelectItem value="Shipped">Shipped</SelectItem>
                                                <SelectItem value="Delivered">Delivered</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">${order.total}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteOrder(order.id)}>
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

export default AdminOrders;
