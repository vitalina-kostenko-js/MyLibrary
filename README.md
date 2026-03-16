# MyLibrary 📚

**MyLibrary** — це веб-додаток для перегляду бібліотеки книг з підтримкою авторизації користувачів та багатомовного інтерфейсу.

Користувач може створити акаунт, увійти в систему та переглядати каталог книг, отриманих з **Open Library API**.

Проєкт розроблений як навчальний **full-stack Next.js application** з використанням сучасних frontend технологій.

---

# 🚀 Features

### 🔐 Authentication

* реєстрація користувача
* логін
* збереження сесії
* редірект після входу

### 📚 Book Library

* перегляд списку книг
* сторінка деталей книги
* отримання даних з Open Library API
* пагінація

### 🌍 Internationalization (i18n)

Додаток підтримує **дві мови інтерфейсу:**

* 🇬🇧 English
* 🇩🇪 German

Мова змінюється через роутинг:

```
/en/items
/de/items
```

### 🎨 UI

* адаптивний дизайн
* компоненти **shadcn/ui**
* стилізація через **Tailwind CSS**

### 🧪 Testing

* e2e тести з **Playwright**

---

# 🛠 Tech Stack

| Technology       | Description        |
| ---------------- | ------------------ |
| Next.js          | React framework    |
| TypeScript       | Static typing      |
| Tailwind CSS     | Styling            |
| shadcn/ui        | UI components      |
| Zustand          | State management   |
| NextAuth         | Authentication     |
| Supabase         | Database           |
| Playwright       | End-to-end testing |
| Open Library API | Book data          |

---

# 📦 Installation

Clone repository

```bash
git clone https://github.com/vitalina-kostenko-js/MyLibrary.git
```

Go to project folder

```bash
cd MyLibrary
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Application will run on

```
http://localhost:3000
```

---

# 📁 Project Structure

```
app/
 ├ [locale]/
 │   ├ items/
 │   ├ auth/
 │   └ layout.tsx
 │
shared/
 ├ hooks
 ├ services
 ├ interfaces
 ├ utils
 └ ui
```

---

# 📡 API

Проєкт використовує **Open Library API**.

Example endpoint:

```
https://openlibrary.org/subjects/science_fiction.json
```

Доступні дані:

* title
* author
* cover image
* subjects
* description
* work id

---

# 🧪 Testing

Run Playwright tests

```bash
npm run test
```

Приклади тестів:

* список книг відображається
* перехід на сторінку книги
* перевірка пагінації

---

# 👩‍💻 Author

**Vitalina Kostenko**

GitHub
[https://github.com/vitalina-kostenko-js](https://github.com/vitalina-kostenko-js)

---

# 📄 License

This project was created for educational purposes.
