import { Accordion, AccordionTab } from "primereact/accordion";
import { ListBox } from "primereact/listbox";
import styled from "styled-components";

const FilterStyled = styled.div`
  width: 15rem;

  .container {
    margin: 3rem 1rem;
  }

  h3 {
    border-bottom: 1px black solid;
  }

  .realms {
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: #3f3e401c;
    }
  }

  .filter_options {
    margin-top: 0.5rem;
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
        </div>
      </div>
    </FilterStyled>
  );
};

export default Filter;
