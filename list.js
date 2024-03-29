import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context, callback) {
    const params = {
        TableName: 'notes',
        KeyConditionExpression: 'userid = :userid',
        ExpressionAttributeValues: {
            ":userid": event.requestContext.identity.cognitoIdentityId
        }
    }

    try {
        const result = await dynamoDbLib.call("query", params);
        callback(null, success(result.Items));
      } catch (e) {
        callback(null, failure({ status: false }));
      }
    
}
