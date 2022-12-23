import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { prisma } from "../../../server/db/client";

const schema = z.object({
    email: z.string().email(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        let email;
        try {
            const data = schema.parse(req.body);
            email = data.email;

        } catch (err) {
            return res.status(400).json({
                msg: "Include email in request"
            });
        }
        
        try {
            const result = await prisma.whitelist.findUnique({
                where: { email }
            });

            return res.status(200).json({
                allowed: !!result,
            })
        } catch(err) {
            console.log(err);

            return res.status(500).json({
                msg: "Cannot retrieve data from database"
            });
        }
    } else {
        res.setHeader('Allow', ['POST'])
        return res.status(405).json({
            msg: 'Can only submit POST requests'
        })
    }

}

export default handler;