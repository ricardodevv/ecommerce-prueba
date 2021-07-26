import React from "react";
import styled from "styled-components";
import Image from "next/image";
import instagram_icon from "../src/pictures/instagram.png";
import facebook_icon from "../src/pictures/facebook.png";
import telegram_icon from "../src/pictures/telegram.png";

const FooterStyled = styled.div`
  width: 100%;

  .container {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;

    h3 {
      text-align: center;
      font-size: xx-large;
      font-weight: 400;
    }
  }

  .links_container {
    display: flex;
    justify-content: center;
  }

  .social_media_icons {
    width: 5em;
    margin: 1em;
    cursor: pointer;
  }
`;

const Footer = () => {
  return (
    <FooterStyled>
      <div className="container">
        <h3>Follow us</h3>
        <div className="links_container">
          <div className="social_media_icons">
            <Image
              src={instagram_icon}
              alt="instgram link icon"
              width={100}
              height={100}
            />
          </div>
          <div className="social_media_icons">
            <Image
              src={facebook_icon}
              alt="facebook link icon"
              width={100}
              height={100}
            />
          </div>
          <div className="social_media_icons">
            <Image
              src={telegram_icon}
              alt="telegram link icon"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
