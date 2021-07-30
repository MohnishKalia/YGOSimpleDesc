import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';

export interface SearchResponse {
    id: number,
    name: string,
    desc: string,
    sdesc: string,
    url: string,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(404).json({ error: 'Invalid method.' });

    const { passcode } = req.query;
    if (!passcode || typeof passcode !== 'string')
        return res.status(409).json({ error: 'Invalid passcode format.' });

    const card = await prisma.snapshot.findFirst({
        where: { id: +passcode },
        select: { id: true, name: true, desc: true, sdesc: true },
    });
    if (!card)
        return res.status(404).json({ error: `Was not able to find the card with passcode ${passcode}` })

    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${passcode}`);
    if (!response.ok)
        return res.status(response.status).json({ error: 'Problem fetching from card image api, passcode may be invalid.' });

    const json = await response.json();

    return res.status(200).json({ ...card, url: json.data[0].card_images[0].image_url } as SearchResponse);
}
