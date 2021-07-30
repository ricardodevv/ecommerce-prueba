import { Accordion, AccordionTab } from "primereact/accordion";
import { ListBox } from "primereact/listbox";
import styled from "styled-components";

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
  return (
    <FilterStyled>
      <div className="container">
        <h3>Realms</h3>
        <div className="filter_options">
          <div className="realms">Dogs</div>
          <div className="realms">Cats</div>

          <h3 className="p-mt-3">Categories</h3>
          <div className="realms">Food</div>
          <div className="realms">Clothes</div>
        </div>
      </div>
    </FilterStyled>
  );
};

export default Filter;
