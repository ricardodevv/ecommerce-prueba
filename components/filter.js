import styled from "styled-components";
import Link from "next/link";

const FilterStyled = styled.div`
  width: 15rem;

  .container {
    margin: 2rem 1rem;
    padding: 1em;
    color: #333e48;
    border: 1px solid #ddd;
    border-bottom-left-radius: 2em;
    border-bottom-right-radius: 2em;
    border-top-left-radius: 2em;
  }

  h3 {
    border-bottom: 1px #333e48 solid;
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
  }

  .realms {
    cursor: pointer;
    transition: 0.3s;
    padding: 0.3rem 0 0.3rem 0.3rem;

    &:hover {
      background-color: #3f3e401c;
    }
  }
`;

const Filter = () => {
  const categories = [
    { name: "Food" },
    { name: "Clothes" },
    { name: "Accesories" },
    { name: "Health & Care" },
  ];

  return (
    <FilterStyled>
      <div className="container">
        <h3>Realms</h3>
        <div className="filter_options">
          <h3 className="p-mt-3">Categories</h3>
          {categories.map((category) => (
            <Link
              href={{
                pathname: `/productList/${category.name}`,
                query: { category: category.name },
              }}
            >
              <div>{category.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </FilterStyled>
  );
};

export default Filter;
