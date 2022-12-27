import type { NextApiRequest, NextApiResponse } from "next";
import * as z from 'zod';
import { env } from "../../../env/server.mjs";

const schema = z.object({
    filename: z.string(),
    albumId: z.string()
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {

        let filename, albumId;
        try {
            const body = schema.parse(req.body);
            filename = body.filename;
            albumId = body.albumId;
        } catch (err) {
            res.status(400).json({
                msg: 'Filename must be included.'
            });
        }

        res.status(200).json({
            url: `${env.SUPABASE_STORAGE_URL}/albums/${albumId}/${filename}`,
        })

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({
            msg: `HTTP method ${req.method} is not allowed.`
        })
    }
}

export default handler;