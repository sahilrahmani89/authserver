import express from 'express'
import jwt from 'jsonwebtoken'
import User from './../model/User.js'

const router = express.Router()

router.get('/user', async(req, res) => {
   
    const token = req.headers['Authorization']?.split(' ')[1] || req.cookies.accessToken;

    if (!token) {
      return res.status(401).send('Unauthorized');
    }
  
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      console.log('decoded',decoded)
      const user = await User.findOne({'email':decoded.email})
      console.log('user',user)
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (err) {
      res.status(401).send('Unauthorized');
    }
  });

  export default router