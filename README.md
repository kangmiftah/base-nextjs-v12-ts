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


Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) with your browser to see the SwaggerUI documentation API.
