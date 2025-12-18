import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const OrderSuccess = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="text-center space-y-6 px-6">
                    <CheckCircle className="w-20 h-20 text-primary mx-auto" />
                    <h1 className="font-display text-4xl font-bold text-foreground">Order Confirmed!</h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Thank you for your purchase. We have received your order and will begin processing it immediately. You will receive a confirmation email shortly.
                    </p>
                    <div className="pt-8">
                        <Link
                            to="/collections"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Continue Shopping <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderSuccess;
