---
name: security-analysis
description: Auto-activates during code review to perform security-focused analysis across OWASP Top 10 categories
---

# Security Analysis Skill

Provides security-focused code analysis as part of the code review process.

## When to Use

This skill should activate when:
- Code review is in progress and security analysis is needed
- User mentions "security review" or "vulnerability check"
- Reviewing authentication, authorization, or data-handling code
- Analyzing code that processes user input
- Evaluating API endpoints or database queries

**Do NOT activate for:**
- Style-only reviews
- Documentation reviews
- Non-code file reviews

## The Analysis Process

### 1. Identify Attack Surface

Determine what code is exposed to external input:
- HTTP endpoints and request handlers
- File upload handlers
- Database query construction
- Command execution
- Authentication/session management
- Third-party API integrations

### 2. OWASP Top 10 Scan

Check code against each category:

**A01: Broken Access Control**
- Missing authorization checks on endpoints
- IDOR (Insecure Direct Object References)
- Missing function-level access control
- CORS misconfiguration

**A02: Cryptographic Failures**
- Hardcoded secrets or API keys
- Weak hashing algorithms (MD5, SHA1 for passwords)
- Missing encryption for sensitive data
- Insecure random number generation

**A03: Injection**
- SQL injection (string concatenation in queries)
- NoSQL injection
- OS command injection (exec, system, spawn with user input)
- LDAP injection
- XSS (innerHTML, dangerouslySetInnerHTML, unescaped output)

**A04: Insecure Design**
- Missing rate limiting
- No account lockout
- Insufficient input validation
- Trust boundary violations

**A05: Security Misconfiguration**
- Debug mode in production
- Default credentials
- Unnecessary features enabled
- Missing security headers

**A06: Vulnerable Components**
- Outdated dependencies with known CVEs
- Unmaintained libraries
- Components with excessive permissions

**A07: Authentication Failures**
- Weak password policies
- Missing MFA considerations
- Session fixation
- Credential stuffing vulnerability

**A08: Data Integrity Failures**
- Missing integrity checks on updates
- Insecure deserialization
- Unsigned/unverified data from external sources

**A09: Logging Failures**
- Sensitive data in logs (passwords, tokens, PII)
- Missing audit logging for security events
- No alerting on suspicious activity

**A10: SSRF**
- Unvalidated URLs in server-side requests
- Missing allowlist for external connections
- DNS rebinding vulnerability

### 3. Severity Classification

Rate each finding:

| Severity | Criteria | Action |
|----------|----------|--------|
| Critical | Remotely exploitable, data breach risk | Fix immediately |
| High | Significant security impact, requires auth | Fix before release |
| Medium | Limited impact, defense-in-depth | Fix in next sprint |
| Low | Best practice, minimal risk | Track for improvement |

### 4. Report Findings

For each issue found:

```
**[SEVERITY] [Category]: [Brief Title]**
File: path/to/file.ts:line
Code: `vulnerable code snippet`
Risk: What an attacker could do
Fix: Specific remediation with code example
```

### 5. Summary

Provide an overall security assessment:

```
## Security Analysis Summary

Findings: X critical, Y high, Z medium, W low

Top priorities:
1. [Most critical finding]
2. [Second most critical]
3. [Third most critical]

Overall risk: [Critical/High/Medium/Low]
Recommendation: [Block merge / Fix before deploy / Track issues]
```

## Key Principles

- **Assume hostile input** - All external data is potentially malicious
- **Defense in depth** - Multiple layers of security, not just one check
- **Least privilege** - Code should have minimum necessary permissions
- **Fail secure** - Errors should deny access, not grant it
- **Evidence-based** - Point to specific code lines, not vague concerns

## Integration

This skill works alongside the security-reviewer agent. The skill provides the methodology; the agent performs autonomous analysis when invoked during `/review` commands.
