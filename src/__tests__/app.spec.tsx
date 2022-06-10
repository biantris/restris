import {
  clearDbAndRestartCounters,
  connectMongoose,
  disconnectMongoose,
  createGetApiCall,
  //clearDatabase,
} from "../../test";

beforeAll(async () => {
  await connectMongoose;
});

beforeEach(async () => {
  await clearDbAndRestartCounters;
});

afterAll(async () => {
  await disconnectMongoose;
});

const url = "/";

it("should get api root correctly", async () => {
  const response = await createGetApiCall({ url });

  expect(response.body).toMatchSnapshot();
  expect(response.status).toBe(200);
});
