import express from 'express'
import User from './../model/User.js'
import { verifyToken } from '../middleware/verifyToken.js';
import { responseMsg } from '../helper/response.js';

const router = express.Router()

router.get('/user', verifyToken, async(req, res) => {
    try {
      const user = await User.findOne({ userId: req.user.userId }).select('-password');
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).json({...responseMsg,statusCode:200,data:user});
    } catch (err) {
      res.status(401).json({...responseMsg,statusCode:200,message:'Unauthorized'})
    }
  });

  export default router