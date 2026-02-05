---
name: create
description: Create API specification (OpenAPI/AsyncAPI)
usage: |
  /spec:create <api-name> --type <openapi|asyncapi>
examples:
  - /spec:create "User API" --type openapi
  - /spec:create "Events" --type asyncapi
---

# Spec Create Command

Create OpenAPI or AsyncAPI specification for API-first development.

## Process

### 1. Gather Requirements
- API purpose
- Endpoints needed
- Data models
- Authentication

### 2. Create Specification

**OpenAPI 3.x:**
```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users:
    get:
      summary: List users
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        email:
          type: string
```

**AsyncAPI 2.x:**
```yaml
asyncapi: 2.0.0
info:
  title: Event Bus
  version: 1.0.0
channels:
  user/created:
    subscribe:
      message:
        payload:
          type: object
          properties:
            userId:
              type: string
```

### 3. Validate Specification

Check syntax and completeness.

### 4. Generate Artifacts

```
/spec:generate server   # Server stubs
/spec:generate client   # Client SDK
/spec:generate tests    # Contract tests
/spec:generate docs     # Documentation
```

Spec-first development ensures API contract before implementation.
