"use client";

import { useEffect } from "react";
import { setToken } from "@/utils/api";

export default function TokenInitializer() {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
        }
    }, []);

    return null; // No UI, just side effect
}
