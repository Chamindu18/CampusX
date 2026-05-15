# CampusX Deployment & Security Checklist

## Critical Fixes Applied ✅

### 1. **Unified JWT Token Verification** ✅
- **Files**: `src/lib/auth-edge.ts`, `src/middleware.ts`
- **What was fixed**: 
  - Simplified Edge runtime JWT verification to use only standard APIs (`atob`, `btoa`, `crypto.subtle`)
  - Removed duplicate utility functions and improved error handling
  - Added proper logging for debugging Edge verification failures
  - Ensured `JWT_SECRET` availability checks with clear error messages
- **Impact**: Middleware now more reliable across different Edge runtime environments (Vercel, Cloudflare, etc.)

### 2. **Server-Side Input Validation** ✅
- **Files**: `src/app/api/listings/route.ts`, `src/app/api/listings/[id]/route.ts`, `src/app/api/profile/route.ts`
- **What was fixed**:
  - Added Zod schema validation to all POST/PATCH endpoints
  - Listings creation now validates: `title`, `description`, `category`, `price`, `imageUrls` format
  - Listing updates validate partial updates correctly
  - Profile updates validate: `name`, `university`, `bio` with length constraints
  - Rejects malformed input with 400 status and clear error messages
- **Impact**: Prevents invalid data from entering the database; blocks injection attacks; improves data integrity

### 3. **Image Host Whitelist** ✅
- **File**: `next.config.js`
- **What was fixed**:
  - Changed from wildcard (`hostname: "**"`) to explicit whitelist
  - Allows UploadThing CDN (`utfs.io`) by default
  - Provides clear comments for adding additional trusted hosts
- **Impact**: Reduces security risk; prevents proxying untrusted image sources; improves performance

---

## Before Deploying to Production

### Environment Variables

Copy `.env.example` to `.env.local` and fill in all required values:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/campusx

# Authentication (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=<generate-a-strong-random-secret>

# UploadThing (get from https://uploadthing.com)
NEXT_PUBLIC_UPLOADTHING_APP_ID=<your-app-id>
UPLOADTHING_SECRET=<your-secret>

# Deployment URL
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
```

### Database Migrations

Ensure all migrations are applied to your production database:

```bash
npx prisma migrate deploy
```

### JWT Secret Rotation (Important!)

- **Development**: Any value works
- **Production**: Generate a cryptographically secure random string
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **Never use**: hardcoded values, predictable secrets, or test values in production

### Verify Deployment Environment

1. **Test JWT verification** in your target runtime (Vercel Edge, Cloudflare Workers, etc.):
   - Ensure `process.env.JWT_SECRET` is available in middleware
   - Confirm Edge runtime supports `atob`, `btoa`, `crypto.subtle`

2. **Test UploadThing configuration**:
   ```bash
   # Check if API credentials are set
   echo $UPLOADTHING_SECRET
   echo $NEXT_PUBLIC_UPLOADTHING_APP_ID
   ```

3. **Test database connectivity**:
   ```bash
   npx prisma db push
   npx prisma db seed  # if you have seeds
   ```

---

## Remaining Work (High Priority)

### Before Production Launch

- [ ] Add rate limiting for auth endpoints (`/api/auth/login`, `/api/auth/signup`)
- [ ] Add rate limiting for messaging endpoints
- [ ] Implement email verification flow
- [ ] Add password reset functionality
- [ ] Convert `Report.status` to Prisma enum (currently string)
- [ ] Add admin action endpoints to resolve/delete reports
- [ ] Implement conversation listing and per-user conversation flows
- [ ] Add logging/observability (Sentry or equivalent)

### Nice-to-Have (Before Public Launch)

- [ ] Implement WebSocket/SSE for real-time messaging (currently polling)
- [ ] Add caching headers for static assets and listing pages
- [ ] Set up CDN for image optimization
- [ ] Add 2FA (two-factor authentication)
- [ ] Implement user blocking/reporting for accounts

---

## Deployment Platforms

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard:
# https://vercel.com/dashboard > Project > Settings > Environment Variables
```

### Other Platforms (Docker)

See `Dockerfile` in root if available, or use:

```bash
# Build Docker image
docker build -t campusx-frontend .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=<your-db> \
  -e JWT_SECRET=<your-secret> \
  -e UPLOADTHING_SECRET=<your-secret> \
  campusx-frontend
```

---

## Post-Deployment Verification

After deploying to production:

1. **Test login flow**:
   ```bash
   curl -X POST https://your-app.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
   ```

2. **Verify JWT is set in cookie**:
   - Open DevTools > Application > Cookies
   - Look for `campusx_token` cookie with `HttpOnly` flag

3. **Test protected route**:
   - Visit https://your-app.com/dashboard (should work if logged in)
   - Logout and try again (should redirect to login)

4. **Check image loading**:
   - Create a listing with an image
   - Verify image loads from UploadThing CDN

5. **Monitor error logs**:
   - Set up Sentry or equivalent
   - Monitor for JWT verification failures in middleware

---

## Security Headers Recommendation

Add to `next.config.js` for better security:

```javascript
async headers() {
  return [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ];
},
```

---

## Emergency Contacts

- **Database Issues**: Check PostgreSQL logs and connection string
- **Auth Issues**: Check `JWT_SECRET` is set and consistent
- **Upload Issues**: Verify UploadThing credentials and API limits
- **Middleware Issues**: Check Edge runtime compatibility in deployment platform docs

---

## Questions?

Refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [UploadThing Docs](https://docs.uploadthing.com/)
