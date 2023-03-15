# how to use this template
Template for nextjs and iclude with module : 
   - Redux Tools [RTK Query etc.]
   - Tailwind css with custom style and components
   - Prisma for orm db connection
   - swagger UI for API Doc
   - Template admin
   - Template public
   - React component with tailwind compatible
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


# UPDATE MENU
if your add menu in your app, please add in src/backend/db/menu/update-menu.ts

example 
```ts
    const menus = await prisma.menu.createMany({
      data : [
         //  ....
         {
            id: 5,
            name : "Menu",
            url : "/management-users/menu",
            hash_child: false,
            parent_id : 2,
            order_no: 5
         },
         // ADD Menu HERE OR CUSTOM
      ]
   })

   // add your role menu accessed role
    const roleMenu = await prisma.roleMenu.createMany({
      data: [
         //  ....
         {
            menu_id :5,
            role_id: 1
         }
         // ... add your access menu role here
      ]
   })

```
then run command on command prompt
```bash
npm run update-menu
# or
yarn update-menu
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://admin.localhost:3000](http://admin.localhost:3000) with your browser to see the result.
