const cosmos = require('@azure/cosmos');
const { CosmosClient } = cosmos;

const client = new CosmosClient(process.env.db18218026);
const container = client.database('UTSTS').container('UTSTS1');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    
    const newItem = { name : name, time: Date() };
    const { resource: createdItem } = await container.items.create(newItem);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}