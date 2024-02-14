const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require("./db/connection.js");

describe("Social Sequelzie Test", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the test suite is run
    await db.sync({ force: true });
  });

  //user tests
  test("can create User", async function () {
    const testUser = await User.create({
      username: "George",
      email: "123@email.com",
    });
    expect(testUser.username).toBe("George");
  });

  test("User-Profile association", async () => {
    const user = await User.create({
      username: "Nat",
      email: "123@email.com",
    });

    const profile = await Profile.create({
      bio: "this is my bio",
      profilePicture: "url",
      birthday: "03/04/1999",
    });

    await user.setProfile(profile);
    const associatedProfile = await user.getProfile();

    expect(associatedProfile instanceof Profile).toBeTruthy();
  });

  test("User-Post association", async () => {
    const user = await User.create({
      username: "Nat",
      email: "123@email.com",
    });

    const posts = await Post.bulkCreate([
      {
        title: "title",
        body: "this is my first post",
        createdAt: "04/16/1998",
      },
      {
        title: "title1",
        body: "this is my second post",
        createdAt: "04/16/1999",
      },
    ]);

    await user.setPosts();
    const associatedPost = await user.getPosts();

    expect(associatedPost).toBeTruthy();
  });

  //profile tests
  test("can create Profile", async function () {
    const profile = await Profile.create({
      bio: "this is my bio",
      profilePicture: "url",
      birthday: "03/04/1999",
    });

    expect(profile.bio).toBe("this is my bio");
  });

  //post tests
  test("can create Post", async function () {
    const post = await Post.create({
      title: "title",
      body: "this is my post",
      createdAt: "04/16/1998",
    });

    expect(post.title).toBe("title");
  });

  test("Post-Comment association", async () => {
    const post = await Post.create({
      title: "title",
      body: "this is my post",
      createdAt: "04/16/1998",
    });

    const comments = await Comment.bulkCreate([
      {
        body: "this is my first comment",
        createdAt: "04/05/2023",
      },
      {
        body: "this is my second comment",
        createdAt: "04/05/2023",
      },
    ]);

    await post.setComments();
    const associatedComments = await post.getComments();

    expect(associatedComments).toBeTruthy();
  });

  //comment tests
  test("can create Comment", async function () {
    const comment = await Comment.create({
      body: "this is my comment",
      createdAt: "04/05/2023",
    });
    expect(comment.body).toBe("this is my comment");
  });

  //like tests
  test("Like", async function () {
    const like = await Like.create({
      reactionType: "like",
      createdAt: "12/24/2008",
    });

    expect(like.reactionType).toBe("like");
  });

  test("User has many Likes association", async () => {
    const user = await User.create({
      username: "Nat",
      email: "123@email.com",
    });

    const likes = await Like.bulkCreate([
      {
        reactionType: "like1",
        createdAt: "12/24/2008",
      },
      {
        reactionType: "like2",
        createdAt: "12/24/2008",
      },
    ]);

    await User.setLikes(likes);
    const associatedLikes = await User.getLikes();

    expect(associatedLikes).toBeTruthy();
  });

  test("Like has many users association", async () => {
    const users = await User.bulkCreate([
      {
        username: "Nat",
        email: "123@email.com",
      },
      {
        username: "Jess",
        email: "123@email.com",
      },
    ]);

    const like = await Like.create({
      reactionType: "like1",
      createdAt: "12/24/2008",
    });

    await Like.setUser(users);
    const associatedUsers = await Like.getUsers();

    expect(associatedUsers).toBeTruthy();
  });
});
