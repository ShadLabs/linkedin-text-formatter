# LinkedIn Text Formatter

A lightweight, privacy-friendly web application for writing, formatting, previewing, and copying polished LinkedIn posts.

Transform ordinary text into LinkedIn-compatible Unicode styles, preview your post in real time, and copy it when you're ready to publish — no account, installation, or backend required.

[🚀 Try the Live App](https://shadlabs.github.io/linkedin-text-formatter/) · [💻 View Source](https://github.com/ShadLabs/linkedin-text-formatter)

---

## 📸 Preview

[LinkedIn Text Formatter Preview](assets/LTF.png)

---

## ✨ Features

### Text Formatting

- **Bold** Unicode text
- *Italic* Unicode text
- ***Bold + Italic*** text
- Monospace text
- Strikethrough
- Bullet lists
- Numbered lists

### Writing Experience

- Real-time post preview
- Character counter
- Word counter
- Undo and redo
- Ready-to-use post templates
- One-click copy to clipboard

### Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl/Cmd + B` | Bold selected text |
| `Ctrl/Cmd + I` | Italic selected text |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |

### Personalization

- Editable preview name
- Editable professional headline
- Automatically generated initials
- Light and dark modes
- Saved theme preference

### Privacy

🔒 Your writing stays in your browser.

The application performs formatting and preview operations entirely on the client side. Post content is not sent to a backend server.

---

## 🌐 Live Demo

### [🚀 Launch LinkedIn Text Formatter](https://shadlabs.github.io/linkedin-text-formatter/)

No installation or account is required.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Application structure |
| CSS3 | Responsive interface and theming |
| JavaScript | Application logic and interactions |
| Unicode | LinkedIn-compatible styled characters |
| Clipboard API | Copy formatted posts |
| Web Storage API | Persist theme preference |
| Git & GitHub | Version control and source hosting |
| GitHub Pages | Deployment |

The application was intentionally built without a frontend framework or external dependency.

---

## 💡 How It Works

LinkedIn posts don't provide traditional rich-text controls for formatting ordinary post text.

Instead of inserting HTML tags such as:

```html
<strong>Hello LinkedIn</strong>
```

the formatter transforms supported characters into Unicode Mathematical Alphanumeric Symbols.

For example:

```text
Hello LinkedIn
```

becomes:

```text
𝐇𝐞𝐥𝐥𝐨 𝐋𝐢𝐧𝐤𝐞𝐝𝐈𝐧
```

Because the result is text rather than HTML markup, it can be copied from the formatter and pasted into supported text fields.

> **Note:** Unicode-styled text is visually useful for emphasis, but excessive use can reduce readability and may not be interpreted consistently by assistive technologies. Use formatting selectively.

---

## 🧠 What I Learned

Building this project gave me practical experience with:

- DOM manipulation and browser events
- Unicode character transformation
- Working with Unicode code points
- The Clipboard API
- Browser `localStorage`
- Keyboard event handling
- Undo/redo state management
- Responsive CSS layouts
- Light/dark theme implementation
- Client-side application architecture
- Git and GitHub workflows
- Deploying static applications with GitHub Pages

One interesting challenge was handling Unicode correctly. Some styled Unicode characters are represented outside the Basic Multilingual Plane, so treating them like ordinary single JavaScript characters can produce corrupted output.

The formatter handles these transformations using Unicode-aware JavaScript techniques such as `codePointAt()` and `String.fromCodePoint()`.

---

## 📂 Project Structure

```text
linkedin-text-formatter/
│
├── assets/
│   └── screenshot.png
│
├── .nojekyll
├── index.html
├── style.css
├── script.js
├── LICENSE
└── README.md
```

---

## 💻 Run Locally

Clone the repository:

```bash
git clone https://github.com/ShadLabs/linkedin-text-formatter.git
```

Move into the project:

```bash
cd linkedin-text-formatter
```

Then open:

```text
index.html
```

in your browser.

There are no dependencies to install and no build command is required.

---

## 🗺️ Roadmap

Potential improvements for future versions include:

- [ ] Additional Unicode text styles
- [ ] More LinkedIn post templates
- [ ] Emoji picker
- [ ] Hashtag helper
- [ ] Improved formatting toggles
- [ ] Additional accessibility improvements
- [ ] Customizable preview settings

Suggestions and contributions are welcome.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push your branch
6. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built by **Shadrack Kpani Odametey** as a frontend development project focused on creating a practical tool for LinkedIn content creation.

If you found the project useful, consider giving the repository a ⭐.

---

**[Try the formatter →](https://shadlabs.github.io/linkedin-text-formatter/)**