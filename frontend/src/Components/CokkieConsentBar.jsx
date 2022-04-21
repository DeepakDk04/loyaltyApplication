import CookieConsent from "react-cookie-consent";

const barStyle = {
  borderRadius: "5px",
  backdropFilter: "blur(5px)",
  background: "rgba( 158, 190, 236, 0.1 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  WebkitBackdropFilter: "blur(5px)",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
  width: "90%",
  marginLeft: "5%",
  marginRight: "5%",
  marginBottom: "2%",
  color: "white",
  textShadow: "2px 2px 4px black",
  fontWeight: "bold",
};

const agreeBtnStyle = {
  color: "#fff",
  fontSize: "15px",
  borderRadius: "5px",
  fontWeight: "bold",
  marginRight: "50px",
  background: "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)",
  boxShadow: " 0 0.7em 1.5em -0.5em #000851",
};

const privacyBtnStyle = {
  color: "#fff",
  cursor: "pointer",
  margin: "0px 10px",
  borderRadius: "20em",
  fontWeight: "500",
  fontSize: ".7em",
  padding: "0.7em 1.4em 0.7em 1.1em",
  background:
    "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898",
  backgroundBlendMode: "multiply,multiply",
  border: "none",
  boxShadow: " 0 0.7em 1.5em -0.5em #000851",
  letterSpacing: "0.05em",
};

const termsBtnStyle = {
  color: "#fff",
  cursor: "pointer",
  margin: "0px 10px",
  borderRadius: "20em",
  fontWeight: "500",
  fontSize: ".7em",
  padding: "0.7em 1.4em 0.7em 1.1em",
  background:
    "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898",
  backgroundBlendMode: "multiply,multiply",
  border: "none",
  boxShadow: " 0 0.7em 1.5em -0.5em #000851",
  letterSpacing: "0.05em",
};

const privacyBtnHandleClick = (e) => {
  alert("We have strict policies to protect your privacy");
};

const termsBtnHandleClick = (e) => {
  alert("We have certain terms and condition to run our business");
};

const CokkieConsentBar = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I Agree"
      cookieName="agreeCokkie"
      style={barStyle}
      buttonStyle={agreeBtnStyle}
      expires={150}
    >
      This website uses cookies to enhance the user experience.{" "}
      <span style={{ fontSize: "13px" }}>
        I agree to use cokkies according to the{" "}
        <button style={privacyBtnStyle} onClick={privacyBtnHandleClick}>
          Privacy Policy
        </button>{" "}
        and{" "}
        <button style={termsBtnStyle} onClick={termsBtnHandleClick}>
          Terms & Conditions
        </button>
      </span>
    </CookieConsent>
  );
};

export default CokkieConsentBar;
