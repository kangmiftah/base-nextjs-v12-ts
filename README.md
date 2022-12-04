# how to use this template
Template for nextjs and iclude with module : 
   - Redux Tools [RTK Query etc.]
   - Tailwind css with custom style and components
   - Prisma for orm db connection
   - swagger UI for API Doc
   - Template admin
   - Template public
   - React component with tailwond compatible
## Getting Started

### Create next app with template

```bash
   npx create-next-app nama_app --example=https://github.com/kangmiftah/base-nextjs-v12-ts 
```
### copy .env.example .env

```bash
cp .env.example .env
# or
copy .env.example .env
```

### run the development server:

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
