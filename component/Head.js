import Head from "next/head";

export default function PageHead({ pageName }) {
    return (
        <Head>
            <title>{pageName}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}