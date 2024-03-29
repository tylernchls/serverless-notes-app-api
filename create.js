import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  
  const params = {
    TableName: "notes",
    Item: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime()
    }
  };

  console.log('params', params)
  

  try {
    await dynamoDbLib.call("put", params);
    
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}