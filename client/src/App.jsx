import React from "react";

const App = () => {
  const khalti = async () => {
    const response = await fetch("http://localhost:5000/khalti");
    const resJson = await response.json();
    window.location.href = resJson.url;
  };
  return (
    <>
      <button onClick={khalti}>Khalti Pay</button>
    </>
  );
};

export default App;
