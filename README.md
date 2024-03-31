## Getting Started

### Add .env.local

TEST
Create a file named **.env.local** and add the variables

- NEXTAUTH_GOOGLE_CLIENT_ID="yourGoogleClientID"
- NEXTAUTH_GOOGLE_CLIENT_SECRET="yourGoogleClientSecret"

if you don't have Google OAuth credentials yet:

> 1. Go to the Google Cloud Console.
> 2. Create a new project or select an existing one.
> 3. Navigate to ‘APIs & Services’ > ‘Credentials’.
> 4. Click on ‘Create Credentials’ and select ‘OAuth client ID’.
> 5. Set up the consent screen, and choose ‘Web application’ as the application type.
> 6. Add your application’s URI to ‘Authorized redirect URIs’, typically http://localhost:3000/api/auth/callback/google for local development.
> 7. Once created, you’ll get your Client ID and Client Secret.

for a complete tutorial on how to setup GoogleProvider within NextAuth with Nextjs visit: [Tutorial](https://karthickragavendran.medium.com/setup-guide-for-nextauth-with-google-and-credentials-providers-in-next-js-13-8f5f13414c1e)

### Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
