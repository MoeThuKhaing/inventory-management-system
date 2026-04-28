"use client";

import { useState } from "react";
import Link from "next/link";

export default function UpdatePage() {

  //Store serial number entered by user
  const [serial, setSerial] = useState("");

  //Store appliance data retrieved from backend
  const [form, setForm] = useState(null);

  //Store error or status messages
  const [message, setMessage] = useState("");

  //Fetch appliance data using serial number
  const load = async () => {

    // Ensure the serial is provided
    if (!serial) {
      alert("Please enter a serial number");
      return;
    }

    const res = await fetch("/api/getOne", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Ensure the JSON format
      body: JSON.stringify({ serial }),
    });

    const data = await res.json();

    //to check if appliance not found
    if (!res.ok || !data.SerialNumber) {
      setMessage("No appliance found");
      setForm(null);
    } else {
      setForm(data); // Populate form (sticky behaviour)
      setMessage("");
    }
  };

  //Update form values when user edits fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //Send updated data to backend API
  const update = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    // for displaying the result to user
    if (res.ok) {
      alert(data.message || "Updated successfully");
    } else {
      alert(data.error || "Update failed");
    }
  };

  return (
    <div className="container">
      <h2>Update Appliance</h2>
      <Link href="/" className="backHome">⬅ Home</Link>
      <input
        placeholder="Enter Serial Number"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
      />
      <button onClick={load}>Load</button>

      {/*display the error the message */}
      {message && <p className="error">{message}</p>}

      {/* diplay the form if it is found*/}
      {form && (
        <form onSubmit={update}>

          <input
            name="brand"
            value={form.Brand}
            onChange={handleChange}
          />

          <button type="submit">Update</button>
        </form>
      )}

    </div>
  );
}