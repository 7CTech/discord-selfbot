module.exports = {
    name: "kill",
    run: (client, message) => {
        console.log("kill called");
        client.destroy();
    }
};