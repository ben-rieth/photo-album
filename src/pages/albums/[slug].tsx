import type { GetServerSideProps, NextPage } from "next";
import AddImage from "../../components/gallery/AddImage";
import Gallery from "../../components/gallery/Gallery";
import { env } from "../../env/server.mjs";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from '../../server/db/client';

type AlbumPageProps = {
    urls: string[];
    albumId: string;
}

const AlbumPage: NextPage<AlbumPageProps> = ({ urls, albumId }) => {
    return (
        <>
            <AddImage albumId={albumId} />
            <Gallery urls={urls} />
        </>
    );
}

export default AlbumPage;

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {

    const session = await getServerAuthSession({req, res});

    if (!session || !params?.slug) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }

    const slug = params.slug as string;

    const pictures = await prisma.photo.findMany({
        where: { albumId: slug }
    });
    const urls = pictures ? pictures.map(picture => `${env.SUPABASE_STORAGE_URL}/albums/${slug}/${picture.filename}`) : [];

    // const { data } = await supabase
    //     .storage.from('albums')
    //     .createSignedUrls(folderUrls, 3600);

    // const urls = data ? data.map((obj) => obj.signedUrl) : [];

    return {
        props: {
            urls,
            albumId: slug
        }
    }
}