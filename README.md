## Eskalate Full-Stack Backend

### Overview
Backend API built with NestJS to power the Eskalate full‑stack assessment. It exposes REST endpoints to manage Restaurants and Foods with full CRUD, request validation, clear error handling, and a layered architecture separating persistence documents, domain entities, and response transfer objects (RTOs).

### Tech Stack
- **Runtime/Language**: Node.js (ESM), TypeScript
- **Framework**: NestJS 11
- **Database**: MongoDB with Mongoose
- **Validation**: class-validator, class-transformer
- **Configuration**: @nestjs/config
- **Dev tooling**: ESLint 9, Prettier, Jest (scaffolded), pnpm

### Key Features
- **RESTful CRUD** for Restaurants and Foods
  - Create, Read (list + by id), Update, Delete
  - Filter foods by `restaurantId`
- **Clear endpoint naming** with global prefix `/api`
- **Validation & Transformation** using DTOs and Nest global `ValidationPipe`
- **Consistent error handling** with HTTP status codes and meaningful messages
- **Layered models**
  - Mongoose schemas (documents) for persistence
  - Entities built from documents (domain shape)
  - RTOs built from entities (response shape)
- **ESM/NodeNext** module resolution with explicit `.js` extensions in local imports
- **CORS enabled** for frontend integration

### Project Structure

```
src/
  app.module.ts
  main.ts
  common/
    dtos/
      food/
        create-food.dto.ts
        update-food.dto.ts
      restaurant/
        create-restaurant.dto.ts
        update-restaurant.dto.ts
    entities/
      food/food.entity.ts
      restaurant/restaurant.entity.ts
    models/
      food/food.schema.ts
      resturant/restaurant.schema.ts
    pipes/
      parse-objectid.pipe.ts
  foods/
    foods.module.ts
    foods.service.ts
    foods.controller.ts
  restaurants/
    restaurants.module.ts
    restaurants.service.ts
    restaurants.controller.ts
```

### Architecture
- **Mongoose Schemas (Documents)**: Define persistence shape and constraints. Example: `Food` and `Restaurant` schemas in `src/common/models/...`.
- **Entities**: Domain objects created from documents via `fromDocument` methods. They normalize IDs and select only fields the domain needs.
- **RTOs**: Output models created from entities via `fromEntity`/`fromEntities`, ensuring the API response is stable and decoupled from persistence and domain layers.
- **DTOs**: Request models with validation rules; used by controllers to validate payloads.
- **Services**: Application logic. Return entities (never raw documents) by mapping documents to entities.
- **Controllers**: HTTP layer. Map entities to RTOs before responding.

### API Endpoints

Base URL: `/api`

- **Restaurants**
  - `GET /restaurants` → list restaurants
  - `POST /restaurants` → create restaurant
  - `GET /restaurants/:id` → get by id
  - `PUT /restaurants/:id` → update by id
  - `DELETE /restaurants/:id` → remove by id

- **Foods**
  - `GET /foods` → list foods (supports `?restaurantId=<id>`)
  - `POST /foods` → create food
  - `GET /foods/:id` → get by id
  - `PUT /foods/:id` → update by id
  - `DELETE /foods/:id` → remove by id

### Request/Response Models

- **DTOs** (requests)
  - `CreateRestaurantDto`: `{ name: string; address?: string }`
  - `UpdateRestaurantDto`: all fields optional
  - `CreateFoodDto`: `{ name: string; price: number; restaurantId: string; description?: string }`
  - `UpdateFoodDto`: all fields optional

- **RTOs** (responses)
  - `RestaurantRto`: `{ id: string; name: string; address?: string }`
  - `FoodRto`: `{ id: string; name: string; price: number; restaurantId: string; description?: string }`

### Validation & Error Handling
- Global `ValidationPipe` with `transform`, `whitelist`, and `forbidNonWhitelisted` is enabled.
- Path parameters expecting MongoDB ObjectId use `ParseObjectIdPipe` which throws `400 Bad Request` on invalid IDs.
- Not found resources return `404` with descriptive messages.

### Configuration
- Environment variables are loaded via `@nestjs/config`.
- Required variables:
  - `MONGODB_URI` (e.g., `mongodb://127.0.0.1:27017/eskalate`)
  - `PORT` (default: 3000)
- If `MONGODB_URI` is not set, configure it in a local `.env` file in the project root.

Example `.env`:

```
MONGODB_URI=mongodb://127.0.0.1:27017/eskalate
PORT=3000
```

### Scripts
- **Install**: `pnpm install`
- **Start (dev)**: `pnpm run start:dev`
- **Start (prod)**: `pnpm run start:prod`
- **Build**: `pnpm run build`
- **Lint**: `pnpm run lint`
- **Test (unit)**: `pnpm run test`
- **Test (e2e)**: `pnpm run test:e2e`

### Local Development
1. Ensure MongoDB is running locally or have a connection string (e.g., MongoDB Atlas).
2. Create `.env` with `MONGODB_URI` and `PORT`.
3. Run `pnpm install`.
4. Start dev server: `pnpm run start:dev`.
5. The API will be available at `http://localhost:3000/api`.

### Packages Used
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`
- `@nestjs/mongoose`, `mongoose`
- `@nestjs/config`
- `class-validator`, `class-transformer`
- `@nestjs/mapped-types`
- Tooling: `eslint`, `prettier`, `jest`, `ts-jest`, `ts-node`, `tsconfig-paths`

### Design Decisions
- **ESM/NodeNext**: The project uses `module: nodenext`. All local relative imports include `.js` extensions to support NodeNext resolution in both TS and emitted JS.
- **Domain separation**: Controllers never return raw MongoDB documents. Services return domain entities; controllers map them to RTOs for responses.
- **Extensibility**: Adding new features follows the same pattern: schema (document) → entity → RTO + DTOs → service → controller.

### Future Improvements
- API documentation with Swagger (OpenAPI)
- Database migrations/seed scripts
- Pagination, sorting, and search for listing endpoints
- Integration tests targeting the controllers and services

### License
MIT (project scaffolding based on NestJS). 
