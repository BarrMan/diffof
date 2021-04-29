import { createUseStyles } from "react-jss";

const defaultIndent = 20;

export default (indent) =>
  createUseStyles(() => ({
    indent: {
      paddingLeft: defaultIndent * indent,
    },
  }));
