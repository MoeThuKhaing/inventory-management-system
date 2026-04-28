"use client";
import { useState } from "react";
import Link from "next/link";

export default function DeletePage() {
  const [serial, setSerial] = useState("");//Store the serial number entered by the user

  const handleDelete = async () => {// Uses POST request and sends the serial number as JSON
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ serial }),
    });

    alert("Deleted");//successful message for the user 
  };

  return (
    <div className="container">
      <h2>Delete Appliance</h2>
      <Link href="/" className="backHome">Home</Link>
      <input value={serial} onChange={(e) => setSerial(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}