import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(404).json({ error: 'Invalid method.' });
    
    const { passcode } = req.query;
    if (!passcode || typeof passcode !== 'string') return res.status(409).json({ error: 'Invalid passcode.' });

    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${passcode}`);
    if (!response.ok) return res.status(response.status).json({error: 'Problem fetching from card image api.'});

    const json = await response.json();

    res.status(200).json(json);
}