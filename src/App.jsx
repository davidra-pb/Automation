import os
from dotenv import load_dotenv
from github import Github, Auth

# --- טעינת הגדרות ---
load_dotenv()
GITHUB_TOKEN = os.getenv('gitHubToken')
REPO_NAME = os.getenv('REPO_Automation')


def upload_to_github(repo, file_path, content):
    """מעלה קובץ ל-GitHub, יוצר או מעדכן"""
    try:
        contents = repo.get_contents(file_path)
        repo.update_file(contents.path, f"Update {file_path}", content, contents.sha)
        print(f"✅ עודכן: {file_path}")
    except:
        repo.create_file(file_path, f"Create {file_path}", content)
        print(f"✨ נוצר: {file_path}")


def main():
    if not GITHUB_TOKEN or not REPO_NAME:
        print("❌ שגיאה: חסרים משתני סביבה בקובץ .env")
        return

    # התחברות לגיטהאב - תוקן למניעת אזהרת ה-Deprecation
    auth = Auth.Token(GITHUB_TOKEN)
    g = Github(auth=auth)

    try:
        # תמיכה בפורמט "username/repo" וגם רק בשם הרפוזיטורי
        if "/" in REPO_NAME:
            repo = g.get_repo(REPO_NAME)
        else:
            repo = g.get_user().get_repo(REPO_NAME)
    except Exception as e:
        print(f"❌ שגיאה 404: לא הצלחתי למצוא את הרפוזיטורי '{REPO_NAME}'")
        print("💡 מה לבדוק?")
        print("   1. בקובץ ה-.env, נסה לכתוב את השם המלא, למשל: YourUsername/RepoName")
        print("   2. ודא שהרפוזיטורי אכן נוצר בחשבון הגיטהאב שלך.")
        print("   3. ודא שלטוקן שלך בגיטהאב (Personal Access Token) יש וי (V) על הרשאת 'repo'.")
        print(f"פירוט טכני: {e}")
        return

    # 1. קריאת קובץ ה-React (App.jsx) - ודא שהנתיב נכון למחשב שלך
    original_file_path = "/Users/david/Documents/PyCharm/GitHub/BIA_upload_and_build.py"

    if not os.path.exists(original_file_path):
        print(f"❌ שגיאה: הקובץ לא נמצא בנתיב: {original_file_path}")
        return

    print(f"📖 קורא את הקובץ: {original_file_path}...")
    with open(original_file_path, 'r', encoding='utf-8') as f:
        user_code = f.read()

    # --- קבצי התשתית של הפרויקט ---

    package_json = """{
  "name": "bia-presentation",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.4"
  }
}"""

    # הוספת base: './' הכרחי עבור GitHub Pages
    vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', 
})"""

    tailwind_config = """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}"""

    postcss_config = """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}"""

    index_html = """<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://payboxapp.com/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800;900&display=swap" rel="stylesheet">
    <title>PayBox BIA Presentation</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>"""

    main_jsx = """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)"""

    index_css = """@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Heebo', system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
}"""

    workflow_yaml = """name: Deploy React App to GitHub Pages

on:
  push:
    branches: ["main", "master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install

      - name: Build Project
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
"""

    print("\n📦 מעלה קבצי תשתית לפרויקט...")

    # העלאת קבצי התצורה וההגדרות
    upload_to_github(repo, "package.json", package_json)
    upload_to_github(repo, "vite.config.js", vite_config)
    upload_to_github(repo, "tailwind.config.js", tailwind_config)
    upload_to_github(repo, "postcss.config.js", postcss_config)

    # העלאת קבצי המקור
    upload_to_github(repo, "index.html", index_html)
    upload_to_github(repo, "src/main.jsx", main_jsx)
    upload_to_github(repo, "src/index.css", index_css)

    # העלאת הקוד של המצגת (הקובץ המקומי)
    print("📜 מעלה את הקוד המקורי שלך...")
    upload_to_github(repo, "src/App.jsx", user_code)

    # העלאת ה-Workflow
    print("⚙️ מגדיר אוטומציה ב-GitHub Actions...")
    upload_to_github(repo, ".github/workflows/deploy.yml", workflow_yaml)

    print("\n" + "=" * 60)
    print("✅ הסתיים בהצלחה!")
    print("GitHub בונה כעת את האתר (יקח 1-2 דקות).")


if __name__ == "__main__":
    main()