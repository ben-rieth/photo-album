import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import AuthForm from "../components/auth/AuthForm";
import AlbumsList from "../components/gallery/AlbumsList";

const Home: NextPage = () => {
    const { data: session } = useSession();

    if (session) {
      return (
        <>
          <AlbumsList />
          <button onClick={() => signOut()}>Sign Out</button>
        </>
        
      );
    }
    return (
      <>
        <AuthForm />
      </>
      
    );
};

export default Home;
