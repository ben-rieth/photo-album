import { decode } from "base64-arraybuffer";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { getPlaiceholder } from "plaiceholder";
import { env } from "../../../env/server.mjs";
import { supabase, prisma } from "../../../server/db/client";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        }
    }
}

const handler = async(req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const  { image, albumId } = req.body;

        if (!image) {
            return;
        }

        const contentType = image.match(/data:(.*);base64/)?.[1];
        const base64FileData = image.split('base64,')?.[1];

        if (!contentType || !base64FileData) {
            return res.status(400).json({ message: 'Image data not valid' });
        }

        const filename = nanoid();
        const ext =contentType.split('/')[1];
        const path = `${filename}.${ext}`;

        const { error } = await supabase.storage.from('albums')
            .upload(
                `${albumId}/${path}`,
                decode(base64FileData),
                { contentType, upsert: true}
            );

        if (error) {
            console.log("Supabase err")
            console.log(error);
            return res.status(500).json({
                msg: 'Unable to upload image to database',
            });
        }

        try {
            const url = `${env.SUPABASE_STORAGE_URL}/albums/${albumId}/${path}`;

            const { base64 } = await getPlaiceholder(url);

            await prisma.photo.create({
                data: {
                    albumId,
                    url,
                    placeholder: base64,
                }
            });

        } catch (err) {
            console.log(err);

            await supabase.storage.from('albums')
                .remove([`${albumId}/${path}`])

            return res.status(500).json({
                msg: 'Error adding image to database',
            });
        }

        return res.status(200).json({
            msg: 'Photo successfully uploaded',
        });
        

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({
            msg: `HTTP method ${req.method} not allowed.`
        })
    }

}

export default handler;