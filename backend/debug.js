try {
    console.log("Attempting to require server.js...");
    const app = require('./src/server.js');
    console.log("server.js required successfully.");
} catch (e) {
    console.log("---------------- ERROR START ----------------");
    console.log("MESSAGE:", e.message);
    console.log("STACK:", e.stack);
    console.log("---------------- ERROR END ----------------");
}
