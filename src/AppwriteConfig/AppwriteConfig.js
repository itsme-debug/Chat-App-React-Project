import { Client, Account,Databases} from 'appwrite';
import conf from '../conf/conf';
export const client = new Client();

client
    .setEndpoint(conf.appWrite_EndPoint)
    .setProject(conf.appWrite_ProjectId); // Replace with your project ID

export const databases = new Databases(client)
export const account = new Account(client);
export { ID } from 'appwrite';
