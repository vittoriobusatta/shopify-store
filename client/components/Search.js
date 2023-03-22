import React from "react";

const SearchBar = ({ setSearch }) => {
  return (
    <section className="search">
      <div className="search__head">
        <div className="search__head__input">
          <input type="text" placeholder="Rechercher" />
        </div>
        <h1 className="search__head__close" onClick={() => setSearch(false)}>
          Annuler
        </h1>
      </div>
    </section>
  );
};

export default SearchBar;
