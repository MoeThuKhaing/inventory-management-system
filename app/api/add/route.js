import { connectDB } from "@/lib/db";

export async function POST(req) {

  try {
    // Get data submitted from frontend form
    const data = await req.json();

    // Connect to MySQL database using helper function
    const db = await connectDB();

    // Format for the eircode: 3 characters + space + 4 characters (e.g. D02 X285)
    const eircodeRegex = /^[A-Z0-9]{3}\s[A-Z0-9]{4}$/i;

    //Ensure required fields are not empty
    if (!data.firstName || !data.lastName || !data.serial) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    if (!eircodeRegex.test(data.eircode)) {
      return Response.json({ error: "Invalid Eircode format" }, { status: 400 });
    }

    //Uses prepared statement to prevent SQL injection
    const [user] = await db.execute(
      "INSERT INTO User (FirstName, LastName, Email, Eircode) VALUES (?, ?, ?, ?)",
      [data.firstName, data.lastName, data.email, data.eircode]
    );

    //Get generated UserID (primary key)
    const userId = user.insertId;

    //Insert the appliance linked to user via foreign key (UserID)
    await db.execute(
      `INSERT INTO Appliance 
      (UserID, ApplianceType, Brand, ModelNumber, SerialNumber, PurchaseDate, WarrantyDate, Cost) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        data.appliance,
        data.brand,
        data.model,
        data.serial,
        data.purchaseDate,
        data.warrantyDate,
        data.cost,
      ]
    );

    // Return the success response to the user
    return Response.json({ message: "Appliance added successfully" });

  } catch (err) {

    //for handling the unexpected server/database errors securely
    return Response.json(
      { error: "Server error occurred" },
      { status: 500 }
    );
  }
}