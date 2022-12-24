import type { GetServerSideProps, NextPage } from "next";
import Image from 'next/image';
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma, supabase } from '../../server/db/client';

type AlbumPageProps = {
    urls: string[]
}

const AlbumPage: NextPage<AlbumPageProps> = ({ urls }) => {
    return (
        <div>
            {urls && urls.map((url, index) => {
                return (<Image 
                    key={`gallery-${index}`}
                    src={url}
                    alt=""
                    width={100}
                    height={100}
                />)
            })}
        </div>
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

    const folderUrls = pictures ? pictures.map(picture => `${slug}/${picture.filename}`) : [];
    
    const { data } = await supabase
        .storage.from('albums')
        .createSignedUrls(folderUrls, 3600);

    const urls = data ? data.map((obj) => obj.signedUrl) : [];
    return {
        props: {
            urls
        }
    }
}