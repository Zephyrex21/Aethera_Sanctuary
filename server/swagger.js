const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Aethera API",
    version: "2.0.0",
    description: "API for Aethera — Sanctuary of Rare Blooms. Serves data for 30 of the world's rarest flowers.",
  },
  servers: [{ description: "Current environment" }],
  tags: [
    { name: "Flowers", description: "Flower data endpoints" },
    { name: "Health", description: "Service status" },
  ],
  paths: {
    "/api/flowers": {
      get: {
        tags: ["Flowers"],
        summary: "Get all flowers (summary view)",
        description: "Returns all 30 flowers with summary fields only (no long-form text), sorted by display order.",
        responses: {
          200: {
            description: "List of flowers",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    count: { type: "integer", example: 30 },
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/FlowerSummary" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
    },
    "/api/flowers/{id}": {
      get: {
        tags: ["Flowers"],
        summary: "Get a single flower's full detail",
        description: "Returns the complete record for one flower, including description, history, and interesting facts.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Flower slug, e.g. ghost-orchid",
            schema: { type: "string", example: "ghost-orchid" },
          },
        ],
        responses: {
          200: {
            description: "Full flower record",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: { $ref: "#/components/schemas/Flower" },
                  },
                },
              },
            },
          },
          404: {
            description: "Flower not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    error: { type: "string", example: "Not found" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/ServerError" },
        },
      },
    },
    "/api/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        description: "Quick check that the API is up and responding.",
        responses: {
          200: {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                    message: { type: "string", example: "Aethera API running 🌸" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    responses: {
      ServerError: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                error: { type: "string" },
              },
            },
          },
        },
      },
    },
    schemas: {
      FlowerSummary: {
        type: "object",
        properties: {
          _id: { type: "string", example: "ghost-orchid" },
          name: { type: "string", example: "Ghost Orchid" },
          scientificName: { type: "string", example: "Dendrophylax lindenii" },
          origin: { type: "string", example: "Florida, Cuba" },
          rarity: { type: "string", example: "Extremely Rare" },
          image: { type: "string", example: "/flowers/ghost-orchid.png" },
          poeticLine: { type: "string", example: "A pale apparition floating in the swamp's shadow." },
          tags: {
            type: "array",
            items: { type: "string", enum: ["Extinct", "Endangered", "Rare", "Unusual", "Priceless", "Mythic"] },
          },
          featured: { type: "boolean", example: true },
          order: { type: "integer", example: 1 },
        },
      },
      Flower: {
        allOf: [
          { $ref: "#/components/schemas/FlowerSummary" },
          {
            type: "object",
            properties: {
              description: { type: "string" },
              interestingFact: { type: "string" },
              history: { type: "string" },
              uniqueness: { type: "string" },
            },
          },
        ],
      },
    },
  },
};

export default swaggerSpec;
