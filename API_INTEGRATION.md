# Backend API Integration

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```bash
REACT_APP_API_BASE_URL=http://127.0.0.1:8000
```

For production, update this to your production backend URL.

### API Endpoints

The frontend is configured to work with these backend endpoints:

#### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login  
- `GET /auth/me` - Get current user (requires Bearer token)

#### Documentation
- `POST /repos/process` - Generate docs from GitHub repo
- `GET /repo_docs/` - Get list of generated docs  
- `GET /repo_docs/{slug}` - Get individual doc content (returns HTML)

## 📡 API Client

All API calls go through `src/utils/api.js` which handles:
- Base URL configuration from environment variables
- Automatic JWT token attachment for authenticated requests
- Error handling with custom `ApiError` class
- Request/response formatting

## 🔐 Authentication Flow

1. **Signup**: User creates account → Redirected to login
2. **Login**: User logs in → JWT token saved → User info fetched → Redirected to dashboard
3. **Protected Routes**: All `/dashboard` and `/docs` routes require authentication
4. **Token Management**: JWT stored in localStorage, automatically attached to requests
5. **Auto-logout**: Invalid/expired tokens automatically log user out

## 🚀 Testing with Your Backend

1. **Start your backend** on `http://127.0.0.1:8000`
2. **Start the frontend**: `npm start`
3. **Test the flow**:
   - Visit `http://localhost:3000`
   - Click "Get Started" to signup
   - Create an account with your backend
   - Login and test documentation generation

## 🔄 CORS Configuration

Make sure your backend allows requests from `http://localhost:3000` during development.

Example FastAPI CORS setup:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📝 API Response Formats

### Login Response
```json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer"
}
```

### User Info Response  
```json
{
  "id": "user_id",
  "username": "username",
  "email": "user@example.com"
}
```

### Docs List Response
```json
[
  {
    "slug": "after-sign-up-e43c84ea",
    "title": "After Sign Up",
    "html_path": "generated_docs\\619d3749-3688-4f05-aa36-8635283ffdc2\\.\\after-sign-up.html",
    "user_id": 1,
    "id": 1,
    "description": "Generated from after-sign-up.md",
    "created_at": "2025-12-18T03:54:45.266647"
  }
]
```

### Generate Docs Request
```json
{
  "github_url": "https://github.com/user/repo.git"
}
```

### Generate Docs Response
```json
{
  "success": true,
  "message": "Documentation generated successfully"
}
```

### Individual Doc Response
Returns raw HTML content that gets rendered with `dangerouslySetInnerHTML`.

## 🛠 Customization

To change the backend URL:
1. Update `.env` file
2. Restart the development server
3. The API client will automatically use the new URL

For production deployment, set the environment variable in your hosting platform.