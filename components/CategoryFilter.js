import styled from "styled-components";

const CategoryFilterStyled = styled.div``;

const CategoryFilter = ({ title }) => {
  return (
    <CategoryFilterStyled>
      <div>
        <div className="category-title">
          Home <b>{">"}</b> {title}
        </div>
      </div>
    </CategoryFilterStyled>
  );
};

export default CategoryFilter;
