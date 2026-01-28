import "dotenv/config";
import app from "./app";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API endpoints:`);
  console.log(`   POST /api/auth/register - Register new user`);
  console.log(`   POST /api/auth/login    - Login user`);
  console.log(`   POST /api/auth/logout   - Logout user`);
  console.log(`   GET  /api/auth/me       - Get current user`);
  console.log(`   GET  /api/characters    - Get user's characters`);
  console.log(`   POST /api/characters    - Create character`);
  console.log(`   GET  /api/characters/:id - Get character by ID`);
  console.log(`   PUT  /api/characters/:id - Update character`);
  console.log(`   DELETE /api/characters/:id - Delete character`);
});
