import Paragraph from "./Paragraph";
import styles from "./Paragraph.styles";
import { withStyles } from "../../Common/styles";

export default (indent) => {
  return withStyles(Paragraph)(styles(indent));
};
