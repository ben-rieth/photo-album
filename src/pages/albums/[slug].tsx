import type { Photo } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Gallery from "../../components/gallery/Gallery";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from '../../server/db/client';

type AlbumPageProps = {
    photos: Photo[];
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

    return {
        props: {
            photos: JSON.parse(JSON.stringify(album.photos)),
            tags: album.tags,
            name: album.name,
        }
    }
}