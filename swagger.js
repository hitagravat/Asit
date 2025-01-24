const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const OpenApiConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Asit API Documentation",
      version: "1.0.0",
      description: "API Documentation For The Asit App",
    }
  },
  apis: [
    "./index.js",
    "./auth_router.js",
    "./user_router.js",
    "./query_router.js",
    "./news_router.js",
    "./admission_router.js"
  ]
}

const SwaggerSpec = swaggerJsDoc(OpenApiConfig);

function swaggerDocs(app, port) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(SwaggerSpec));
  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(SwaggerSpec);
  });

  console.log(`Documenation is available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
