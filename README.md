<div align="center">
  <img alt="Logo" src="https://user-images.githubusercontent.com/55322546/229516257-0e0fb6e6-6fad-4202-bc85-66b4b6a096c4.png" width="480" />
</div>
<h1 align="center">
  InstaNext
</h1>
<p align="center">
  This is the source codes for my blog series on <a href="https://blogs.shenyien.cyou/series/insta-next" target="_blank">FullStack Instagram Clone with Next.js</a> on Hashnode.
</p>
<div align="center">
  <img alt="Preview" src="https://user-images.githubusercontent.com/55322546/230150941-c7e1bea1-649c-45e7-ad0a-28671131b0cb.png" width="720" />
</div>

## 👓 Preview

You can find a live version of the project running on Vercel and Render below

**Vercel**: https://insta-next-alpha.vercel.app

**Render**: https://insta-next.onrender.com/

Here's the credentials of a random user if you wish to try it out (All users' passwords are secret)

```
email: Rod.Raynor20@hotmail.com
password: secret
```

Note: I've used a free version of the web & database server. You can expect them to run slow or even break due to that reason. (Mainly due to the limit of 5 concurrent sessions of the database)

## 🛠 Installation & Set Up

Please refer to the blogs for the full installation process with explanation, but here's the full installation for the final codes

1. Install the dependencies

   ```bash
   yarn
   ```

2. Copy `.env.example` into a new `.env` file, and add an environment variable, `DATABASE_URL` which links to a PostgreSQL database

3. Initialize your database

   ```bash
   yarn migrate
   yarn seed # depends if you wish to prefill the database with values or not
   ```

4. Run the development server

   ```bash
   yarn dev
   ```

## ❓ Why is Feature X missing?

I built this project solely for my [blog series](https://blogs.shenyien.cyou/series/insta-next), so this project isn't meant to be a full clone.
