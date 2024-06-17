const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const assert = require("assert");
const api = supertest(app);
const helper = require("../utils/test_helper");
const bcrypt = require("bcrypt");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with new username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "d63zhang",
      name: "Daniel Zhang",
      password: "1234",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper status code and message if username exists", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "random",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
  test("creation fails with proper status code and message if no password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("invalid password"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
  test("creation fails with proper status code and message if short password", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "a",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("invalid password"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
