import { useRouter } from "next/router";
import styled from "styled-components";
import CategoryFilter from "../../components/CategoryFilter";
import Layout from "../../components/Layout";

const CategoryStyled = styled.div``;

const Category = () => {
  const router = useRouter();
  const title = router.query.category;

  return (
    <Layout>
      <CategoryStyled>
        <CategoryFilter title={title}></CategoryFilter>
      </CategoryStyled>
    </Layout>
  );
};

export default Category;
