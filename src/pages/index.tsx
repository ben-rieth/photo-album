import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import AuthForm from "../components/auth/AuthForm";
import AlbumsList from "../components/album/AlbumsList";
import { FaSpinner } from 'react-icons/fa';

const Home: NextPage = () => {
    const { data: session, status } = useSession();

    if (session) {
      return (
        <>
          <header className="flex px-2 py-2 shadow-lg">
            <h1 className="text-2xl md:text-4xl flex-1 font-handwriting">Albums List</h1>
            <button 
              className="text-lg hover:text-rose-500 hover:scale-110"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </header>
          <AlbumsList />
        </>
        
      );
    } 

    if (status === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center mx-10">
          <FaSpinner className="w-10 h-10 animate-spin fill-sky-500 mt-24"/>
          <p className="text-lg text-center text-sky-500">
            {"It's loading, lovely. Give it a sec :)"}
          </p>
        </div>
      )
    }

    return (
      <>
        <AuthForm />
      </>
      
    );
};

export default Home;
