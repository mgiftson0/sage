import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// --- Interfaces ---

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: string;
}

export interface Collection {
    id: string;
    title: string;
    description: string;
    image: string;
}

export interface JournalPost {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    content?: string;
}

export interface LookbookImage {
    id: number;
    image: string;
    title: string;
    aspect: "portrait" | "landscape" | "square";
}

export interface LookbookSeason {
    id: string;
    season: string;
    title: string;
    description: string;
    images: LookbookImage[];
}

export interface StoryValue {
    title: string;
    description: string;
    image: string;
}

export interface StoryConfig {
    heroImage: string;
    missionText: string;
    values: StoryValue[];
}

export interface Order {
    id: string;
    customer: string;
    date: string;
    total: number;
    status: "Pending" | "Processing" | "Shipped" | "Delivered";
    items: number;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    joinedDate: string;
    totalOrders: number;
    totalSpent: number;
}

export interface SiteConfig {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    philosophyTitle: string;
    philosophyContent: string;
}

export interface Material {
    id: string;
    name: string;
    code: string;
    description: string;
    origin: string;
    image: string;
}

interface SiteContentContextType {
    config: SiteConfig;
    products: Product[];
    collections: Collection[];
    journalPosts: JournalPost[];
    lookbookSeasons: LookbookSeason[];
    storyConfig: StoryConfig;
    orders: Order[];
    customers: Customer[];
    materials: Material[];

    updateConfig: (newConfig: SiteConfig) => void;

    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    addCollection: (collection: Omit<Collection, "id">) => void;
    updateCollection: (id: string, collection: Partial<Collection>) => void;
    deleteCollection: (id: string) => void;

    addJournalPost: (post: Omit<JournalPost, "id">) => void;
    updateJournalPost: (id: string, post: Partial<JournalPost>) => void;
    deleteJournalPost: (id: string) => void;

    addLookbookSeason: (season: Omit<LookbookSeason, "id">) => void;
    updateLookbookSeason: (id: string, season: Partial<LookbookSeason>) => void;
    deleteLookbookSeason: (id: string) => void;

    updateStoryConfig: (newConfig: Partial<StoryConfig>) => void;

    addOrder: (order: Omit<Order, "id">) => void;
    updateOrder: (id: string, order: Partial<Order>) => void;
    deleteOrder: (id: string) => void;

    addCustomer: (customer: Omit<Customer, "id">) => void;
    updateCustomer: (id: string, customer: Partial<Customer>) => void;
    deleteCustomer: (id: string) => void;

