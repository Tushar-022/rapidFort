import metadataStore from "../utils/metadataStore.js";

const getMetadata = (fileId) => {

  const metadata = metadataStore.getMetadata(fileId);
  return metadata


};

export { getMetadata };
