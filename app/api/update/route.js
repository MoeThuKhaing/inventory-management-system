import { connectDB } from "@/lib/db";

export async function POST(req) {

  try {

    //Extract updated appliance data from request body
    const data = await req.json();

    //Ensure the required fields are provided
    if (!data.SerialNumber || !data.brand) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    //Validate serial number format (e.g. XXXX-XXXX-XXXX)
    const serialRegex = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;

    if (!serialRegex.test(data.SerialNumber)) {
      return Response.json(
        { error: "Invalid serial format" },
        { status: 400 }
      );
    }

    //Connect to MySQL database
    const db = await connectDB();
    //Update appliance record (excluding unique identifiers)
    const [result] = await db.execute(
      "UPDATE Appliance SET Brand=? WHERE SerialNumber=?",
      [data.brand, data.SerialNumber]//Uses SerialNumber to locate record
    );

    //Check if any record was updated
    if (result.affectedRows === 0) {
      return Response.json(
        { error: "No appliance found to update" },
        { status: 404 }
      );
    }

    //Return success response
    return Response.json({ message: "Appliance updated successfully" });

  } catch (err) {

    //Handle server/database errors securely
    return Response.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}