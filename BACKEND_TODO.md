# Backend Implementation TODO

## ✅ Already Implemented
- `POST /repos/process` - Generate docs from GitHub repo
- `GET /repo_docs/` - Get list of user's generated docs
- `GET /auth/signup` - User registration
- `GET /auth/login` - User authentication
- `GET /auth/me` - Get current user info

## 🔧 Need to Implement

### Individual Document Content Endpoint

**Endpoint:** `GET /repo_docs/{slug}/content`

**Purpose:** Return the HTML content for a specific document

**Implementation Steps:**

1. **Create the endpoint:**
```python
@app.get("/repo_docs/{slug}/content")
async def get_document_content(
    slug: str,
    current_user: User = Depends(get_current_user)
):
    # Implementation here
```

2. **Find document by slug:**
```python
# Query database for document with matching slug
doc = db.query(Document).filter(
    Document.slug == slug,
    Document.user_id == current_user.id  # Ensure user owns this doc
).first()

if not doc:
    raise HTTPException(status_code=404, detail="Document not found")
```

3. **Read HTML file:**
```python
import os
from fastapi.responses import HTMLResponse

# Read HTML content from file system
try:
    with open(doc.html_path, 'r', encoding='utf-8') as file:
        html_content = file.read()
except FileNotFoundError:
    raise HTTPException(status_code=404, detail="Document file not found")
except Exception as e:
    raise HTTPException(status_code=500, detail="Error reading document")
```

4. **Return HTML response:**
```python
return HTMLResponse(content=html_content)
```

**Complete Example:**
```python
@app.get("/repo_docs/{slug}/content")
async def get_document_content(
    slug: str,
    current_user: User = Depends(get_current_user)
):
    # Find document
    doc = db.query(Document).filter(
        Document.slug == slug,
        Document.user_id == current_user.id
    ).first()
    
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Read HTML file
    try:
        with open(doc.html_path, 'r', encoding='utf-8') as file:
            html_content = file.read()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Document file not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading document: {str(e)}")
    
    return HTMLResponse(content=html_content)
```

## 🧪 Testing

Once implemented, test with:

```bash
curl --location 'http://127.0.0.1:8000/repo_docs/after-sign-up-e43c84ea/content' \
--header 'Authorization: Bearer YOUR_JWT_TOKEN'
```

Should return HTML content that the frontend will render.

## 🎯 Frontend Integration

Once this endpoint is implemented, the frontend will automatically work:

1. User clicks on a document in the docs list
2. Frontend calls `GET /repo_docs/{slug}/content`
3. Backend returns HTML content
4. Frontend renders it with `dangerouslySetInnerHTML`

The frontend is already configured and waiting for this endpoint! 🚀