import mysql from "mysql2/promise";

export async function connectDB() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "VMware1!", // 👈 put your MySQL password
    database: "appliance_inventory",
    port: 3306
  });
}