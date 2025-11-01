"use client";

import { createContext, useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { apply, setAttr } from "@directus/visual-editing";

// Create the context
interface VisualEditingContextType {
    isVisualEditing: boolean;
    setIsVisualEditing: (value: boolean) => void;
    getDirectusAttr: (
        collection: string,
        item: string,
        fields: string,
        mode?: "drawer" | "popover",
    ) => { 'data-directus': string } | {};
}

export const VisualEditingContext = createContext<VisualEditingContextType | undefined>(undefined);

export function VisualEditingProvider({ children }: { children: React.ReactNode }) {
    const [isVisualEditing, setIsVisualEditing] = useState(false);
    const pathname = usePathname();
    const searchParams = typeof window !== "undefined" ? useSearchParams() : null;
    const tokenRef = useRef<string | null>(null);
    const isInitialized = useRef(false);
    const hasReloadedForThisPage = useRef<string | null>(null);

    /**
     * Helper function to conditionally create directus attributes
     */
    const getDirectusAttr = (
        collection: string,
        item: string,
        fields: string,
        mode: "drawer" | "popover" = "popover",
    ) => {
        if (!isVisualEditing) {
            return {};
        }

        const attrValue = setAttr({
            collection,
            item,
            fields,
            mode,
        });

        return { 'data-directus': attrValue };
    }

    // Initialize visual editing and handle reloads
    useEffect(() => {
        const visualEditingParam = searchParams?.get("visual-editing") === "true";
        const tokenParam = searchParams?.get("token");

        // If visual editing is detected and we have a valid token
        if (visualEditingParam && tokenParam) {
            tokenRef.current = tokenParam; // Now TypeScript knows tokenParam is not null

            // If this is the first time detecting visual editing OR we're on a new page that hasn't been reloaded
            if (!isInitialized.current) {
                setIsVisualEditing(true);
                apply({
                    directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055",
                });
                isInitialized.current = true;
                console.log("Directus visual editing initialized");
            }
            // If we're already initialized but on a new page, reload to fix the bug
            else if (hasReloadedForThisPage.current !== pathname) {
                console.log("Visual editing detected on new page, reloading to fix bug");
                hasReloadedForThisPage.current = pathname;
                window.location.reload();
                return; // Exit early since we're reloading
            }

            setIsVisualEditing(true);
        }
    }, [searchParams, pathname]);

    // Handle navigation - preserve visual editing state
    useEffect(() => {
        // Only run if visual editing is active and we have a token
        if (!isVisualEditing || !tokenRef.current) return;

        // Add a small delay to ensure navigation is complete
        const timeoutId = setTimeout(() => {
            const url = new URL(window.location.href);

            // Check if params are missing and add them
            if (url.searchParams.get("visual-editing") !== "true" ||
                url.searchParams.get("token") !== tokenRef.current) {

                url.searchParams.set("visual-editing", "true");
                url.searchParams.set("token", tokenRef.current!); // Use non-null assertion since we check above

                const newUrl = url.toString();
                console.log("Adding missing visual editing params:", newUrl);

                window.history.replaceState(null, "", newUrl);

                // Notify parent window
                if (window.parent && window.parent !== window) {
                    try {
                        window.parent.postMessage({
                            type: 'directus-visual-editing-navigate',
                            url: newUrl,
                            pathname: pathname
                        }, '*');
                    } catch (error) {
                        console.error('Could not notify parent of URL change:', error);
                    }
                }
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [pathname, isVisualEditing]);

    const contextValue: VisualEditingContextType = {
        isVisualEditing,
        setIsVisualEditing,
        getDirectusAttr,
    };

    return (
        <VisualEditingContext.Provider value={contextValue}>
            {children}
        </VisualEditingContext.Provider>
    );
}