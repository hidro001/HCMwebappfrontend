import React from "react";

const Footer2 = () => {
  // Inline styles for the footer container
  const footerStyle = {
    
    color: "rgb(135 134 134)", // Light grey text
    padding: "9px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    fontSize: "10px",
    fontFamily: "Arial, sans-serif",
    width: "100%",
  };

  // Base style for links
  const linkStyle = {
    color: "rgb(135 134 134)",
    textDecoration: "none",
    margin: "0 10px",
    cursor: "pointer",
    transition: "color 0.3s",
  };

  // Style to apply on hover
  const linkHoverStyle = {
    color: "#0056b3", // Change text color to white on hover
  };

  // State to track which link is hovered
  const [hoveredLink, setHoveredLink] = React.useState(null);

  // Array of link objects for easy management
  const links = [
    { text: "Privacy Policy", href: "/" },
    { text: "Terms of Service", href: "/" },
  ];

  return (
    <div style={footerStyle}>
      {/* © Razor Infotech Pvt.Ltd */}
      <span>© Razor Infotech Pvt.Ltd</span>

      {/* Separator */}
      <span style={{ margin: "0 10px" }}>||</span>

      {/* Privacy Policy and Terms of Service Links */}
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <a
            href={link.href}
            style={
              hoveredLink === link.text
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            onMouseEnter={() => setHoveredLink(link.text)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.text}
          </a>
          {/* Add separator between links, except after the last link */}
          {index < links.length - 1 && (
            <span style={{ margin: "0 10px" }}>||</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Footer2;
