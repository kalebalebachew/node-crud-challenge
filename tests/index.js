const { server, app } = require("../index");
const axios = require("axios");
const assert = require("assert");

describe("Test Person CRUD API", function () {
  this.timeout(10000);

  before(async function () {
    if (!server || !server.listening) {
      await new Promise((resolve) => {
        server.listen(9000, () => {
          console.log("Server is running on port 9000 "); //changed the port to 9000 because something i don't know of is running on port 3000
          resolve();
        });
      });
    }
  });

  after(function (done) {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  it("Test Get", async function () {
    const res = await axios.get("http://localhost:9000/person");
    assert.equal(res.status, 200);
    assert(Array.isArray(res.data));
  });

  it("Test Get By ID", async function () {
    const res = await axios.get("http://localhost:9000/person/1");
    assert.equal(res.status, 200);
    assert.equal(res.data.name, "Sam");
  });

  it("Test Post", async function () {
    const newUser = {
      name: "Keber",
      age: 24,
      hobbies: ["dubstep"],
    };

    const res = await axios.post("http://localhost:9000/person", newUser);
    assert.equal(res.status, 200);

    const persons = app.get("db");
    const insertedUser = Object.assign({}, persons[1]);
    delete insertedUser.id;
    assert.deepEqual(insertedUser, newUser);
  });

  // Validation Tests
  it("Test Post Validation All Empty", async function () {
    let error;
    try {
      await axios.post("http://localhost:9000/person", {});
    } catch (err) {
      error = err.response || { status: 500 };
    }
    assert.equal(error.status, 400);
    assert.equal(error.data.message, "Name is required");
  });

  it("Test Post Validation Name Empty", async function () {
    let error;
    try {
      await axios.post("http://localhost:9000/person", {
        age: 26,
        hobbies: [],
      });
    } catch (err) {
      error = err.response || { status: 500 };
    }
    assert.equal(error.status, 400);
    assert.equal(error.data.message, "Name is required");
  });

  it("Test Post Validation Age Empty", async function () {
    let error;
    try {
      await axios.post("http://localhost:9000/person", {
        name: "Sam",
        hobbies: [],
      });
    } catch (err) {
      error = err.response || { status: 500 };
    }
    assert.equal(error.status, 400);
    assert.equal(error.data.message, "Age is required");
  });

  it("Test Post Validation Age Not a Number", async function () {
    let error;
    try {
      await axios.post("http://localhost:9000/person", {
        name: "Sam",
        age: "bad",
        hobbies: [],
      });
    } catch (err) {
      error = err.response || { status: 500 };
    }
    assert.equal(error.status, 400);
    assert.equal(error.data.message, "Age must be a number");
  });

  it("Test Post Validation Hobbies Empty", async function () {
    let error;
    try {
      await axios.post("http://localhost:9000/person", {
        name: "Sam",
        age: 21,
      });
    } catch (err) {
      error = err.response || { status: 500 };
    }
    assert.equal(error.status, 400);
    assert.equal(error.data.message, "Hobbies are required");
  });

  it("Test Post Validation Hobbies Not Array", async function () {
    let error;
    try {
      await axios.post("http://localhost:9000/person", {
        name: "Sam",
        age: 21,
        hobbies: "fighting",
      });
    } catch (err) {
      error = err.response || { status: 500 };
    }
    assert.equal(error.status, 400);
    assert.equal(error.data.message, "Hobbies must be an array");
  });

  it("Test Put", async function () {
    const updatedUser = {
      name: "Sam",
      age: 26,
      hobbies: ["dubstep", "jazz"],
    };
    const res = await axios.put("http://localhost:9000/person/1", updatedUser);
    assert.equal(res.status, 200);

    const persons = app.get("db");
    updatedUser.id = "1";
    assert.deepEqual(persons[0], updatedUser);
  });

  it("Test Delete", async function () {
    const res = await axios.delete("http://localhost:9000/person/1");
    assert.equal(res.status, 200);

    const persons = app.get("db");
    assert.deepEqual(
      persons.filter((p) => p.id === "1"),
      []
    );
  });

  it("Test Non-Existing User", async function () {
    let error;
    try {
      await axios.get("http://localhost:9000/person/100");
    } catch (err) {
      error = err.response || { status: 500 };
    }
    assert.equal(error.status, 404);
  });

  it("Test Non-Existing Endpoint", async function () {
    let error;
    try {
      await axios.get("http://localhost:9000/non-existing-endpoint");
    } catch (err) {
      error = err.response || { status: 500 };
    }
    assert.equal(error.status, 404);
  });
});
