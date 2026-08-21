const editor = document.getElementById("editor");
const previewText = document.getElementById("previewText");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");

const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");


// ==========================================
// HISTORY
// ==========================================

let history = [""];
let historyIndex = 0;
let isRestoringHistory = false;

function saveHistory() {

    if (isRestoringHistory) return;

    const currentValue = editor.value;

    if (history[historyIndex] === currentValue) return;

    history = history.slice(0, historyIndex + 1);

    history.push(currentValue);

    historyIndex++;

    updateHistoryButtons();
}

function updateHistoryButtons() {

    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= history.length - 1;

}


// ==========================================
// PREVIEW + COUNTERS
// ==========================================

editor.addEventListener("input", () => {

    updatePreview();
    saveHistory();

});

function updatePreview() {

    const text = editor.value;

    charCount.textContent =
        `${text.length} / 3000 characters`;

    const words = text
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    wordCount.textContent =
        `${words.length} ${words.length === 1 ? "word" : "words"}`;

    if (text.trim() === "") {

        previewText.textContent =
            "Your formatted LinkedIn post will appear here...";

        return;
    }

    previewText.textContent = text;

}


// ==========================================
// UNICODE CHARACTER CONVERTER
// ==========================================

function convertCharacter(char, type) {

    const code = char.codePointAt(0);


    // BOLD

    if (type === "bold") {

        if (code >= 65 && code <= 90) {
            return String.fromCodePoint(
                0x1D400 + (code - 65)
            );
        }

        if (code >= 97 && code <= 122) {
            return String.fromCodePoint(
                0x1D41A + (code - 97)
            );
        }

        if (code >= 48 && code <= 57) {
            return String.fromCodePoint(
                0x1D7CE + (code - 48)
            );
        }

    }


    // ITALIC

    if (type === "italic") {

        const italicUpper = {
            A: "𝐴", B: "𝐵", C: "𝐶", D: "𝐷",
            E: "𝐸", F: "𝐹", G: "𝐺", H: "𝐻",
            I: "𝐼", J: "𝐽", K: "𝐾", L: "𝐿",
            M: "𝑀", N: "𝑁", O: "𝑂", P: "𝑃",
            Q: "𝑄", R: "𝑅", S: "𝑆", T: "𝑇",
            U: "𝑈", V: "𝑉", W: "𝑊", X: "𝑋",
            Y: "𝑌", Z: "𝑍"
        };

        const italicLower = {
            a: "𝑎", b: "𝑏", c: "𝑐", d: "𝑑",
            e: "𝑒", f: "𝑓", g: "𝑔", h: "ℎ",
            i: "𝑖", j: "𝑗", k: "𝑘", l: "𝑙",
            m: "𝑚", n: "𝑛", o: "𝑜", p: "𝑝",
            q: "𝑞", r: "𝑟", s: "𝑠", t: "𝑡",
            u: "𝑢", v: "𝑣", w: "𝑤", x: "𝑥",
            y: "𝑦", z: "𝑧"
        };

        return italicUpper[char]
            || italicLower[char]
            || char;
    }


    // MONOSPACE

    if (type === "mono") {

        if (code >= 65 && code <= 90) {
            return String.fromCodePoint(
                0x1D670 + (code - 65)
            );
        }

        if (code >= 97 && code <= 122) {
            return String.fromCodePoint(
                0x1D68A + (code - 97)
            );
        }

        if (code >= 48 && code <= 57) {
            return String.fromCodePoint(
                0x1D7F6 + (code - 48)
            );
        }

    }

    return char;
}


// ==========================================
// CONVERT TEXT
// ==========================================

function convertText(text, type) {

    return [...text]
        .map(char => convertCharacter(char, type))
        .join("");

}


// ==========================================
// BOLD + ITALIC
// ==========================================

