import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

const Document = () => {
    return (
        <Html className="scroll-smooth">
            <Head />
            <body className="w-screen h-screen">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;