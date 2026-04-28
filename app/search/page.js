"use client";
import { useState } from "react";
import Link from "next/link";

export default function SearchPage() {

  //Store serial number entered by user
  const [serial, setSerial] = useState("");

  //Store the search result returned from backend
  const [result, setResult] = useState(null);

  //Store message when no result is found
  const [message, setMessage] = useState("");

  //Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); //for preventing the page refresh

    if (!serial) {
      alert("Please enter a serial number");
      return;
    }

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serial }),
    });

    //get response data
    const data = await res.json();

    // for checking the result
    if (!res.ok || !data.SerialNumber) {
      setMessage("No matching appliance found");
      setResult(null);
    } else {
      setResult(data);
      setMessage("");
    }
  };

  return (
    <div className="container">

      <h2>Search Appliance</h2>
      <Link href="/" className="backHome">Home</Link>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Enter Serial Number"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* display the error message*/}
      {message && <p className="error">{message}</p>}

      {/* display the result if it is found */}
      {result && (
        <div className="result">
          <p><strong>Brand:</strong> {result.Brand}</p>
          <p><strong>Serial:</strong> {result.SerialNumber}</p>
        </div>
      )}

    </div>
  );
}