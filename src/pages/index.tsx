import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import AuthForm from "../components/auth/AuthForm";

const Home: NextPage = () => {

    const { data: session } = useSession();

    if (session) {
      return (
        <button onClick={() => signOut()}>Sign Out</button>
      );
    }

    return (
      <AuthForm />
    );
};

export default Home;
