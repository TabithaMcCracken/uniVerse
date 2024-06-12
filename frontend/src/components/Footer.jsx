import React, { useState } from "react";

const Footer = () => {
    // State to manage the visibility of copyright info
  const [isOpen, setIsOpen] = useState(false);

  //Function to toggle the visibility of copyright info
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <footer className="footer">
        <div className="copyright-info">
          <p className="copyright-container">
            {/* Copyright text */}
            Scripture quotations are from the ESV® Bible (The Holy Bible,
            English Standard Version®), © 2001 by Crossway, a publishing
            ministry of Good News Publishers. Used by permission. All rights
            reserved. The ESV text may not be quoted in any publication made
            available to the public by a Creative Commons license. The ESV may
            not be translated into any other language. Users may not copy or
            download more than 500 verses of the ESV Bible or more than one half
            of any book of the ESV Bible.
          </p>
        </div>
    </footer>
  );
};

export default Footer;
