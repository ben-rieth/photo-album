import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import AuthForm from "../components/auth/AuthForm";

const Home: NextPage = () => {

    const { data: session } = useSession();

    if (session) {
      return (
        <p>Signed in</p>
      );
    }

    return (
      <AuthForm />
    );
};

export default Home;
