import React from "react";
import Link from "next/link";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
`;

const HomeLink = styled(Link)`
  background: transparent url("/logo-full.png") no-repeat;
  background-size: 200%, contain;
  background-position: center;
  width: 100%;
  height: 250px;
  margin-bottom: -40px;
  display: block;
  text-indent: -9999em;
  cursor: pointer;

  @media (min-width: 360px) {
    height: 280px;
  }
  @media (min-width: 400px) {
    background-size: 160%, contain;
  }
  @media (min-width: 500px) {
    background-size: 120%, cover;
  }
  @media (min-width: 640px) {
    background-size: cover;
  }
  @media (min-width: 770px) {
    height: 330px;
    margin-bottom: -60px;
  }
  @media (min-width: 960px) {
    height: 390px;
  }
`;

const Header = ({ }) => (
  <HeaderWrapper>
    <nav className="absolute top-2 right-0 z-10">
      <ul className="flex space-x-4">
        <li>
          <Link
            className="text-white hover:text-[#ffe230]"
            href="/how-to-play-pidro"
          >
            How to Play Pidro
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-[#ffe230]" href="/blog">
            Blog
          </Link>
        </li>
        <li>
          <Link className="text-white hover:text-[#ffe230]" href="/changelog">
            Changelog
          </Link>
        </li>
        <li>
          <Link
            className="text-white hover:text-[#ffe230]"
            href="mailto:support@pidro.net"
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
    <h1 style={{ margin: 0 }}>
      <HomeLink href="/"> Pidro - back to home </HomeLink>
    </h1>
  </HeaderWrapper>
);

export default Header;
