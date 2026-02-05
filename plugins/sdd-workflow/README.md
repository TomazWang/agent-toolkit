# SDD Workflow Plugin

Specification-Driven Development using OpenAPI, AsyncAPI, and other specification formats.

## Source Attribution

Original implementation for agent-toolkit.

## Overview

This plugin enforces specification-first development: define the API contract in OpenAPI/AsyncAPI before implementation, then generate code and tests from the spec.

## Features

- OpenAPI 3.x specification creation
- AsyncAPI specification for events
- Specification validation
- Code generation from specs
- Test generation from specs
- Contract testing

## Commands

### `/spec`

Manage API specifications.

```bash
# Create new specification
/spec create rest-api --type openapi
/spec create events --type asyncapi

# Validate specification
/spec validate api-spec.yaml

# Generate code from spec
/spec generate server api-spec.yaml
/spec generate client api-spec.yaml

# Generate tests from spec
/spec generate tests api-spec.yaml
```

## Skills

### `spec-driven-development`

Enforces spec-first development:

1. **Define Specification**
   - Write OpenAPI/AsyncAPI spec
   - Define endpoints, schemas, responses
   - Include examples and documentation

2. **Validate Specification**
   - Check spec syntax
   - Validate against standard
   - Check for inconsistencies

3. **Generate Artifacts**
   - Generate server stubs
   - Generate client SDKs
   - Generate test cases
   - Generate documentation

4. **Implement**
   - Fill in business logic
   - Keep implementation matching spec
   - Run contract tests

5. **Keep Spec Updated**
   - Spec is source of truth
   - Update spec before changing API
   - Regenerate when spec changes

## Workflow

```yaml
# api-spec.yaml (OpenAPI 3.0)
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0

paths:
  /users:
    post:
      summary: Create user
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email:
                  type: string
                  format: email
                password:
                  type: string
                  minLength: 8
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Invalid input

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

Then generate:
```bash
/spec generate server api-spec.yaml
# Creates server stubs matching spec

/spec generate tests api-spec.yaml
# Creates contract tests
```

## Benefits

- API design collaboration before coding
- Automated code generation
- Contract testing
- Always up-to-date documentation
- Client SDK generation
- Breaking change detection
