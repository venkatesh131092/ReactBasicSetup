import React from "react";
import { useDropzone } from "react-dropzone";
import { Field } from "react-final-form";
import "./styles/dropfile.css";

const FieldWrapper = ({ name, validate, ...props }) => {
  // if multiple files are selected this will concatenate them with comma
  const getFilenames = acceptedFiles => {
    let fileNames = "";
    (acceptedFiles || []).forEach(file => {
      fileNames = fileNames
        ? fileNames + "," + file.name
        : (fileNames += file.name);
    });
    return fileNames;
  };

  return (
    <Field
      validateFields={props.validateFields || []}
      type="file"
      name={name}
      validate={validate}
    >
      {({ input, meta }) => {
        // ideally we just spread this input props to input element but ,here we are using dropzone, that also expose onChange handler
        // to avoid overiding of one by another we are extracting both's onChange and calling from ourself
        console.log(meta, "meta");
        const {
          onChange: reactFinalFormOnChange,
          value, // we can't set value of input type file, so excluding it
          ...restInputProps
        } = input;
        // callback to be called after drop event, is called with array of files
        const handleOnDrop = acceptedFiles => {
          reactFinalFormOnChange(acceptedFiles);
        };

        const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
          onDrop: handleOnDrop
        });

        const {
          onChange: dropzoneOnChange,
          ...restdropZoneInputProps
        } = getInputProps();

        // files list is different from array, creating a array of files
        // React-final-form's onChange accepts both event and value
        // for files it just provides path of file and not file(while submitting,also to validate function's argument)
        // so were are explicitly providing files instead of event

        const handleChange = e => {
          const filesList = e.target.files;
          const filesArr = [];
          for (let i = 0; i < filesList.length; i++) {
            const file = filesList.item(i);
            filesArr.push(file);
          }
          reactFinalFormOnChange(filesArr);
          dropzoneOnChange(e);
        };

        const { ...restDropzoneRootProps } = getRootProps({
          className: "dropzone"
        });

        return (
          <>
            <div {...restDropzoneRootProps}>
              <p className="file_placeholder">
                {getFilenames(acceptedFiles) || props.placeholder}
              </p>
              <input
                onChange={handleChange}
                {...restInputProps}
                {...restdropZoneInputProps}
              />
            </div>
            <p className="file_error">
              {meta.error && meta.touched && meta.error}
            </p>
          </>
        );
      }}
    </Field>
  );
};
export default FieldWrapper;
