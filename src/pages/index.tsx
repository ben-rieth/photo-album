import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import AuthForm from "../components/auth/AuthForm";
import AlbumsList from "../components/album/AlbumsList";

const Home: NextPage = () => {
    const { data: session } = useSession();

    if (session) {
      return (
        <>
          <header className="flex mx-2">
            <h1 className="text-2xl md:text-4xl flex-1 font-handwriting">Albums List</h1>
            <button 
              className="text-lg"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </header>
          <AlbumsList />
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
