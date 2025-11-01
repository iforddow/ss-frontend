"use client";

export default function DynamicIcon({ icon, color, size, ...props }: { icon: string, color?: string, size?: string, [key: string]: any }) {
    return <span className="material-symbols-rounded" style={{ color, fontSize: size }} {...props}>{icon}</span>;
}