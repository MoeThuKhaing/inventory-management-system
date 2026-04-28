import { connectDB } from "@/lib/db";

export async function POST(req) {

  try {

    //Extract serial number from request
    const { serial } = await req.json();

    //Ensure serial number is provided
    if (!serial) {
      return Response.json(
        { error: "Serial number is required" },
        { status: 400 }
      );
    }

    //Connect to the database
    const db = await connectDB();

    //Retrieve appliance AND associated user details
    const [rows] = await db.execute( //JOIN combines Appliance and User tables using UserID
      `SELECT * FROM Appliance
       JOIN User ON Appliance.UserID = User.UserID
       WHERE SerialNumber = ?`,
      [serial]
    );

    //Handle the case where no matching appliance is found
    if (rows.length === 0) {
      return Response.json(
        { error: "No matching appliance found" },
        { status: 404 }
      );
    }

    //Return the first matching record
    return Response.json(rows[0]);

  } catch (err) {

    //Handle server/database errors securely
    return Response.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}