import { type NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {

    const { data: session } = useSession();

    if (session) {
      return (
        <p>Signed in</p>
      );
    }

    return (
      <p>Hello world! Not signed in</p>
    );
};

export default Home;
