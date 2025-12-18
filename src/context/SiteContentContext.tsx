import React, { createContext, useContext, useEffect, useState } from "react";

// Types
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

export interface Story {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
}

export interface SiteConfig {
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    philosophyTitle: string;
    philosophyContent: string;
}

// Default Data
const defaultProduct: Product[] = [
    { id: "1", name: "Linen Shirt", description: "Breathable natural fabric", price: 120, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80", categoryId: "1" },
    { id: "2", name: "Ceramic Vase", description: "Hand-thrown pottery", price: 85, image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80", categoryId: "2" }
];

const defaultCollections: Collection[] = [
    { id: "1", title: "Summer Breeze", description: "Light fabrics for warm days", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80" },
    { id: "2", title: "Earthen Home", description: "Ceramics and decor", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80" }
];

const defaultConfig: SiteConfig = {
    heroTitle: "SAGE & STONE",
    heroSubtitle: "Curated collection of artisanal lifestyle essentials",
    heroImage: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&q=80",
    philosophyTitle: "Our Philosophy",
    philosophyContent: "We believe in the power of minimalism and the beauty of natural materials. Every piece in our collection is curated to bring a sense of calm and purpose to your daily life.",
};

interface SiteContentContextType {
    config: SiteConfig;
    products: Product[];
    collections: Collection[];
    updateConfig: (newConfig: Partial<SiteConfig>) => void;
    // CRUD Operations
    addProduct: (product: Omit<Product, "id">) => void;
    updateProduct: (id: string, product: Partial<Product>) => void;
    deleteProduct: (id: string) => void;
    addCollection: (collection: Omit<Collection, "id">) => void;
    updateCollection: (id: string, collection: Partial<Collection>) => void;
    deleteCollection: (id: string) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Helpers
    const generateId = () => Math.random().toString(36).substr(2, 9);

    // State
    const [config, setConfig] = useState<SiteConfig>(() => {
        const saved = localStorage.getItem("siteConfig");
        return saved ? JSON.parse(saved) : defaultConfig;
    });

    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem("siteProducts");
        return saved ? JSON.parse(saved) : defaultProduct;
    });

    const [collections, setCollections] = useState<Collection[]>(() => {
        const saved = localStorage.getItem("siteCollections");
        return saved ? JSON.parse(saved) : defaultCollections;
    });

    // Persistance
    useEffect(() => { localStorage.setItem("siteConfig", JSON.stringify(config)); }, [config]);
    useEffect(() => { localStorage.setItem("siteProducts", JSON.stringify(products)); }, [products]);
    useEffect(() => { localStorage.setItem("siteCollections", JSON.stringify(collections)); }, [collections]);

    // Actions
    const updateConfig = (newConfig: Partial<SiteConfig>) => setConfig((prev) => ({ ...prev, ...newConfig }));

    const addProduct = (product: Omit<Product, "id">) => setProducts((prev) => [...prev, { ...product, id: generateId() }]);
    const updateProduct = (id: string, product: Partial<Product>) => setProducts((prev) => prev.map(p => p.id === id ? { ...p, ...product } : p));
    const deleteProduct = (id: string) => setProducts((prev) => prev.filter(p => p.id !== id));

    const addCollection = (collection: Omit<Collection, "id">) => setCollections((prev) => [...prev, { ...collection, id: generateId() }]);
    const updateCollection = (id: string, collection: Partial<Collection>) => setCollections((prev) => prev.map(c => c.id === id ? { ...c, ...collection } : c));
    const deleteCollection = (id: string) => setCollections((prev) => prev.filter(c => c.id !== id));

    return (
        <SiteContentContext.Provider value={{
            config, updateConfig,
            products, addProduct, updateProduct, deleteProduct,
            collections, addCollection, updateCollection, deleteCollection
        }}>
            {children}
        </SiteContentContext.Provider>
    );
};

export const useSiteContent = () => {
    const context = useContext(SiteContentContext);
    if (context === undefined) {
        throw new Error("useSiteContent must be used within a SiteContentProvider");
    }
    return context;
};
