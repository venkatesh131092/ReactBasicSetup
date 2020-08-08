import React from "react";
import { Field } from "react-final-form";
import { TextField } from "@material-ui/core";

const FieldWrapper = ({ name, validate, ...props }) => {
  const getValidProps = () => {
    const validProps = [
      "autoComplete",
      "autoFocus",
      "children",
      "className",
      "defaultValue",
      "disabled",
      "FormHelperTextProps",
      "fullWidth",
      "id",
      "InputLabelProps",
      "inputProps",
      "InputProps",
      "inputRef",
      "label",
      "multiline",
      "name",
      "onBlur",
      "onChange",
      "onFocus",
      "placeholder",
      "required",
      "rows",
      "rowsMax",
      "select",
      "SelectProps",
      "type",
      "variant",
      "max"
    ];
    const extractedProps = {};
    Object.keys(props).forEach(key => {
      if (validProps.includes(key)) {
        extractedProps[key] = props[key];
      }
    });
    return extractedProps;
  };
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => (
        <TextField
          {...input}
          {...getValidProps()}
          error={Boolean(meta.error && meta.touched)}
          helperText={meta.error && meta.touched && meta.error}
        />
      )}
    </Field>
  );
};
export default FieldWrapper;
