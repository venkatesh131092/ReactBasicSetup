// import React, { lazy, Suspense } from "react";

// const MonacoEditor = lazy(() => import("react-monaco-editor"));

// class Editor extends React.Component {
//   state = {
//     defaultValue: this.props.defaultValue
//   };

//   editor = React.createRef();

//   editorDidMount =(editor, monaco) =>{
//     editor.focus();
//   }

//   onChange = (newValue, e) => {
//     this.updateCode();
//   };

//   updateCode = () => {
//     const model = this.editor.current.editor.getModel();
//     const value = model.getValue();
//     this.props.getValue(value);
//   };

//   shouldComponentUpdate() {
//     return false;
//   }

//   render() {
//     const { defaultValue } = this.state;
//     const options = {
//       selectOnLineNumbers: true
//     };
//     return (
//       <Suspense fallback={<div>Loading...</div>}>
//         <MonacoEditor
//           ref={this.editor}
//           height="100%"
//           language="html"
//           theme="vs-light"
//           defaultValue={defaultValue}
//           options={options}
//           onChange={this.onChange}
//           editorDidMount={this.editorDidMount}
//         />
//       </Suspense>
//     );
//   }
// }

// export default Editor;