    addMaterial: (material: Omit<Material, "id">) => void;
    updateMaterial: (id: string, material: Partial<Material>) => void;
    deleteMaterial: (id: string) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider = ({ children }: { children: React.ReactNode }) => {
    // --- State ---
    const [config, setConfig] = useState<SiteConfig>(() => {
        const saved = localStorage.getItem("site_config");
        return saved ? JSON.parse(saved) : {
            heroTitle: "Elegance in Every Stitch",
            heroSubtitle: "Timeless Fashion",
            heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
            philosophyTitle: "Our Philosophy",
            philosophyContent: "Sustainability • Craftsmanship • Heritage",
        };
    });

    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem("site_products");
        return saved ? JSON.parse(saved) : [
            { id: "1", name: "Kente Silk Robe", description: "Handwoven Kente accents.", price: 250, image: "https://images.unsplash.com/photo-1589465885857-44edb59ef526?w=600&auto=format&fit=crop", categoryId: "kente" },
            { id: "2", name: "Ankara Maxi Dress", description: "Vibrant prints for summer.", price: 180, image: "https://images.unsplash.com/photo-1596902852233-5c026ca2b733?w=600&auto=format&fit=crop", categoryId: "ankara" },
        ];
    });

    const [collections, setCollections] = useState<Collection[]>(() => {
        const saved = localStorage.getItem("site_collections");
        return saved ? JSON.parse(saved) : [
            { id: "1", title: "Harmattan 2024", description: "Earthy tones and warm fabrics.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1962&auto=format&fit=crop" },
            { id: "2", title: "Volta Reflections", description: "Fluid forms inspired by water.", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop" },
        ];
    });

    const [journalPosts, setJournalPosts] = useState<JournalPost[]>(() => {
        const saved = localStorage.getItem("site_journal");
        return saved ? JSON.parse(saved) : [
            {
                id: "1",
                title: "The Art of Kente Weaving: A Journey to Bonwire",
                excerpt: "Discover the ancient craft of Kente weaving in the Ashanti Region.",
                category: "Heritage",
                date: "December 8, 2024",
                readTime: "5 min read",
                image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&auto=format&fit=crop",
            }
        ];
    });

    const [lookbookSeasons, setLookbookSeasons] = useState<LookbookSeason[]>(() => {
        const saved = localStorage.getItem("site_lookbook");
        return saved ? JSON.parse(saved) : [
            {
                id: "aw24",
                season: "Harmattan 2024",
                title: "Echoes of Ashanti",
                description: "A celebration of royal heritage through contemporary silhouettes.",
                images: [
                    { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1962&auto=format&fit=crop", title: "Royal Kente Ensemble", aspect: "portrait" },
                    { id: 2, image: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1972&auto=format&fit=crop", title: "Adinkra Elegance", aspect: "square" },
                ]
            }
        ];
    });

    const [storyConfig, setStoryConfig] = useState<StoryConfig>(() => {
        const saved = localStorage.getItem("site_story");
        return saved ? JSON.parse(saved) : {
            heroImage: "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1920&auto=format&fit=crop",
            missionText: "We believe that every piece of cloth tells a story—of culture, of craftsmanship, of community.",
            values: [
                { title: "Preserving Heritage", description: "Keeping traditional techniques alive.", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&auto=format&fit=crop" },
                { title: "Empowering Communities", description: "Supporting Ghanaian artisans.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop" }
            ]
        };
    });

    // Mock Data for Dashboard (Not persisted usually, but let's persist for demo feel)
    const [orders, setOrders] = useState<Order[]>([
        { id: "#ORD-001", customer: "Alice Freeman", date: "2024-12-18", total: 450, status: "Pending", items: 3 },
        { id: "#ORD-002", customer: "Bob Smith", date: "2024-12-17", total: 120, status: "Shipped", items: 1 },
        { id: "#ORD-003", customer: "Charlie Davis", date: "2024-12-16", total: 850, status: "Delivered", items: 5 },
    ]);

    const [customers, setCustomers] = useState<Customer[]>([
        { id: "CUST-001", name: "Alice Freeman", email: "alice@example.com", joinedDate: "2024-01-15", totalOrders: 5, totalSpent: 1200 },
        { id: "CUST-002", name: "Bob Smith", email: "bob@example.com", joinedDate: "2024-03-22", totalOrders: 2, totalSpent: 300 },
    ]);

    const [materials, setMaterials] = useState<Material[]>([
        { id: "m1", name: "Organic Cotton", code: "M1", description: "GOTS certified cotton.", origin: "Izmir, Turkey", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=2070&auto=format&fit=crop" },
        { id: "m2", name: "Merino Wool", code: "M2", description: "Ethically sourced wool.", origin: "New Zealand", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000&auto=format&fit=crop" },
    ]);


    // --- Persistence Effects ---
    useEffect(() => localStorage.setItem("site_config", JSON.stringify(config)), [config]);
    useEffect(() => localStorage.setItem("site_products", JSON.stringify(products)), [products]);
    useEffect(() => localStorage.setItem("site_collections", JSON.stringify(collections)), [collections]);
    useEffect(() => localStorage.setItem("site_journal", JSON.stringify(journalPosts)), [journalPosts]);
    useEffect(() => localStorage.setItem("site_lookbook", JSON.stringify(lookbookSeasons)), [lookbookSeasons]);
    useEffect(() => localStorage.setItem("site_story", JSON.stringify(storyConfig)), [storyConfig]);
    useEffect(() => localStorage.setItem("site_materials", JSON.stringify(materials)), [materials]);

    // --- Actions ---
    const updateConfig = (newConfig: SiteConfig) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
        toast.success("Site configuration updated");
    };

    const addProduct = (product: Omit<Product, "id">) => {
        setProducts([...products, { ...product, id: Date.now().toString() }]);
        toast.success("Product added");
    };
    const updateProduct = (id: string, updated: Partial<Product>) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updated } : p));
        toast.success("Product updated");
    };
    const deleteProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
        toast.success("Product deleted");
    };

    const addCollection = (collection: Omit<Collection, "id">) => {
        setCollections([...collections, { ...collection, id: Date.now().toString() }]);
        toast.success("Collection added");
    };
    const updateCollection = (id: string, updated: Partial<Collection>) => {
        setCollections(collections.map(c => c.id === id ? { ...c, ...updated } : c));
        toast.success("Collection updated");
    };
    const deleteCollection = (id: string) => {
        setCollections(collections.filter(c => c.id !== id));
        toast.success("Collection deleted");
    };

    const addJournalPost = (post: Omit<JournalPost, "id">) => {
        setJournalPosts([...journalPosts, { ...post, id: Date.now().toString() }]);
        toast.success("Journal post added");
    };
    const updateJournalPost = (id: string, updated: Partial<JournalPost>) => {
        setJournalPosts(journalPosts.map(p => p.id === id ? { ...p, ...updated } : p));
        toast.success("Journal post updated");
    };
    const deleteJournalPost = (id: string) => {
        setJournalPosts(journalPosts.filter(p => p.id !== id));
        toast.success("Journal post deleted");
    };

    const addLookbookSeason = (season: Omit<LookbookSeason, "id">) => {
        setLookbookSeasons([...lookbookSeasons, { ...season, id: Date.now().toString() }]);
        toast.success("Lookbook season added");
    };
    const updateLookbookSeason = (id: string, updated: Partial<LookbookSeason>) => {
        setLookbookSeasons(lookbookSeasons.map(s => s.id === id ? { ...s, ...updated } : s));
        toast.success("Lookbook season updated");
    };
    const deleteLookbookSeason = (id: string) => {
        setLookbookSeasons(lookbookSeasons.filter(s => s.id !== id));
        toast.success("Lookbook season deleted");
    };

    const updateStoryConfig = (updated: Partial<StoryConfig>) => {
        setStoryConfig(prev => ({ ...prev, ...updated }));
        toast.success("Story page updated");
    };

    const addOrder = (order: Omit<Order, "id">) => {
        setOrders([...orders, { ...order, id: `#ORD-${Date.now().toString().slice(-4)}` }]);
        toast.success("Order manually created");
    };
    const updateOrder = (id: string, updated: Partial<Order>) => {
        setOrders(orders.map(o => o.id === id ? { ...o, ...updated } : o));
        toast.success("Order updated");
    };
    const deleteOrder = (id: string) => {
        setOrders(orders.filter(o => o.id !== id));
        toast.success("Order deleted");
    };

    const addCustomer = (customer: Omit<Customer, "id">) => {
        setCustomers([...customers, { ...customer, id: `CUST-${Date.now().toString().slice(-4)}` }]);
        toast.success("Customer added");
    };
    const updateCustomer = (id: string, updated: Partial<Customer>) => {
        setCustomers(customers.map(c => c.id === id ? { ...c, ...updated } : c));
        toast.success("Customer updated");
    };
    const deleteCustomer = (id: string) => {
        setCustomers(customers.filter(c => c.id !== id));
        toast.success("Customer deleted");
    };

    const addMaterial = (material: Omit<Material, "id">) => {
        setMaterials([...materials, { ...material, id: Date.now().toString() }]);
        toast.success("Material added");
    };
    const updateMaterial = (id: string, updated: Partial<Material>) => {
        setMaterials(materials.map(m => m.id === id ? { ...m, ...updated } : m));
        toast.success("Material updated");
    };
    const deleteMaterial = (id: string) => {
        setMaterials(materials.filter(m => m.id !== id));
        toast.success("Material deleted");
    };

    return (
        <SiteContentContext.Provider value={{
            config, products, collections, journalPosts, lookbookSeasons, storyConfig, orders, customers, materials,
            updateConfig,
            addProduct, updateProduct, deleteProduct,
            addCollection, updateCollection, deleteCollection,
            addJournalPost, updateJournalPost, deleteJournalPost,
            addLookbookSeason, updateLookbookSeason, deleteLookbookSeason,
            updateStoryConfig,
            addOrder, updateOrder, deleteOrder,
            addCustomer, updateCustomer, deleteCustomer,
            addMaterial, updateMaterial, deleteMaterial
        }}>
            {children}
        </SiteContentContext.Provider>
    );
};

export const useSiteContent = () => {
    const context = useContext(SiteContentContext);
    if (!context) throw new Error("useSiteContent must be used within a SiteContentProvider");
    return context;
};
