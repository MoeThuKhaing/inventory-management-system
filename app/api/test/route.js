import { connectDB } from "@/lib/db";

export async function GET() {

  try {

    //Establish the connection to MySQL database
    const db = await connectDB();

    //Run a simple test query to verify database connectivity
    const [rows] = await db.execute("SELECT 1 + 1 AS result");//"SELECT 1 + 1" is commonly used to confirm database is working

    //Return the successful response with test result
    return new Response(
      JSON.stringify(rows),
      { status: 200 }
    );

  } catch (err) {

    //Handle the database connection or query errors
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}