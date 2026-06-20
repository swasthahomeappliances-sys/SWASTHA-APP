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
        because you deserve the life you desire...
      </p>

      <br />

      <p color="#c03434">
        Email: 
        <Button
              color="#fdfdfd"
              href="mailto:swasthahomeappliances@gmail.com"
            >
              swasthahomeappliances@gmail.com
            </Button>
      </p>

      <Button
            color="#1dca6b"
              variant="outlined"
              href="https://wa.me/919840994329"
            >
              WhatsApp
            </Button>

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