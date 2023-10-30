"use strict";

const app = require("../../app");

// 연결 포트 지정
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`express server running on port ${port}`)
});