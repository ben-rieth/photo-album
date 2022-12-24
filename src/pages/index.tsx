import type { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import AuthForm from "../components/auth/AuthForm";
import { supabase, prisma } from "../server/db/client";

type HomeProps = {
    urls: string[]
}

const Home: NextPage<HomeProps> = ({ urls }) => {
    const { data: session } = useSession();

    if (session) {
      return (
        <button onClick={() => signOut()}>Sign Out</button>
      );
    }
    console.log(urls);
    return (
      <>
        <AuthForm />
        {urls && urls.map((url, index) => {
          return (<Image 
            key={`gallery-${index}`}
            src={url}
            alt=""
            width={100}
            height={100}
          />)
        })}
      </>
      
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const pictures = await prisma.photo.findMany({
      where: { albumId: 'og '}
    });

    const folderUrls = pictures ? pictures.map(picture => `og/${picture.filename}`) : [];
    
    const { data } = await supabase
      .storage.from('albums')
      .createSignedUrls(folderUrls, 3600);

    const urls = data ? data.map((obj) => obj.signedUrl) : [];
    return {
      props: {
        urls
      }
    }
}
