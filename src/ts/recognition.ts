"use strict";

import crypto from "crypto";
import { Request, Response } from "express";
import fetch from "node-fetch";
import { RequestBody, ResponseRecognisePath } from "../types/types";

const elmApplicationKey = "5accae9d-8ad7-425f-8b4b-0e312f082643";
const HMACkey = "9b1436e5-e677-403e-a9f5-04c974b8fa03";

const myScriptServer = "https://cloud.myscript.com";
const myscriptBatchEndPoint = "/api/v4.0/iink/batch";

async function recognisePath(req: Request, res: Response) {
  const fnName = "recognisePath";
  const { languageISO, jsonData } = req.body as RequestBody &
    ResponseRecognisePath;
  const strokeArray = JSON.parse(jsonData).paths;
  console.log(`Recognising ${strokeArray.length} strokes`);

  // The strokeArray format from the Lynx client will look like this
  // 		[
  // 			{
  // 							x: [123, 112, 445, 334],
  // 							y: [923, 612, 845, 734],
  // 			},
  // 			{
  // 							x: [123, 112, 445, 334],
  // 							y: [923, 612, 845, 734],
  // 			},
  // 			{
  // 							x: [123, 112, 445, 334],
  // 							y: [923, 612, 845, 734],
  // 			}
  // 		]

  // Construct the requestBody object to post to MyScript based on their API: https://swaggerui.myscript.com/#/Batch_mode/batch

  const requestBody: RequestBody = {
    configuration: {
      lang: languageISO,
    },
    contentType: "Text",
    strokeGroups: [],
  };

  // Authentication step for API access - No need to alter these two lines
  const strData = JSON.stringify(requestBody);
  const hmacData = computeHmac(strData, elmApplicationKey, HMACkey);

  // TODO: Place hmac signature into headers before posting
  const response = await fetch(myScriptServer + myscriptBatchEndPoint, {
    headers: {
      applicationKey: elmApplicationKey,
      Accept: "application/vnd.myscript.jiix,application/json",
      "Content-Type": "application/json",
      "x-myscript-hmac": hmacData,
    },
    body: strData,
    method: "POST",
  });
  if (response.status !== 200) {
    console.log(`${fnName}: Error: ${response.statusText}`);
    res.status(response.status).send(response.statusText);
    return;
  }

  const json = await response.json();
  // TODO: Send back correct data from response to pass unit test
  console.log("json", json);

  const label = "<Put the correct value in here>";
  res.status(200).send(label);
}

function computeHmac(
  input: string | Record<string, any>,
  applicationKey: string,
  hmacKey: string
): string {
  const jsonInput = typeof input === "object" ? JSON.stringify(input) : input;
  return crypto
    .createHmac("sha512", applicationKey + hmacKey)
    .update(jsonInput)
    .digest("hex");
}

export default {
  recognisePath,
};