function convertBoldItalic(text) {

    const upperStart = 0x1D468;
    const lowerStart = 0x1D482;

    return [...text]
        .map(char => {

            const code = char.codePointAt(0);

            if (code >= 65 && code <= 90) {
                return String.fromCodePoint(
                    upperStart + (code - 65)
                );
            }

            if (code >= 97 && code <= 122) {
                return String.fromCodePoint(
                    lowerStart + (code - 97)
                );
            }

            return char;

        })
        .join("");

}


// ==========================================
// STRIKETHROUGH
// ==========================================

function addStrikethrough(text) {

    return [...text]
        .map(char => {

            if (char === "\n") {
                return char;
            }

            return char + "\u0336";

        })
        .join("");

}


// ==========================================
// BULLET LIST
// ==========================================

function createBulletList(text) {

    return text
        .split("\n")
        .map(line =>
            line.trim()
                ? `• ${line}`
                : line
        )
        .join("\n");

}


// ==========================================
// NUMBERED LIST
// ==========================================

function createNumberedList(text) {

    let number = 1;

    return text
        .split("\n")
        .map(line =>
            line.trim()
                ? `${number++}. ${line}`
                : line
        )
        .join("\n");

}


// ==========================================
// APPLY FORMAT
// ==========================================

function applyFormat(format) {

    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    if (start === end) {

        copyMessage.textContent =
            "Select some text first.";

        setTimeout(() => {
            copyMessage.textContent = "";
        }, 1800);

        return;
    }

    const selectedText =
        editor.value.substring(start, end);

    let formattedText = selectedText;

    switch (format) {

        case "bold":
            formattedText =
                convertText(selectedText, "bold");
            break;

        case "italic":
            formattedText =
                convertText(selectedText, "italic");
            break;

        case "boldItalic":
            formattedText =
                convertBoldItalic(selectedText);
            break;

        case "mono":
            formattedText =
                convertText(selectedText, "mono");
            break;

        case "strike":
            formattedText =
                addStrikethrough(selectedText);
            break;

        case "bullet":
            formattedText =
                createBulletList(selectedText);
            break;

        case "number":
            formattedText =
                createNumberedList(selectedText);
            break;

    }

    editor.setRangeText(
        formattedText,
        start,
        end,
        "select"
    );

    updatePreview();
    saveHistory();

    editor.focus();

}


// ==========================================
// TOOLBAR
// ==========================================

document.querySelectorAll(".format-btn[data-format]")
    .forEach(button => {

        button.addEventListener("click", () => {

            applyFormat(
                button.dataset.format
            );

        });

    });


// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

editor.addEventListener("keydown", event => {

    const isModifier =
        event.ctrlKey || event.metaKey;

    if (!isModifier) return;


    // Ctrl / Cmd + B

    if (event.key.toLowerCase() === "b") {

        event.preventDefault();

        applyFormat("bold");

    }


    // Ctrl / Cmd + I

    if (event.key.toLowerCase() === "i") {

        event.preventDefault();

        applyFormat("italic");

    }


    // Ctrl / Cmd + Z

    if (
        event.key.toLowerCase() === "z"
        && !event.shiftKey
    ) {

        event.preventDefault();

        undo();

    }


    // Ctrl / Cmd + Shift + Z

    if (
        event.key.toLowerCase() === "z"
        && event.shiftKey
    ) {

        event.preventDefault();

        redo();

    }

});


// ==========================================
// UNDO
// ==========================================

function undo() {

    if (historyIndex <= 0) return;

    historyIndex--;

    restoreHistory();

}


// ==========================================
// REDO
// ==========================================

function redo() {

    if (
        historyIndex >=
        history.length - 1
    ) return;

    historyIndex++;

    restoreHistory();

}


// ==========================================
// RESTORE HISTORY
// ==========================================

function restoreHistory() {

    isRestoringHistory = true;

    editor.value =
        history[historyIndex];

    updatePreview();

    isRestoringHistory = false;

    updateHistoryButtons();

    editor.focus();

}


undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);


