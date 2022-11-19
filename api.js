export function setApp (app, client) {
    // import mongoDB schemas and models

    // ADD API ENDPOINTS UNDER HERE
    // EXAMPLES:
    app.get("/api", (req, res) => {
        res.json({ message: "Hello from server! (This is from an api call)" });
    })
    
    app.post("/api/example", async (req, res, next) => {
        console.log("called example api");
    });
}