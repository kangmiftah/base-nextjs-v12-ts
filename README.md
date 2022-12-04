## Getting Started

First copy .env.local.example .env.local

```bash
cp .env.example .env
# or
copy .env.example .env
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```


### prisma generate
```bash
npx prisma generate
```
### prisma update database
```bash
npx prisma db push
```

### prisma seeder db
```bash
npx prisma db seed
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) with your browser to see the SwaggerUI documentation API.
