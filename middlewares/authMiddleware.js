const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Formato esperado: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário à requisição
        next(); // Continua para a próxima função
    } catch (error) {
        return res.status(401).json({ erro: "Token inválido" });
    }
};

module.exports = authMiddleware;