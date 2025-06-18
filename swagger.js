const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Leia Comigo API 📚',
      version: '1.0.0',
      description: 'Documentação da API da Biblioteca Social Leia Comigo',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

console.log('📦 __dirname: (Onde está o arquivo swagger.js?)', __dirname);
console.log('📂 Caminho configurado para APIs: (Onde o Swagger está procurando suas rotas?)', path.join(__dirname, './routes/*.js'));

const swaggerSpec = swaggerJSDoc(options);

console.log('📝 Swagger Specification Gerada: (O que o Swagger conseguiu montar?)');
console.log(JSON.stringify(swaggerSpec, null, 2));

// >>>>>> Mantenha esta exportação simples no swagger.js <<<<<<
module.exports = {
  swaggerSpec: swaggerSpec, // Exporta APENAS o swaggerSpec
};
// >>>>>> FIM <<<<<<