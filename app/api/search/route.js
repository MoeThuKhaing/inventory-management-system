import { connectDB } from "@/lib/db";

export async function POST(req) {

  try {

    //Extract serial number from request body
    const { serial } = await req.json();

    //Ensure serial number is provided
    if (!serial) {
      return Response.json(
        { error: "Serial number is required" },
        { status: 400 }
      );
    }

    //Validate serial number format (e.g. XXXX-XXXX-XXXX)
    const serialRegex = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;

    if (!serialRegex.test(serial)) {
      return Response.json(
        { error: "Invalid serial format" },
        { status: 400 }
      );
    }

    // Connect to MySQL database
    const db = await connectDB();

    //Retrieve appliance AND related user details
    const [rows] = await db.execute(//Uses JOIN to combine Appliance and User tables via UserID
      `SELECT * FROM Appliance
       JOIN User ON Appliance.UserID = User.UserID
       WHERE SerialNumber = ?`,
      [serial]
    );

    //Handle case where no record is found
    if (rows.length === 0) {
      return Response.json(
        { error: "No matching appliance found" },
        { status: 404 }
      );
    }

    //Return first matching record
    return Response.json(rows[0]);

  } catch (err) {

    //Handle unexpected server/database errors securely
    return Response.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}