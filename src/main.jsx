import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './components/portfolio.jsx'
import FilmSlateCase from './components/case-studies/FilmSlateCase.jsx'
import FreqSpaceCase from './components/case-studies/FreqSpaceCase.jsx'
import PublicationSummarizerCase from './components/case-studies/PublicationSummarizerCase.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/case-study/filmslate" element={<FilmSlateCase />} />
                <Route path="/case-study/freq-space" element={<FreqSpaceCase />} />
                <Route path="/case-study/publication-summarizer" element={<PublicationSummarizerCase />} />
            </Routes>
        </Router>
    </React.StrictMode>,
)
