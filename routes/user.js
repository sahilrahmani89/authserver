// app.get('/auth/user', (req, res) => {
//     const token = req.cookies.accessToken;
//     if (!token) {
//       return res.status(401).send('Unauthorized');
//     }
  
//     try {
//       const decoded = jwt.verify(token, SECRET_KEY);
//       const user = users.find((u) => u.id === decoded.userId);
//       if (!user) {
//         return res.status(404).send('User not found');
//       }
//       res.json(user.profile);
//     } catch (err) {
//       res.status(401).send('Unauthorized');
//     }
//   });