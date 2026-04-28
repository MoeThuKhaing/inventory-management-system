import { connectDB } from "@/lib/db";

export async function POST(req) {

  try {

    //Extract the serial number from request body
    const { serial } = await req.json();

    //Ensure the serial number is provided
    if (!serial) {
      return Response.json(
        { error: "Serial number is required" },
        { status: 400 }
      );
    }

    //Connected to MySQL database
    const db = await connectDB();

    //Delete appliance record based on unique SerialNumber
    const [result] = await db.execute(
      "DELETE FROM Appliance WHERE SerialNumber=?",//Prepared statement prevents SQL injection
      [serial]
    );

    //Check if any row was actually deleted
    if (result.affectedRows === 0) {
      return Response.json(
        { error: "No appliance found with this serial number" },
        { status: 404 }
      );
    }

    //Return the success message to the user
    return Response.json({ message: "Appliance deleted successfully" });

  } catch (err) {

    //Handle server/database errors securely
    return Response.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}