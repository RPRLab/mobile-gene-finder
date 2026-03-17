# Awesome Mobile Genetic Elements [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated, searchable catalogue of bioinformatics tools for **mobile genetic elements (MGEs)**, phages, viruses, plasmids, and related genomic analyses.

🌐 **Browse the interactive website → [rprlab.github.io/mobile-gene-finder](https://rprlab.github.io/mobile-gene-finder/)**

---

## Contents

- [About](#about)
- [Categories](#categories)
- [Live Data](#live-data)
- [Contributing](#contributing)
- [License](#license)

## About

This repository powers an interactive web registry of **150+ tools** across **19 categories** covering the full spectrum of MGE research — from virus/phage identification and genome annotation to host prediction, taxonomy, and anti-phage defence systems.

The website features:
- 🔍 **Search & filter** by category, target organism, and maintenance status
- 📊 **Live GitHub metadata** (stars, forks, last update) scraped daily
- 🏷️ **Status badges** — maintained, stale, deprecated, or unavailable
- 📋 **Table & card views** for easy browsing
- 🔗 **Direct links** to code repositories and publications

## Categories

| Category | Description |
|---|---|
| Anti-phage Defence Systems | Tools for detecting CRISPR, restriction-modification, and other defence systems |
| CRISPR Analysis | CRISPR array detection and spacer analysis |
| Functional Analysis / AMGs | Auxiliary metabolic gene detection and functional annotation |
| Genome Annotation | Phage and virus genome annotation pipelines |
| Genome Assembly | Virus/phage-specific genome assembly tools |
| Genome Completeness / Quality | Quality assessment and completeness estimation |
| Host Prediction | Computational host prediction for phages and viruses |
| Integrated Pipelines | End-to-end analysis platforms |
| Lifestyle Prediction | Temperate vs. virulent lifestyle classification |
| Mobile Genetic Elements | Plasmid, ICE, IS element, integron, and transposon detection |
| Phage Comparative Genomics | Comparative genomics and pan-genome analysis |
| Prophage Identification | Prophage detection in bacterial genomes |
| RNA Virus Analysis | RNA virus-specific identification and analysis |
| Sequence Database | Curated viral/phage sequence databases |
| Simulation | Virome and metagenome simulation tools |
| Taxonomy / Classification | Viral taxonomy and classification frameworks |
| Virus / Phage Identification | General virus and phage identification from metagenomes |
| Within-sample Diversity | Strain-level diversity and population genetics |

## Live Data

GitHub metadata (stars, forks, open issues, last push date) is automatically scraped daily via a [GitHub Actions workflow](.github/workflows/scrape.yml) and stored in [`public/scraped-data.json`](public/scraped-data.json).

## Contributing

Contributions are welcome! To suggest a new tool:

1. **Open an issue** with the tool name, URL, category, and a brief description
2. Or **submit a pull request** adding the tool to [`src/data/tools.ts`](src/data/tools.ts)

Please ensure the tool is:
- Publicly available (code repository or web service)
- Related to mobile genetic elements, phages, viruses, or related genomic analyses
- Has an associated publication or preprint (preferred)

## License

This project is open source. See the repository for details.

---

<p align="center">
  Made with ❤️ for the MGE research community
</p>
