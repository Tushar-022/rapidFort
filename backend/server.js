import app from "./app.js";

const PORT = process.env.PORT || 5000;

// Start the server with error handling
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1); // Exit with failure
});
