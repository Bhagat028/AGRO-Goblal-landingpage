# Gmail Setup Instructions for Email API

## Step 1: Create a Gmail App Password

Since you're using Gmail to send emails, you need to create an **App Password** (not your regular Gmail password).

### Instructions:

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Find "2-Step Verification" and turn it on
   - Follow the prompts to set it up

2. **Create an App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - You may need to sign in again
   - Select app: **Mail**
   - Select device: **Other (Custom name)** → Type "ARECRON Website"
   - Click **Generate**
   - Google will show you a 16-character password (like: `abcd efgh ijkl mnop`)
   - **Copy this password** - you'll need it in the next step

## Step 2: Create Environment File

1. In your project folder `arecron`, create a file called `.env.local`

2. Add the following content (replace with your actual values):

```env
# Gmail account that will send the emails
EMAIL_USER=your-gmail-address@gmail.com

# The 16-character App Password you just created (remove spaces)
EMAIL_PASSWORD=abcdefghijklmnop

# Where enquiries will be sent
CONTACT_EMAIL=contact@arecronglobal.com
```

3. **Save the file**

## Step 3: Restart Your Dev Server

After creating the `.env.local` file:

1. Stop your current dev server (press `Ctrl+C` in the terminal)
2. Start it again: `npm run dev`

## Step 4: Test the Form

1. Go to your website
2. Scroll to the "Enquire Now" form
3. Fill it out and submit
4. You should see a success message
5. Check `contact@arecronglobal.com` for the email!

## Troubleshooting

### "Failed to send email"
- Double-check your Gmail address and App Password in `.env.local`
- Make sure there are no spaces in the App Password
- Restart the dev server after changing `.env.local`

### "Network error"
- Check your internet connection
- Make sure the dev server is running

### Still not working?
- Check the terminal/console for error messages
- Make sure 2-Step Verification is enabled on your Gmail account
- Try generating a new App Password

## Security Note

⚠️ **Never commit `.env.local` to Git!** It's already in `.gitignore` by default in Next.js projects.
