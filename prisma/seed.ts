import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    const deletePhotos = prisma.photo.deleteMany();
    const deleteAlbums = prisma.album.deleteMany();

    await prisma.$transaction([deletePhotos, deleteAlbums]);

    await prisma.album.create({
        data: {
            name: 'Benji & Alison',
            users: {
                connect: [ { email: 'benrieth3@gmail.com' }]
            },
            photos: {
                createMany: {
                    data: [
                        { filename: 'children.jpg' },
                        { filename: 'bus_2.jpg' }
                    ]
                }
            }
        }
    })
};

main()
    .then(() => {
        prisma.$disconnect;
    })
    .catch((err) => {
        console.error(err);
        prisma.$disconnect();
        process.exit(1);
    })