import React from "react";

const Sidebar = ({ services, selectedService, setSelectedService }) => {
  return (
    <div style={{ width: "200px", background: "#f5f5f5", padding: "20px", height: "100vh" }}>
      <h3>Services</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {services.map(service => (
          <li
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background: selectedService === service.id ? "#ddd" : "transparent",
              marginBottom: "5px"
            }}
          >
            {service.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;