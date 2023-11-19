import { RDSDataService, SecretsManager } from 'aws-sdk';
import { ExecuteStatementRequest } from "aws-sdk/clients/rdsdataservice";
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Server } from 'http';
import serverless from 'aws-serverless-express';
import 'dotenv/config'

const app = express();
const rdsDataService = new RDSDataService();
const secretsManager = new SecretsManager();

app.use(bodyParser.json());

// Secrets Manager からデータベースの認証情報を取得する関数
async function getDbCredentials(secretId: string): Promise<any> {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretId }).promise();
    return JSON.parse(data.SecretString || '{}');
  } catch (error) {
    console.error('Error fetching from Secrets Manager', error);
    throw error;
  }
}

app.get('/data', async (req: Request, res: Response) => {
  try {
    const credentials = await getDbCredentials(process.env.DB_CREDENTIALS_ID || '');
    const params: ExecuteStatementRequest = {
      resourceArn: process.env.RDS_RESOURCE_ARN || '',
      secretArn: process.env.SECRET_ARN || '',
      database: process.env.DATABASE_NAME || '',
      sql: "select * from information_schema.tables",
      includeResultMetadata: true
    };
    const data = await rdsDataService.executeStatement(params).promise();
    res.json(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

const server: Server = serverless.createServer(app);

export const handler: APIGatewayProxyHandler = (event, context) => {
  return serverless.proxy(server, event, context, 'PROMISE').promise;
};
