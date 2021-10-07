import React from "react";
import { useDropzone } from "react-dropzone";

function FileDropzone(props) {
  const { maxFiles, onDrop, accept, children } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, maxFiles });

  return (
    <div style={{ border: "1px solid black", padding: "30px" }} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Déposez le fichier ici</p>
      ) : (
        <p>Glissez déposez votre CV ici ou cliquez pour sélectionner un fichier</p>
      )}
      {children}
    </div>
  );
}
export default FileDropzone;
