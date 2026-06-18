import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "#554ede",
        color: "white",
        padding: "40px",
        marginTop: "80px",
      }}
    >
      <h3>𝐒𝐰𝐚𝐬𝐭𝐡𝐚 𝐇𝐨𝐦𝐞 𝐀𝐩𝐩𝐥𝐢𝐚𝐧𝐜𝐞𝐬</h3>

      <p>
        𝒷𝑒𝒸𝒶𝓊𝓈𝑒 𝓎𝑜𝓊 𝒹𝑒𝓈𝑒𝓇𝓋𝑒 𝓉𝒽𝑒 𝓁𝒾𝒻𝑒 𝓎𝑜𝓊 𝒹𝑒𝓈𝒾𝓇𝑒
      </p>

      <br />

      <p color="#FFFFFF">
        Email: 
        <Link color="#FFFFFF" > swasthahomeappliances@gmail.com</Link>
      </p>

      <p>
        Phone/WhatsApp:
        +91 98409 94329
      </p>

    <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5925.072143092821!2d80.11151157358749!3d12.889821916668993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52596308880429%3A0xccd91256cce5e2b8!2sSwastha%20Home%20Appliances!5e1!3m2!1sen!2sin!4v1781788131050!5m2!1sen!2sin"
  width="100%"
  height="300"
  style={{
    border: 0,
    borderRadius: "12px",
  }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Swastha Home Appliances Location"
/>

      <br />

      <p>
        © 2026 Swastha.
        All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;