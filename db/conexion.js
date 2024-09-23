import mysql2 from "mysql2/promise";
import { HOST, PASSWORD, PORT_DATA_BASE, USER, DATA_BASE } from "../config.js";
let connect = null;
export class Connection{
    static  async getConnection() {
        if (!connect) {
            try {
                connect=  await mysql2.createConnection({
                    host: HOST,
                    user: USER,
                    database: DATA_BASE,
                    password: PASSWORD,
                    port: PORT_DATA_BASE
                });  
                console.log("coneccion exitosa")
            } catch (error) {
                console.error("Error creating connection");
            }
           
        }
        return connect;
    };
    
}
