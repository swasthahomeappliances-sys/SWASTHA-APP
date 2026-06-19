import { useEffect, useState } from "react";
import axios from "axios";

function Addresses() {
  const [addresses, setAddresses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
    });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/addresses`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setAddresses(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem("token");

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/addresses`,
      formData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    fetchAddresses();
  };

  return (
    <div>
      <h1>Addresses</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="full_name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          name="address_line1"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="State"
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
        />

        <button type="submit">
          Save Address
        </button>
      </form>

      <hr />

      {addresses.map((address) => (
        <div key={address.id}>
          <h3>
            {address.full_name}
          </h3>

          <p>
            {address.address_line1}
          </p>

          <p>
            {address.city},
            {" "}
            {address.state}
          </p>

          <p>
            {address.pincode}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Addresses;