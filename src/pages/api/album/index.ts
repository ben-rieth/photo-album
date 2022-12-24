import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

import { prisma } from "../../../server/db/client";

// const schema = z.object({
//     userId: z.string(),
// })

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {

        const session = await getServerAuthSession({ req, res});

        if (!session || !session.user) {
            return res.status(401).json({
                msg: 'Not authorized'
            });
        }

        const userId = session.user.id;


        try {

            const userWithAlbums = await prisma.user.findFirst({
                where: { id: userId },
                include: { 
                    albums: true 
                }
            });

            return res.status(200).json(userWithAlbums?.albums);

        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: "Error accessing database. Try request again later."
            })
        }

    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({
            msg: 'Method not allowed.'
        });
    }
}

export default handler;