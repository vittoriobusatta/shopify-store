import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CartIcon, SearchIcon } from "./Vector";
import SearchBar from "@/components/Search";

function Header() {
  const quantity = useSelector((state) => state.cart.quantity);
  const [search, setSearch] = useState(false);

  return (
    <header>
      <Link href="/">
        <h1>HIJAB</h1>
      </Link>
      <div>
        <SearchIcon search={search} setSearch={setSearch} />
        {search && <SearchBar setSearch={setSearch} />}
        <Link className="pre" href="/cart">
          <CartIcon />
          <span className="pre__jewel">
            {quantity > 9 ? "9+" : quantity > 0 ? quantity : 0}
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
