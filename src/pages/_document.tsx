import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html className="scroll-smooth">
            <Head />
            <body className="max-w-screen h-screen">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document;