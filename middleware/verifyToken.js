import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) =>{ 

    const token = req.headers.authorization?.split(' ')[1] || req.cookies.accessToken;
    if (!token) {
        return res.sendStatus(403); // Forbidden if token is not provided
    }

    jwt.verify(token,process.env.JWT_SECRET,(err,res)=>{
        if(err){
            res.sendStatus(403)
        }
        req.user = {name:res.name,email:res.email,userId:res.userId}
        next()
    })
}