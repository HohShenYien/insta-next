import { Post, PrismaClient, User } from "@prisma/client";
import {
  fakeImage,
  fakePost,
  fakePostLike,
  fakeStory,
  fakeUser,
  fakeUserFollower,
} from "./factories";
const prisma = new PrismaClient();

async function main() {
  const users: User[] = [];
  const posts: Post[] = [];
  // creating 2 users
  for (let i = 0; i < 2; i++) {
    const user = await prisma.user.create({ data: fakeUser() });
    // attaching a profile picture to the user
    await prisma.image.create({ data: fakeImage(user.id, "user") });
    users.push(user);

    // each user has 3 posts
    for (let j = 0; j < 3; j++) {
      const post = await prisma.post.create({ data: fakePost(user) });
      posts.push(post);

      // each post has 3 images
      for (let k = 0; k < 3; k++) {
        await prisma.image.create({ data: fakeImage(post.id, "post", k) });
      }
    }

    // each user has 2 stories
    for (let j = 0; j < 2; j++) {
      const story = await prisma.story.create({ data: fakeStory(user) });

      // each story has 1 image
      await prisma.image.create({ data: fakeImage(story.id, "story") });
    }
  }

  // let's make first 2 users like each other
  await prisma.userFollower.create({
    data: fakeUserFollower(users[0], users[1]),
  });
  await prisma.userFollower.create({
    data: fakeUserFollower(users[1], users[0]),
  });

  //let's make the second user likes every post of first user
  for (let i = 0; i < 3; i++) {
    await prisma.postLike.create({ data: fakePostLike(users[1], posts[i]) });
  }
}

// copied from https://www.prisma.io/docs/guides/database/seed-database
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
