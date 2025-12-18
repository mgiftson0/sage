import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSiteContent, Customer } from "@/context/SiteContentContext";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminCustomers = () => {
    const { customers, addCustomer, deleteCustomer } = useSiteContent();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({});

    const handleCreate = () => {
        if (!newCustomer.name || !newCustomer.email) return;
        addCustomer({
            name: newCustomer.name,
            email: newCustomer.email,
            joinedDate: new Date().toISOString().split('T')[0],
            totalOrders: 0,
            totalSpent: 0
        });
        setIsDialogOpen(false);
        setNewCustomer({});
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold">Customers</h1>
                    <p className="text-muted-foreground">Manage your customer profiles.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="w-4 h-4 mr-2" /> Add Customer</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Customer</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input value={newCustomer.name || ""} onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" value={newCustomer.email || ""} onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })} />
                            </div>
                            <Button onClick={handleCreate} className="w-full">Add Customer</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Customers</CardTitle>
                    <CardDescription>List of all registered customers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Total Spent</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell className="font-medium">{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.joinedDate}</TableCell>
                                    <TableCell className="text-right">${customer.totalSpent}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteCustomer(customer.id)}>
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

export default AdminCustomers;
