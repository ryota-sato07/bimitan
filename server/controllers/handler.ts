import { RDSDataService, SecretsManager } from 'aws-sdk';
import { ExecuteStatementRequest } from "aws-sdk/clients/rdsdataservice";
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Server } from 'http';
import serverless from 'aws-serverless-express';
import 'dotenv/config'

// --[ Variables ]--------------------------------------------------------------
const app = express();
const rdsDataService = new RDSDataService({ region: process.env.AWS_REGION });
const secretsManager = new SecretsManager({ region: process.env.AWS_REGION });

// --[ Methods ]----------------------------------------------------------------
app.use(bodyParser.json());

/**
 * Secrets Manager からデータベースの認証情報を取得する関数
 */
async function getDbCredentials(secretId: string): Promise<any> {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretId }).promise();
    return JSON.parse(data.SecretString || '{}');
  } catch (error) {
    console.error('Error fetching from Secrets Manager', error);
    throw error;
  }
}

/**
 * データの取得関数
 */
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

/**
 * Lambda 関数の外での Express サーバの初期化
 */
const server: Server = serverless.createServer(app);

/**
 * Lambda で Express アプリケーションをハンドリングするブリッジ
 */
export const handler: APIGatewayProxyHandler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return serverless.proxy(server, event, context, 'PROMISE').promise;
};
