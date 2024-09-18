import { createHmac } from "crypto";

export const urlShortner = async (req:any, res:any, next:any) => {
    debugger
    if(!req.body.url) {
        return res.status(400).send(`url is required`)
    }

    const secret = process.env.APP_SECRET!;
    const encryptionAlgo = process.env.APP_ENCRYPTION_ALGO!;
    const appShortUrlLimit = process.env.APP_IDEAL_SHORT_URL_LIMIT!;

    const [from, to] = appShortUrlLimit.split('_');
    
    //created hash
    const hash = createHmac(encryptionAlgo, secret)
               .update(req.body.url)
               .digest('hex')
               .slice(parseInt(from), parseInt(to));
            
    res.send(hash)      
}

export default {urlShortner}