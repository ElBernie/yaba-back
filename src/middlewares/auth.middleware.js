import Jwt from 'jsonwebtoken';

const authentification = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    const jwt = req.headers.authorization.split(' ')[1]; // on découpe la string en 2 parties, à partir du premier espace, puis on selectionne directement la 2ème partie découpée

    try {
      const verifiedJWT = Jwt.verify(jwt, process.env.JWT_SECRET); // on vérifie que le JWT est valide et n'a pas été modifié

      // on attache les données du JWT décryptées à la requête, pour pouvoir l'utiliser dans nos routes
      req.user = {
        id: verifiedJWT.id,
      };

      next();
    } catch (jwtVerificationError) {
      res.status(401).json({ message: 'INVALID_TOKEN' });
    }
  } else {
    res.status(401).send({ message: 'MISSING_TOKEN' });
  }
};
export default authentification;
