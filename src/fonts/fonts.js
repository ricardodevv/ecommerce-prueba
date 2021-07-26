import { createGlobalStyle } from "styled-components";

import BreeSerif_Regular from "./BreeSerif-Regular.ttf";
import Roboto_Regular from "./Roboto-Medium.ttf";

export default createGlobalStyle`

@font-face {
  font-family: 'Bree Serif';
  src: local('Bree Serif'), local('BreeSerif'),
  url(${BreeSerif_Regular});
}

@font-face {
  font-family: 'Roboto';
  src: local('Roboto'),
  url(${Roboto_Regular})
}
`;
