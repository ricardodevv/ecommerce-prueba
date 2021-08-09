import styled from "styled-components";
import Link from "next/link";

const FilterStyled = styled.div`
  width: 20%;

  .container {
    margin: 2rem 1rem;
    padding: 1em 1em 2em 1em;
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

  .filter_options {
    .category_link {
      padding: 0.5rem 0;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        background-color: #4f4c4c38;
      }
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
        <div className="filter_options">
          <h3 className="p-mt-3">Categories</h3>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={{
                pathname: `/productList/${category.name}`,
                query: { category: category.name },
              }}
              passHref
            >
              <div className="category_link">{category.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </FilterStyled>
  );
};

export default Filter;
