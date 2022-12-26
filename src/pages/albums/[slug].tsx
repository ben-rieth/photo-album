import type { GetServerSideProps, NextPage } from "next";
import Gallery from "../../components/gallery/Gallery";
import { env } from "../../env/server.mjs";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from '../../server/db/client';
import type { PhotoWithUrl } from "../../types/Photo";

type AlbumPageProps = {
    photos: PhotoWithUrl[];
    tags: string[];
    name: string;
}

const AlbumPage: NextPage<AlbumPageProps> = ({ photos, name, tags }) => {
    return (
        <Gallery photos={photos} tags={tags} name={name} />
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

    const photos : PhotoWithUrl[] = album.photos.map(photo => {
        return {
            id: photo.id,
            tags: photo.tags,
            updatedAt: photo.updatedAt.toISOString(),
            createdAt: photo.createdAt.toISOString(),
            url: `${env.SUPABASE_STORAGE_URL}/albums/${slug}/${photo.filename}`
        }});

    return {
        props: {
            photos,
            tags: album.tags,
            name: album.name,
        }
    }
}