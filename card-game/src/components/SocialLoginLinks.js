import React from "react";
// import fb from "../assets/fb_signin.png";
// import google from "../assets/google_signin.png";

const SocialLoginLinks = () => (
  <div>
    <p style={{ textAlign: "center" }}>- OR -</p>

    <div style={{ display: "flex" }}>
      <a
        href={`http://localhost:3000?linkinguri=${
          window.location.origin
        }/socialauthredirect`}
      >
        Facebook login
      </a>
      <a
        href={`http://localhost:3000?linkinguri=${
          window.location.origin
        }/socialauthredirect`}
      >
        google Login
      </a>
    </div>
  </div>
);

export default SocialLoginLinks;