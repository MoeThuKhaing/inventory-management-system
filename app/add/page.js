"use client";
import { useState } from "react";
import Link from "next/link";

export default function AddPage() {
  const [form, setForm] = useState({});//Store form input values entered by the user

  const handleChange = (e) => {//Update form state whenever user types into an input field
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {//Handle form submission and send data to backend API
    e.preventDefault();

    const res = await fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || data.error);//Display success or error message to user
  };

  return (
    <div className="container">
        <h2>Add Appliance</h2>
        <Link href="/" className="backHome">Home</Link>

      <form onSubmit={handleSubmit}>
        {/* Input details for the user */}
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="eircode" placeholder="Eircode" onChange={handleChange} />

        <input name="appliance" placeholder="Appliance Type" onChange={handleChange} />
        <input name="brand" placeholder="Brand" onChange={handleChange} />
        <input name="model" placeholder="Model" onChange={handleChange} />
        <input name="serial" placeholder="Serial" onChange={handleChange} />

        <input type="date" name="purchaseDate" onChange={handleChange} />
        <input type="date" name="warrantyDate" onChange={handleChange} />

        <input name="cost" placeholder="Cost" onChange={handleChange} />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}