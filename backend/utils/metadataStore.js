const metadataStore = {};

// Add metadata
const getMetadata = (fileId, metadata) => {
  metadataStore[fileId] = metadata;
};



export default {
  getMetadata,
};
