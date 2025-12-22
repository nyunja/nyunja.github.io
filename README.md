# Portfolio - John Paul Nyunja

A modern, industrial-themed portfolio website showcasing my work as a Full Stack / GoLang Developer. Built with pure HTML, CSS, and vanilla JavaScript, featuring a unique design aesthetic with glassmorphic cards, animated elements, and full responsive support.

🌐 **Live Site**: [nyunja.github.io](https://nyunja.github.io)

## Features

### Design & UI
- **Industrial Aesthetic**: Sharp corners, bold typography, and high-contrast color scheme
- **Glassmorphic Cards**: Transparent cards with backdrop blur and animated shine effects
- **Noise & Grid Overlays**: Textured backgrounds for added depth and materiality
- **Serrated Edges**: Custom clip-path designs for unique section transitions
- **Animated Ticker**: Horizontal scrolling technology showcase
- **Reveal Animations**: Intersection Observer-based scroll animations

### Functionality
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices (360px - 1400px+)
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Interactive Elements**: Hover states, lift animations, and shiny reflections
- **Keyboard Accessible**: Skip-to-content links and proper ARIA labels
- **SEO Optimized**: Complete meta tags, Open Graph, and Twitter Cards
- **Download Resume**: Instant PDF resume download functionality

### Sections
- **Hero**: Eye-catching introduction with outline text effects
- **About**: Professional summary and key expertise
- **Projects**: Featured works with live demos and GitHub links
- **Experience**: Professional work history with glassmorphic cards
- **Tech Stack**: Comprehensive skills showcase
- **Education**: Academic background and certifications
- **Blog**: Thought leadership and technical articles (coming soon)
- **Contact**: Multiple contact methods and social links

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern features including backdrop-filter, custom properties, grid, and flexbox
- **JavaScript (Vanilla)**: Intersection Observer, smooth scroll, and dynamic animations
- **Google Fonts**: Archivo Black & Space Mono for distinctive typography

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── style.css              # All styles and responsive design
├── favicon.svg            # Site favicon
├── resume/                # Resume files
│   ├── John Paul Nyunja - Full Stack _ GoLang Developer.pdf
│   ├── John Paul Nyunja - Full Stack _ GoLang Developer.md
│   └── John Paul Nyunja - Full Stack _ GoLang Developer.txt
└── images/                # Project screenshots
    ├── rentbase.png
    └── fitybudget.png
```

## 🎨 Design Philosophy

This portfolio embraces an **industrial design language** characterized by:

- **Sharp Geometry**: No rounded corners on main elements
- **Monospace Typography**: Technical, precise feel with Space Mono
- **High Contrast**: Dark background (#0d0d0d) with bright text (#e0e0e0)
- **Safety Orange Accent**: (#FF5722) for calls-to-action and highlights
- **Texture & Depth**: Noise overlays, grid patterns, and multi-layered shadows
- **Materiality**: Glassmorphic effects suggesting transparency and depth

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: Glassmorphic effects (backdrop-filter) are supported in modern browsers. Fallbacks are in place for older browsers.

## 📱 Responsive Breakpoints

- **Desktop**: 1025px and above
- **Tablet**: 769px - 1024px
- **Mobile**: 481px - 768px
- **Small Mobile**: 320px - 480px
- **Extra Small**: 360px and below

## 🚀 Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/nyunja/nyunja.github.io.git
cd nyunja.github.io
```

2. Open `index.html` in your browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or simply open the file
open index.html
```

3. View in browser:
```
http://localhost:8000
```

### GitHub Pages Deployment

This site is deployed using GitHub Pages at [nyunja.github.io](https://nyunja.github.io).

**To deploy updates:**

1. Make your changes locally
2. Commit and push to the main branch:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

3. GitHub Pages will automatically deploy your changes within a few minutes

**Alternative Deployment Options:**

This static site can also be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the folder
- **Cloudflare Pages**: Connect repository
- **Render**: Deploy as static site

## 🎯 Performance Optimizations

- Minimal external dependencies (only Google Fonts)
- Pure CSS animations (no JavaScript animation libraries)
- Optimized images and assets
- Efficient CSS with reusable classes
- Lazy-loaded animations with Intersection Observer

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and landmarks
- Skip-to-content link for keyboard users
- Focus-visible states for all interactive elements
- Sufficient color contrast ratios
- Reduced motion support for users with preferences

## 📊 Analytics

Google Analytics integration ready. Replace placeholder ID in `index.html`:

```html
<!-- Replace 'G-XXXXXXXXXX' with your Google Analytics measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

**Note**: Update the OpenGraph and Twitter Card URLs in the meta tags to `https://nyunja.github.io` for proper social sharing.

## 🔧 Customization

### Colors

Edit CSS custom properties in `style.css`:

```css
:root {
    --bg: #0d0d0d;
    --surface: #1a1a1a;
    --accent: #ff4d00;
    --text: #e0e0e0;
    --mono: 'Space Mono', monospace;
    --sans: 'Archivo Black', sans-serif;
}
```

### Content

Update content directly in `index.html`:
- Personal information in the Hero section
- Projects in the Projects section
- Experience, Education, and Blog sections

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**John Paul Nyunja**
- Email: Nyunja.jp@gmail.com
- GitHub: [@nyunja](https://github.com/nyunja)
- LinkedIn: [nyunja](https://linkedin.com/in/nyunja)
- Location: Kisumu, Kenya

## 🙏 Acknowledgments

- Design inspiration from industrial and brutalist web design
- Typography: Google Fonts (Archivo Black, Space Mono)
- Icons: Inline SVG for performance
