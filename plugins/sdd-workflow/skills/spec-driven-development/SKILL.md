---
name: spec-driven-development
description: Enforce spec-first API development with OpenAPI/AsyncAPI
---

# Spec-Driven Development Skill

Ensures API specifications are defined before implementation.

## When to Use

Activate when:
- Developing APIs
- User mentions "API", "endpoint", "REST", "GraphQL"
- OpenSpec integration detected

## Process

### 1. Spec First

**Before any implementation:**
- Define API contract in OpenAPI/AsyncAPI
- Document all endpoints
- Define request/response schemas
- Specify authentication

### 2. Validate Spec

- Syntax check
- Completeness check
- Breaking change detection

### 3. Generate from Spec

- Server stubs (routes, handlers)
- Client SDKs
- Contract tests
- API documentation

### 4. Implement Against Spec

- Fill in business logic
- Keep implementation matching spec
- Run contract tests

### 5. Spec is Source of Truth

- Update spec before changing API
- Regenerate when spec changes
- Catch breaking changes early

## Enforcement

**If user implements without spec:**
```
⛔ API Implementation Without Spec

Spec-driven development requires specification first.

Please create OpenAPI/AsyncAPI spec:
/spec:create "API Name" --type openapi

Then implement against the spec.
```

This ensures APIs are designed before built.