// ==========================================
// CLEAR
// ==========================================

clearBtn.addEventListener("click", () => {

    editor.value = "";

    updatePreview();
    saveHistory();

    editor.focus();

});


// ==========================================
// COPY
// ==========================================

copyBtn.addEventListener("click", async () => {

    if (!editor.value.trim()) {

        copyMessage.textContent =
            "Nothing to copy yet.";

        return;
    }

    try {

        await navigator.clipboard.writeText(
            editor.value
        );

        const originalText =
            copyBtn.textContent;

        copyBtn.textContent =
            "✓ Copied!";

        copyMessage.textContent =
            "Ready to paste into LinkedIn.";

        setTimeout(() => {

            copyBtn.textContent =
                originalText;

            copyMessage.textContent =
                "";

        }, 2200);

    } catch {

        copyMessage.textContent =
            "Copy failed. Select the text and copy it manually.";

    }

});


// ==========================================
// TEMPLATES
// ==========================================

const templates = {

    career: `🚀 Career Update

I'm excited to share a new chapter in my professional journey.

Over the past few months, I've been learning, growing, and taking on new challenges.

Here are a few things I've learned along the way:

• Stay curious
• Keep learning
• Build meaningful connections
• Share what you know

I'm looking forward to what comes next!

#CareerGrowth #Learning #LinkedIn`,

    learning: `💡 Something I learned recently...

One of the biggest lessons I've learned is that consistent learning compounds over time.

Instead of trying to learn everything at once, I've started focusing on:

• Understanding the fundamentals
• Practicing consistently
• Building real projects
• Sharing what I learn

Small progress every day eventually becomes something significant.

What are you learning right now?

#Learning #GrowthMindset #Technology`,

    project: `🔧 Project Showcase

I recently worked on a project that challenged me to think differently.

The goal was simple:

Make a useful tool that solves a real problem.

What I focused on:

• User experience
• Simplicity
• Performance
• Practical functionality

Building projects like this continues to teach me more than simply reading documentation.

More projects coming soon!

#BuildInPublic #Technology #Projects`

};


// ==========================================
// TEMPLATE BUTTONS
// ==========================================

document.querySelectorAll(".template-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            editor.value =
                templates[button.dataset.template];

            updatePreview();
            saveHistory();

            editor.focus();

        });

    });


// Initial state
updatePreview();
updateHistoryButtons();

// ==========================================
// DARK MODE
// ==========================================

const themeToggle =
    document.getElementById("themeToggle");


// Check whether the user previously
// selected a theme
const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    themeToggle.textContent = "☀️";

    themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
    );

}


// Toggle theme
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const darkModeActive =
        document.body.classList.contains("dark-mode");


    if (darkModeActive) {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});

// ==========================================
// PROFILE PREVIEW
// ==========================================

const profileName =
    document.getElementById("profileName");

const profileHeadline =
    document.getElementById("profileHeadline");

const previewName =
    document.getElementById("previewName");

const previewHeadline =
    document.getElementById("previewHeadline");

const previewAvatar =
    document.getElementById("previewAvatar");


// Generate initials
function getInitials(name) {

    const words = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 0) {
        return "YN";
    }

    if (words.length === 1) {
        return words[0]
            .charAt(0)
            .toUpperCase();
    }

    return (
        words[0].charAt(0) +
        words[words.length - 1].charAt(0)
    ).toUpperCase();

}


// Update profile preview
function updateProfilePreview() {

    const name =
        profileName.value.trim() || "Your Name";

    const headline =
        profileHeadline.value.trim()
        || "Your professional headline";

    previewName.textContent = name;

    previewHeadline.textContent =
        headline;

    previewAvatar.textContent =
        getInitials(name);

}


// Listen for changes
profileName.addEventListener(
    "input",
    updateProfilePreview
);

profileHeadline.addEventListener(
    "input",
    updateProfilePreview
);


// Initial profile
updateProfilePreview();