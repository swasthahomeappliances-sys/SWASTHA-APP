
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function AdminAdvertisements() {
  const [ads, setAds] =
    useState([]);

  const [products,
    setProducts] =
    useState([]);

  const [file,
    setFile] =
    useState(null);

  const [formData,
    setFormData] =
    useState({
      title: "",
      description: "",
      media_type:
        "IMAGE",
      image_url: "",
      video_url: "",
      button_text:
        "Shop Now",
      product_id: "",
    });

  useEffect(() => {
    fetchAds();
    fetchProducts();
  }, []);

  const fetchAds =
    async () => {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      const response =
        await axios.get(
          "`${import.meta.env.VITE_API_URL}`/api/advertisements/admin/all",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setAds(
        response.data
      );
    };

  const fetchProducts =
    async () => {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      const response =
        await axios.get(
          "`${import.meta.env.VITE_API_URL}`/api/products/admin/all",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setProducts(
        response.data
      );
    };

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const uploadFile =
    async () => {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      const data =
        new FormData();

      data.append(
        "file",
        file
      );

      const response =
        await axios.post(
          "`${import.meta.env.VITE_API_URL}`/api/upload",
          data,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      return response.data.url;
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        let mediaUrl = "";

        if (file) {
          mediaUrl =
            await uploadFile();
        }

        const token =
          localStorage.getItem(
            "adminToken"
          );

        await axios.post(
          "`${import.meta.env.VITE_API_URL}`/api/advertisements",
          {
            ...formData,
            image_url:
              formData.media_type ===
              "IMAGE"
                ? mediaUrl
                : "",

            video_url:
              formData.media_type ===
              "VIDEO"
                ? mediaUrl
                : "",
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Advertisement Added"
        );

        fetchAds();
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  const toggleAd =
    async (id) => {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      await axios.patch(
        ``${import.meta.env.VITE_API_URL}`/api/advertisements/${id}/toggle`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchAds();
    };

  const deleteAd =
    async (id) => {
      const token =
        localStorage.getItem(
          "adminToken"
        );

      await axios.delete(
        ``${import.meta.env.VITE_API_URL}`/api/advertisements/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchAds();
    };

  return (
    <div
      style={{
        maxWidth:
          "1200px",
        margin:
          "40px auto",
      }}
    >
      <h1>
        Advertisement
        Management
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          name="title"
          placeholder="Title"
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <select
          name="media_type"
          onChange={
            handleChange
          }
        >
          <option value="IMAGE">
            IMAGE
          </option>

          <option value="VIDEO">
            VIDEO
          </option>
        </select>

        <br />
        <br />

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <br />
        <br />

        <input
          name="button_text"
          placeholder="Button Text"
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <select
          name="product_id"
          onChange={
            handleChange
          }
        >
          <option value="">
            Select Product
          </option>

          {products.map(
            (
              product
            ) => (
              <option
                key={
                  product.id
                }
                value={
                  product.id
                }
              >
                {
                  product.name
                }
              </option>
            )
          )}
        </select>

        <br />
        <br />

        <button
          type="submit"
        >
          Create Ad
        </button>
      </form>

      <hr />

      {ads.map(
        (ad) => (
          <div
            key={ad.id}
            style={{
              border:
                "1px solid #ddd",
              padding:
                "20px",
              marginBottom:
                "20px",
            }}
          >
            <h3>
              {ad.title}
            </h3>

            <p>
              {
                ad.description
              }
            </p>

            <p>
              Active:
              {" "}
              {ad.active
                ? "YES"
                : "NO"}
            </p>

            <button
              onClick={() =>
                toggleAd(
                  ad.id
                )
              }
            >
              Toggle
            </button>

            <button
              onClick={() =>
                deleteAd(
                  ad.id
                )
              }
            >
              Delete
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default AdminAdvertisements;