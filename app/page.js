export default function Home() {
  return (
    <div className="container">
      <h1>🏠 House Appliance Inventory System</h1>

      <p style={{ textAlign: "center" }}>
        Manage your appliances easily
      </p>

      <div className="menu">
        <a href="/add"><button>Add Appliance</button></a>
        <a href="/search"><button>Search Appliance</button></a>
        <a href="/update"><button>Update Appliance</button></a>
        <a href="/delete"><button>Delete Appliance</button></a>
      </div>
    </div>
  );
}