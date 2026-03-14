const unicodeMaps = {
    bold: {
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
        'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
        'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
        'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
        'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
        '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
    },
    italic: {
        'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫',
        'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵',
        'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
        'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑',
        'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛',
        'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
    },
    boldItalic: {
        'a': '𝙖', 'b': '𝙗', 'c': '𝙘', 'd': '𝙙', 'e': '𝙚', 'f': '𝙛', 'g': '𝙜', 'h': '𝙝', 'i': '𝙞', 'j': '𝙟',
        'k': '𝙠', 'l': '𝙡', 'm': '𝙢', 'n': '𝙣', 'o': '𝙤', 'p': '𝙥', 'q': '𝙦', 'r': '𝙧', 's': '𝙨', 't': '𝙩',
        'u': '𝙪', 'v': '𝙫', 'w': '𝙬', 'x': '𝙭', 'y': '𝙮', 'z': '𝙯',
        'A': '𝘼', 'B': '𝘽', 'C': '𝘾', 'D': '𝘿', 'E': '𝙀', 'F': '𝙁', 'G': '𝙂', 'H': '𝙃', 'I': '𝙄', 'J': '𝙅',
        'K': '𝙆', 'L': '𝙇', 'M': '𝙈', 'N': '𝙉', 'O': '𝙊', 'P': '𝙋', 'Q': '𝙌', 'R': '𝙍', 'S': '𝙎', 'T': '𝙏',
        'U': '𝙐', 'V': '𝙑', 'W': '𝙒', 'X': '𝙓', 'Y': '𝙔', 'Z': '𝙕'
    }
};

// Create reverse maps
const reverseMaps = {
    bold: {},
    italic: {},
    boldItalic: {}
};

for (let [normal, bold] of Object.entries(unicodeMaps.bold)) {
    reverseMaps.bold[bold] = normal;
}
for (let [normal, italic] of Object.entries(unicodeMaps.italic)) {
    reverseMaps.italic[italic] = normal;
}
for (let [normal, boldItalic] of Object.entries(unicodeMaps.boldItalic)) {
    reverseMaps.boldItalic[boldItalic] = normal;
}

const input = document.getElementById('input');

input.addEventListener('input', () => {
    // input is the single source of truth
});

function applyFormat(type) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = input.value.substring(start, end);

    if (!selectedText) {
        showNotification('Please select text first');
        return;
    }

    const normalizedText = normalizeText(selectedText);
    const currentFormat = detectFormat(selectedText);
    
    let formatted = '';
    
    if (type === 'bold') {
        if (currentFormat === 'italic') {
            formatted = applyUnicodeMap(normalizedText, unicodeMaps.boldItalic);
        } else if (currentFormat === 'boldItalic' || currentFormat === 'bold') {
            formatted = selectedText;
        } else {
            formatted = applyUnicodeMap(normalizedText, unicodeMaps.bold);
        }
    } else if (type === 'italic') {
        if (currentFormat === 'bold') {
            formatted = applyUnicodeMap(normalizedText, unicodeMaps.boldItalic);
        } else if (currentFormat === 'boldItalic' || currentFormat === 'italic') {
            formatted = selectedText;
        } else {
            formatted = applyUnicodeMap(normalizedText, unicodeMaps.italic);
        }
    } else if (type === 'underline') {
        formatted = selectedText.split('\n').map(line => {
            const len = [...line].length;
            return line + '\n' + '_'.repeat(len);
        }).join('\n');
    }

    const newText = input.value.substring(0, start) + formatted + input.value.substring(end);
    const scrollTop = input.scrollTop;
    input.value = newText;

    requestAnimationFrame(() => {
        input.focus();
        input.scrollTop = scrollTop;
        input.setSelectionRange(start, start + formatted.length);
    });
}

function normalizeText(text) {
    let result = text;
    
    for (let [bold, normal] of Object.entries(reverseMaps.bold)) {
        result = result.split(bold).join(normal);
    }
    
    for (let [italic, normal] of Object.entries(reverseMaps.italic)) {
        result = result.split(italic).join(normal);
    }
    
    for (let [boldItalic, normal] of Object.entries(reverseMaps.boldItalic)) {
        result = result.split(boldItalic).join(normal);
    }
    
    return result;
}

function detectFormat(text) {
    const chars = text.split('');
    
    let hasBold = false;
    let hasItalic = false;
    let hasBoldItalic = false;
    
    for (let char of chars) {
        if (reverseMaps.boldItalic[char]) hasBoldItalic = true;
        if (reverseMaps.bold[char]) hasBold = true;
        if (reverseMaps.italic[char]) hasItalic = true;
    }
    
    if (hasBoldItalic) return 'boldItalic';
    if (hasBold) return 'bold';
    if (hasItalic) return 'italic';
    return 'normal';
}

function applyUnicodeMap(text, map) {
    return text.split('').map(c => map[c] || c).join('');
}

function applyBullet(symbol) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = input.value.substring(start, end);

    if (!selectedText) {
        showNotification('Please select text first');
        return;
    }

    const lines = selectedText.split('\n');
    const formatted = lines.map(line => line.trim() ? `${symbol} ${line.trim()}` : '').filter(l => l).join('\n');

    const newText = input.value.substring(0, start) + formatted + input.value.substring(end);
    const scrollTop = input.scrollTop;
    input.value = newText;

    requestAnimationFrame(() => {
        input.focus();
        input.scrollTop = scrollTop;
        input.setSelectionRange(start, start + formatted.length);
    });

}

function applyBulletFromDropdown() {
    const select = document.getElementById('bulletSelect');
    const symbol = select.value;
    
    if (!symbol) return;
    
    applyBullet(symbol);
    select.value = '';
}

function copyOutput() {
    const text = input.value;
    if (!text) return;
    navigator.clipboard.writeText(text).catch(() => {
        input.select();
        document.execCommand('copy');
    });
}

function applyIndent() {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selectedText = input.value.substring(start, end);

    if (!selectedText) return;

    const lines = selectedText.split('\n');
    const formatted = lines.map((line, i) => i === 0 ? `│ ${line}` : `  ${line}`).join('\n');
    const newText = input.value.substring(0, start) + formatted + input.value.substring(end);
    const scrollTop = input.scrollTop;
    input.value = newText;

    requestAnimationFrame(() => {
        input.focus();
        input.scrollTop = scrollTop;
        input.setSelectionRange(start, start + formatted.length);
    });
}

function clearText() {
    input.value = '';
    input.focus();
}

function showNotification(message) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.classList.add('show');

    setTimeout(() => {
        notif.classList.remove('show');
    }, 2500);
}