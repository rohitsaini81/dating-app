class Database {
    // USERS = [{username:"rohitsaini81",password:1234,sessionId:234234}];

    registered_users = [
        {
            email: "rohit@gmail.com",
            username: "rohit",
            password: "password123",
            sessionId: "abc123"
        },
        {
            username: "rohitsaini81",
            password: "1234",
            sessionId: "def456"
        }]

}
const database = new Database();

export default database;