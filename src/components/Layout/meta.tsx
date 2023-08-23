import Head from "next/head";
import { MetaProps } from "@/utils/types";

const defaultMetaProps = {
  title: "Xplore",
  description: "Xplore is your ultimate travel guide for discovering new destinations and planning your next adventure.",
  robots: 'all'
}

export default function Meta({ props = defaultMetaProps }: { props: MetaProps }) {
  return (
    <Head>
        <title>{props.title}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        <link rel="manifest" href="./site.webmanifest" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content={props.robots}/>

        <meta itemProp="name" content={props.title} />
        <meta itemProp="description" content={props.description} />
        <meta name="description" content={props.description} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:type" content="website" />
    </Head>
  );
}
