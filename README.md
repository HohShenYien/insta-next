<div align="center">
  <img alt="Logo" src="https://user-images.githubusercontent.com/55322546/229516257-0e0fb6e6-6fad-4202-bc85-66b4b6a096c4.png" width="480" />
</div>
<h1 align="center">
  InstaNext
</h1>
<p align="center">
  This is the source codes for my blog series on <a href="" target="_blank">FullStack Instagram Clone with Next.js</a> on Hashnode.
</p>

## 🛠 Installation & Set Up
Please refer to Part 1 & Part 2 for the full installation process with explanation, but if you're at later series, here's how you can do it

1. Install the dependencies
   ```bash
   yarn
   ```

2. Create an empty `.env` file, and add an environment variable, `DATABASE_URL` which links to a PostgreSQL database
3. Initialize your database

   ```bash
   yarn migrate
   yarn seed # depends if you wish to prefill the database with values or not
   ```
   
4. Run the development server

   ```bash
   yarn dev
   ```
   
 
