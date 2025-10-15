---
layout: default
title: "Publications"
permalink: /publications/
---

<div class="publications-page">
    <div class="container">
        <div class="page-header">
            <h1 class="page-title">Publications & Rapports</h1>
            <p class="page-subtitle">Mes publications scientifiques et rapports de recherche</p>
        </div>

        <div class="publications-grid">
            {% for publication in site.data.publications.publications %}
            <div class="publication-card">
                <div class="publication-header">
                    <div class="publication-meta">
                        <span class="publication-type">{{ publication.type }}</span>
                        <span class="publication-date">{{ publication.date }}</span>
                        <span class="publication-category">{{ publication.category }}</span>
                    </div>
                    <h3 class="publication-title">{{ publication.title }}</h3>
                    <h4 class="publication-subtitle">{{ publication.subtitle }}</h4>
                </div>

                <div class="publication-content">
                    <p class="publication-description">{{ publication.description }}</p>
                    
                    <div class="publication-authors">
                        <strong>Auteurs :</strong>
                        {% for author in publication.authors %}
                            {{ author }}{% unless forloop.last %}, {% endunless %}
                        {% endfor %}
                    </div>
                    
                    <div class="publication-institution">
                        <strong>Institution :</strong> {{ publication.institution }}
                    </div>

                    {% if publication.abstract %}
                    <div class="publication-abstract">
                        <h5>Résumé</h5>
                        <p>{{ publication.abstract | truncate: 200 }}</p>
                    </div>
                    {% endif %}

                    {% if publication.keywords %}
                    <div class="publication-keywords">
                        <h5>Mots-clés</h5>
                        <div class="keywords">
                            {% for keyword in publication.keywords %}
                            <span class="keyword">{{ keyword }}</span>
                            {% endfor %}
                        </div>
                    </div>
                    {% endif %}

                    {% if publication.technologies %}
                    <div class="publication-technologies">
                        <h5>Technologies</h5>
                        <div class="technologies">
                            {% for tech in publication.technologies %}
                            <span class="tech-tag">{{ tech }}</span>
                            {% endfor %}
                        </div>
                    </div>
                    {% endif %}
                </div>

                <div class="publication-actions">
                    {% if publication.pdf %}
                    <a href="{{ publication.pdf | relative_url }}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-file-pdf"></i>
                        Télécharger PDF
                    </a>
                    {% endif %}
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</div>

<style>
.publications-page {
    padding: 2rem 0;
    min-height: 100vh;
}

.page-header {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 1rem;
}

.page-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.page-subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
}

.publications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.publication-card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.publication-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.publication-header {
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-bottom: 1px solid #dee2e6;
}

.publication-meta {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.publication-type,
.publication-date,
.publication-category {
    background: #667eea;
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
}

.publication-category {
    background: #10b981;
}

.publication-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    line-height: 1.3;
}

.publication-subtitle {
    font-size: 1rem;
    color: #666;
    font-weight: 400;
    margin-bottom: 0;
}

.publication-content {
    padding: 1.5rem;
}

.publication-description {
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
    margin-bottom: 1rem;
}

.publication-authors,
.publication-institution {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.8rem;
}

.publication-abstract h5,
.publication-keywords h5,
.publication-technologies h5 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
}

.publication-abstract p {
    font-size: 0.9rem;
    line-height: 1.4;
    color: #666;
    margin-bottom: 0;
}

.keywords,
.technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
}

.keyword {
    background: #667eea;
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 0.8rem;
    font-size: 0.8rem;
    font-weight: 500;
}

.tech-tag {
    background: #10b981;
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 0.8rem;
    font-size: 0.8rem;
    font-weight: 500;
}

.publication-actions {
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #667eea;
    color: white;
}

.btn-primary:hover {
    background: #5a67d8;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .publications-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .page-title {
        font-size: 2rem;
    }
    
    .publication-meta {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
