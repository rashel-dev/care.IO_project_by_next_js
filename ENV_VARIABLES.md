# Environment Variables Required

This document lists all the environment variables needed for the Care.io project.

## Required Environment Variables

### Database
- `MONGO_URI` - MongoDB connection string
  - Example: `mongodb://localhost:27017/careio` or `mongodb+srv://username:password@cluster.mongodb.net/careio`

### Authentication (NextAuth)
- `NEXTAUTH_SECRET` - Secret key for NextAuth.js session encryption
  - Generate with: `openssl rand -base64 32`
  - Example: `your-random-secret-key-here`
- `NEXTAUTH_URL` - Base URL of your application
  - Development: `http://localhost:3000`
  - Production: `https://yourdomain.com`

### Google OAuth (Optional - if using Google login)
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
  - Get these from: https://console.cloud.google.com/apis/credentials

### Email Configuration (for invoice emails)
- `EMAIL_HOST` - SMTP server hostname
  - Gmail: `smtp.gmail.com`
  - Outlook: `smtp-mail.outlook.com`
  - Custom: Your SMTP server
- `EMAIL_PORT` - SMTP server port
  - Usually `587` for TLS or `465` for SSL
- `EMAIL_SECURE` - Use secure connection
  - `true` for port 465 (SSL)
  - `false` for port 587 (TLS)
- `EMAIL_USER` - Email address to send from
- `EMAIL_PASS` - Email password or app-specific password
  - For Gmail, use an App Password: https://support.google.com/accounts/answer/185833

## No Longer Required (Stripe removed)
The following variables are **NOT needed** anymore since payment functionality has been removed:
- ~~`STRIPE_SECRET_KEY`~~ - No longer needed
- ~~`STRIPE_WEBHOOK_SECRET`~~ - No longer needed

## Example .env file

```env
# Database
MONGO_URI=mongodb://localhost:27017/careio

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Notes
- Make sure your `.env` file is in the root directory of the project
- Never commit your `.env` file to version control (it should be in `.gitignore`)
- For production, set these variables in your hosting platform's environment variable settings
