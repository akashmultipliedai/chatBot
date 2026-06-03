import express from "express";
const router = express.Router();
router.post('/', (req, res) => {
    res.send({
        message: "Hello from r1"
    });
    console.log("Hello, Server is running on port 3000");
});
export default router;
//# sourceMappingURL=r1.js.map