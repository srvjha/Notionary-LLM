# 🎯 Notecast - RAG-Powered Knowledge Assistant

A sophisticated **Retrieval Augmented Generation (RAG)** web application that transforms your documents, websites, and text into an intelligent, queryable knowledge base. Upload your content and chat with your data using advanced AI-powered responses with full context awareness.

[![Demo](https://img.shields.io/badge/🌐_Live_Demo-notecast.srvjha.in-blue)](https://notecast.srvjha.in/)
[![Video Demo](https://img.shields.io/badge/📺_YouTube-Demo_Video-red)](https://youtu.be/ctOAPrMxJY0)
[![GitHub](https://img.shields.io/badge/📁_Source-GitHub_Repo-black)](https://github.com/srvjha/notecast)

---

## ✨ Key Features

### 📚 **Multi-Source Data Ingestion**
- **📄 PDF Upload**: Extract and index content from PDF documents
- **🌐 Website Scraping**: Input any website URL to scrape and index web content  
- **📝 Direct Text Input**: Paste text content directly for immediate indexing
- **💾 Local Storage Persistence**: All your data sources are saved locally for instant access

### 🤖 **Intelligent Chat Interface** 
- **Context-Aware Responses**: Get accurate answers based on your uploaded content
- **RAG-Powered**: Advanced retrieval system ensures responses are grounded in your data
- **Chat History**: Persistent conversation history for each data source
- **Real-time Processing**: Instant responses with loading indicators
- **Markdown Support**: Rich text formatting in chat responses

### 🎨 **Modern User Experience**
- **Intuitive Interface**: Clean, dark-themed UI with smooth animations
- **Source Management**: Easily switch between different data sources
- **Upload Progress**: Visual feedback during file processing
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **State Persistence**: Resume conversations exactly where you left off

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)

### Installation Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/srvjha/notecast.git
   cd notecast
   ```

2. **Install Dependencies**
   ```bash
   # Using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```bash
   # Add your environment variables
   OPENAI_API_KEY=your_openai_key
   GEMINI_API_KEY=your_gemini_key
   QDRANT_API_KEY=your_qdrant_key
   QDRANT_URL=your_qdrant_url
   QDRANT_HOST=your_qdrant_host
   # Add other required API keys or configuration
   ```

4. **Start Development Server**
   ```bash
   # Using npm
   npm run dev

   # Or using yarn  
   yarn dev
   ```

5. **Open Your Browser**
   Navigate to `http://localhost:3000` to see the application running.

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
notecast/
├── 📁 .next/                 # Next.js build files
├── 📁 node_modules/          # Dependencies
├── 📁 public/               # Static assets
├── 📁 src/                  # Source code
│   ├── 📁 app/              # Next.js 13+ App Router
│   │   ├── 📁 api/          # API routes
│   │   │   ├── 📁 chat/     # Chat endpoints
│   │   │   ├── 📁 pdfchat/  # PDF processing endpoints  
│   │   │   ├── 📁 textindexing/  # Text indexing endpoints
│   │   │   └── 📁 webindexing/   # Web scraping endpoints
│   │   ├── 📁 guide/        # Documentation pages
│   │   ├── 🎨 favicon.ico   # App favicon
│   │   ├── 🌐 globals.css   # Global styles
│   │   ├── 📄 layout.tsx    # Root layout component
│   │   ├── 📄 page.tsx      # Main page component
│   │   └── 📄 Providers.tsx # Context providers
│   ├── 📁 components/       # React components
│   │   ├── 📁 ui/          # Reusable UI components
│   │   ├── 📄 ChatBox.tsx   # Chat interface component
│   │   ├── 📄 InputBox.tsx  # Source management component
│   │   └── 📄 UploadSourceModal.tsx  # Upload modal
│   ├── 📁 services/         # API services & data fetching
│   └── 📁 utils/           # Utility functions & helpers
├── 📄 .gitignore           # Git ignore rules
├── 📄 README.md           # Project documentation
├── 📄 package.json        # Dependencies & scripts
├── 📄 tailwind.config.js  # Tailwind CSS configuration
└── 📄 tsconfig.json       # TypeScript configuration
```

---

## 🛠️ How It Works

### 1. **Data Upload & Processing**
- Choose your data source: PDF file, website URL, or direct text
- The application processes and indexes your content using advanced NLP techniques
- Data is stored locally in your browser for instant access

### 2. **Intelligent Indexing** 
- Content is chunked and vectorized for optimal retrieval
- Semantic search capabilities ensure relevant information retrieval
- RAG pipeline combines retrieval with generation for accurate responses

### 3. **Contextual Chat**
- Ask questions in natural language about your uploaded content
- The AI provides accurate, context-aware responses based on your data
- Chat history is preserved for each data source

---

## 🎯 Use Cases

### 📚 **Academic Research**
- Upload research papers and query specific findings
- Analyze multiple documents simultaneously
- Generate summaries and extract key insights

### 💼 **Business Intelligence** 
- Process company reports and financial documents
- Query policies, procedures, and documentation
- Extract actionable insights from business data

### 📖 **Personal Knowledge Management**
- Create a searchable library of your notes and documents  
- Quick reference for important information
- Build your personal AI assistant trained on your content

### 🌐 **Content Analysis**
- Analyze website content and articles
- Compare information across multiple sources
- Research and fact-checking assistance

---

## 🔧 Technical Stack

- **Frontend**: Next.js 13+, React, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hook Form, React Query
- **UI Components**: Custom components with Lucide icons
- **Storage**: Browser localStorage for data persistence
- **AI/ML**: RAG (Retrieval Augmented Generation) pipeline
- **File Processing**: PDF parsing, web scraping capabilities

---

## 🚦 Current Limitations & Roadmap

### Currently Supports:
- ✅ PDF files
- ✅ Website URLs  
- ✅ Direct text input
- ✅ Local storage persistence

### Planned Features:
- 📋 CSV and Excel file support
- 🗄️ Cloud storage integration
- 👥 Multi-user support
- 🔍 Advanced search filters
- 📊 Analytics and insights dashboard
- 🔄 Real-time collaboration

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support & Contact

- **Live Demo**: [notecast.srvjha.in](https://notecast.srvjha.in/)
- **Video Tutorial**: [YouTube Demo](https://youtu.be/jkEWwFz5X_A)
- **Issues**: [GitHub Issues](https://github.com/srvjha/notecast/issues)
- **Developer**: [@srvjha](https://github.com/srvjha)

---

## 🌟 Acknowledgments

- Thanks to the open-source community for the amazing tools and libraries
- Special recognition to the RAG research community for advancing the field
- Built with ❤️ for knowledge workers and researchers everywhere

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**