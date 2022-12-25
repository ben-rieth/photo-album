import { truncate } from "fs/promises";
import type { GetServerSideProps, NextPage } from "next";
import Gallery from "../../components/gallery/Gallery";
import { env } from "../../env/server.mjs";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from '../../server/db/client';

type AlbumPageProps = {
    photos: {
        url: string;
        tags: string[];
        createdAt: string;
    }[];
    tags: string[];
    name: string;
}

const AlbumPage: NextPage<AlbumPageProps> = ({ photos, name, tags }) => {
    return (
        <>
            <h1 className="text-center text-2xl font-bold">
                {name}
            </h1>
            <Gallery photos={photos} tags={tags} />
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

    // const pictures = await prisma.photo.findMany({
    //     where: { albumId: slug }
    // });

    const album = await prisma.album.findUnique({
        where: { id: slug },
        include: { photos: true }
    });

    if (!album) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }

    const photos = album.photos.map(photo => {
        return {
            tags: photo.tags,
            createdAt: photo.createdAt.toISOString(),
            url: `${env.SUPABASE_STORAGE_URL}/albums/${slug}/${photo.filename}`
        }});

    // const { data } = await supabase
    //     .storage.from('albums')
    //     .createSignedUrls(folderUrls, 3600);

    // const urls = data ? data.map((obj) => obj.signedUrl) : [];

    return {
        props: {
            photos,
            tags: album.tags,
            name: album.name,
        }
    }
}