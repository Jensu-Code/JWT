import mysql2 from 'mysql2/promise';
import {HOST,PASSWORD,PORT_DATA_BASE,USER,DATA_BASE} from '../config.js'

export const conect = async()=>{
    try {
        const connection =await mysql2.createConnection({
            host:HOST,
            user:USER,
            database: DATA_BASE,
            password:PASSWORD,
            port:PORT_DATA_BASE
        }) 
        console.log('conection exitosa')
        return connection;
    } catch (error) {
        console.error(error);
    }
}