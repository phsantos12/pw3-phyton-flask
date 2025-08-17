// ========================================
// SISTEMA DE BUSCA E FUNCIONALIDADES API NARUTO
// ========================================

// Sistema de Busca
let searchTimeout;

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value);
        }, 300);
    });
    
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            clearSearch();
        }
    });
    
    clearButton.addEventListener('click', clearSearch);
    searchInput.focus();
}

function performSearch(query) {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    const characterItems = document.querySelectorAll('.character-item');
    const noResults = document.getElementById('noResults');
    const charactersGrid = document.getElementById('charactersGrid');
    const visibleCount = document.getElementById('visibleCount');
    const totalCount = document.getElementById('totalCount');
    
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm.length > 0) {
        clearButton.classList.add('visible');
    } else {
        clearButton.classList.remove('visible');
    }
    
    if (searchTerm.length === 0) {
        restoreOriginalOrder();
        visibleCount.textContent = characterItems.length;
        noResults.style.display = 'none';
        charactersGrid.style.display = 'grid';
        removeHighlights();
        removeSearchEffects();
        return;
    }
    
    const searchResults = [];
    
    characterItems.forEach(item => {
        const characterName = item.getAttribute('data-name');
        const originalName = item.querySelector('.character-name').textContent;
        const score = calculateRelevanceScore(characterName, originalName, searchTerm);
        
        if (score > 0) {
            searchResults.push({
                element: item,
                score: score,
                name: characterName,
                originalName: originalName
            });
        }
    });
    
    searchResults.sort((a, b) => b.score - a.score);
    
    characterItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('search-result');
    });
    
    searchResults.forEach((result, index) => {
        const element = result.element;
        element.style.display = 'block';
        element.classList.add('search-result');
        
        setTimeout(() => {
            element.classList.add('moving-up');
        }, index * 100);
    });
    
    visibleCount.textContent = searchResults.length;
    
    if (searchResults.length === 0) {
        noResults.style.display = 'block';
        charactersGrid.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        charactersGrid.style.display = 'grid';
    }
    
    highlightSearchResults(searchTerm);
}

function calculateRelevanceScore(characterName, originalName, searchTerm) {
    let score = 0;
    
    // Só pontua se o nome contiver EXATAMENTE as letras digitadas
    if (characterName.includes(searchTerm)) {
        score += 100; // Pontuação base para qualquer correspondência
        
        // Bônus para correspondência no início
        if (characterName.startsWith(searchTerm)) {
            score += 50;
        }
        
        // Bônus para correspondência exata de palavras
        const searchWords = searchTerm.split(' ').filter(word => word.length > 0);
        const nameWords = characterName.split(' ');
        
        searchWords.forEach(searchWord => {
            nameWords.forEach(nameWord => {
                if (nameWord.startsWith(searchWord)) {
                    score += 30;
                } else if (nameWord.includes(searchWord)) {
                    score += 15;
                }
            });
        });
        
        // Bônus para nomes mais curtos (mais específicos)
        if (characterName.length <= searchTerm.length + 5) {
            score += 10;
        }
        
        // Bônus para correspondência no nome original
        if (originalName.toLowerCase().includes(searchTerm)) {
            score += 5;
        }
        
        // Bônus de popularidade
        const popularityBonus = getPopularityBonus(originalName);
        score += popularityBonus;
    }
    
    return score;
}

function getPopularityBonus(characterName) {
    const popularCharacters = {
        'Naruto Uzumaki': 20,
        'Sasuke Uchiha': 20,
        'Kakashi Hatake': 15,
        'Itachi Uchiha': 15,
        'Jiraiya': 10,
        'Tsunade': 10,
        'Orochimaru': 10,
        'Minato Namikaze': 10,
        'Hashirama Senju': 10,
        'Madara Uchiha': 10,
        'Rock Lee': 8,
        'Neji Hyuga': 8,
        'Shikamaru Nara': 8,
        'Sakura Haruno': 8,
        'Hinata Hyuga': 8,
        'Gaara': 8,
        'Killer B': 8,
        'Deidara': 8,
        'Sasori': 8,
        'Kisame Hoshigaki': 8
    };
    
    return popularCharacters[characterName] || 0;
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    const visibleCount = document.getElementById('visibleCount');
    const totalCount = document.getElementById('totalCount');
    
    searchInput.value = '';
    clearButton.classList.remove('visible');
    
    restoreOriginalOrder();
    
    visibleCount.textContent = totalCount.textContent;
    
    removeHighlights();
    removeSearchEffects();
    
    searchInput.focus();
}

function restoreOriginalOrder() {
    const characterItems = document.querySelectorAll('.character-item');
    
    characterItems.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('search-result', 'moving-up', 'hidden');
        item.classList.add('visible');
    });
}

function removeSearchEffects() {
    const characterItems = document.querySelectorAll('.character-item');
    characterItems.forEach(item => {
        item.classList.remove('search-result', 'moving-up');
        item.style.display = 'block';
    });
}

function highlightSearchResults(searchTerm) {
    const characterNames = document.querySelectorAll('.character-name');
    
    characterNames.forEach(nameElement => {
        const originalText = nameElement.textContent;
        const lowerText = originalText.toLowerCase();
        const searchIndex = lowerText.indexOf(searchTerm);
        
        if (searchIndex !== -1) {
            const beforeMatch = originalText.substring(0, searchIndex);
            const match = originalText.substring(searchIndex, searchIndex + searchTerm.length);
            const afterMatch = originalText.substring(searchIndex + searchTerm.length);
            
            nameElement.innerHTML = `${beforeMatch}<span class="highlight">${match}</span>${afterMatch}`;
        }
    });
}

function removeHighlights() {
    const characterNames = document.querySelectorAll('.character-name');
    
    characterNames.forEach(nameElement => {
        const highlightedSpans = nameElement.querySelectorAll('.highlight');
        highlightedSpans.forEach(span => {
            span.outerHTML = span.textContent;
        });
    });
}

// Funções para obter informações dos personagens
function getRanking(name) {
    const rankings = {
        'Naruto Uzumaki': 'S+',
        'Sasuke Uchiha': 'S+',
        'Kakashi Hatake': 'S',
        'Itachi Uchiha': 'S+',
        'Jiraiya': 'S',
        'Tsunade': 'S',
        'Orochimaru': 'S',
        'Minato Namikaze': 'S+',
        'Hashirama Senju': 'S+',
        'Madara Uchiha': 'S+',
        'Obito Uchiha': 'S',
        'Nagato': 'S',
        'Killer B': 'S',
        'Gaara': 'S',
        'Rock Lee': 'A',
        'Neji Hyuga': 'A',
        'Shikamaru Nara': 'A',
        'Choji Akimichi': 'B',
        'Ino Yamanaka': 'B',
        'Sakura Haruno': 'A',
        'Hinata Hyuga': 'B',
        'Kiba Inuzuka': 'B',
        'Shino Aburame': 'B',
        'Tenten': 'C',
        'Kankuro': 'A',
        'Temari': 'A',
        'Deidara': 'S',
        'Sasori': 'S',
        'Hidan': 'A',
        'Kakuzu': 'A',
        'Kisame Hoshigaki': 'S',
        'Zetsu': 'B',
        'Konan': 'A',
        'Yahiko': 'A',
        'Danzo Shimura': 'S',
        'Shisui Uchiha': 'S',
        'Fugaku Uchiha': 'A',
        'Mikoto Uchiha': 'B',
        'Kushina Uzumaki': 'A',
        'Mito Uzumaki': 'A',
        'Tobirama Senju': 'S',
        'Hiruzen Sarutobi': 'S',
        'Asuma Sarutobi': 'A',
        'Kurenai Yuhi': 'A',
        'Guy': 'S',
        'Yamato': 'A',
        'Anko Mitarashi': 'B',
        'Ibiki Morino': 'A',
        'Genma Shiranui': 'B',
        'Raido Namiashi': 'B',
        'Aoba Yamashiro': 'B',
        'Shizune': 'A',
        'Inoichi Yamanaka': 'A',
        'Choza Akimichi': 'B',
        'Shikaku Nara': 'A',
        'Hiashi Hyuga': 'A',
        'Hizashi Hyuga': 'A'
    };
    
    if (rankings[name]) {
        return rankings[name];
    }
    
    for (const key in rankings) {
        if (name.includes(key.split(' ')[0]) || key.includes(name.split(' ')[0])) {
            return rankings[key];
        }
    }
    
    return 'B';
}

function getVila(name) {
    const vilas = {
        'Naruto Uzumaki': 'Konoha',
        'Sasuke Uchiha': 'Konoha',
        'Kakashi Hatake': 'Konoha',
        'Itachi Uchiha': 'Konoha',
        'Jiraiya': 'Konoha',
        'Tsunade': 'Konoha',
        'Orochimaru': 'Konoha',
        'Minato Namikaze': 'Konoha',
        'Hashirama Senju': 'Konoha',
        'Madara Uchiha': 'Konoha',
        'Obito Uchiha': 'Konoha',
        'Nagato': 'Ame',
        'Killer B': 'Kumo',
        'Gaara': 'Suna',
        'Rock Lee': 'Konoha',
        'Neji Hyuga': 'Konoha',
        'Shikamaru Nara': 'Konoha',
        'Choji Akimichi': 'Konoha',
        'Ino Yamanaka': 'Konoha',
        'Sakura Haruno': 'Konoha',
        'Hinata Hyuga': 'Konoha',
        'Kiba Inuzuka': 'Konoha',
        'Shino Aburame': 'Konoha',
        'Tenten': 'Konoha',
        'Kankuro': 'Suna',
        'Temari': 'Suna',
        'Deidara': 'Iwa',
        'Sasori': 'Suna',
        'Hidan': 'Yugakure',
        'Kakuzu': 'Taki',
        'Kisame Hoshigaki': 'Kiri',
        'Zetsu': 'Akatsuki',
        'Konan': 'Ame',
        'Yahiko': 'Ame',
        'Danzo Shimura': 'Konoha',
        'Shisui Uchiha': 'Konoha',
        'Fugaku Uchiha': 'Konoha',
        'Mikoto Uchiha': 'Konoha',
        'Kushina Uzumaki': 'Uzushiogakure',
        'Mito Uzumaki': 'Uzushiogakure',
        'Tobirama Senju': 'Konoha',
        'Hiruzen Sarutobi': 'Konoha',
        'Asuma Sarutobi': 'Konoha',
        'Kurenai Yuhi': 'Konoha',
        'Guy': 'Konoha',
        'Yamato': 'Konoha',
        'Anko Mitarashi': 'Konoha',
        'Ibiki Morino': 'Konoha',
        'Genma Shiranui': 'Konoha',
        'Raido Namiashi': 'Konoha',
        'Aoba Yamashiro': 'Konoha',
        'Shizune': 'Konoha',
        'Inoichi Yamanaka': 'Konoha',
        'Choza Akimichi': 'Konoha',
        'Shikaku Nara': 'Konoha',
        'Hiashi Hyuga': 'Konoha',
        'Hizashi Hyuga': 'Konoha'
    };
    
    if (vilas[name]) {
        return vilas[name];
    }
    
    for (const key in vilas) {
        if (name.includes(key.split(' ')[0]) || key.includes(name.split(' ')[0])) {
            return vilas[key];
        }
    }
    
    return 'Desconhecida';
}

function getCla(name) {
    const clas = {
        'Naruto Uzumaki': 'Uzumaki',
        'Sasuke Uchiha': 'Uchiha',
        'Kakashi Hatake': 'Hatake',
        'Itachi Uchiha': 'Uchiha',
        'Jiraiya': 'Jiraiya',
        'Tsunade': 'Senju',
        'Orochimaru': 'Orochimaru',
        'Minato Namikaze': 'Namikaze',
        'Hashirama Senju': 'Senju',
        'Madara Uchiha': 'Uchiha',
        'Obito Uchiha': 'Uchiha',
        'Nagato': 'Uzumaki',
        'Killer B': 'Sabaku',
        'Gaara': 'Sabaku',
        'Rock Lee': 'Lee',
        'Neji Hyuga': 'Hyuga',
        'Shikamaru Nara': 'Nara',
        'Choji Akimichi': 'Akimichi',
        'Ino Yamanaka': 'Yamanaka',
        'Sakura Haruno': 'Haruno',
        'Hinata Hyuga': 'Hyuga',
        'Kiba Inuzuka': 'Inuzuka',
        'Shino Aburame': 'Aburame',
        'Tenten': 'Tenten',
        'Kankuro': 'Sabaku',
        'Temari': 'Sabaku',
        'Deidara': 'Deidara',
        'Sasori': 'Sasori',
        'Hidan': 'Hidan',
        'Kakuzu': 'Kakuzu',
        'Kisame Hoshigaki': 'Hoshigaki',
        'Zetsu': 'Zetsu',
        'Konan': 'Konan',
        'Yahiko': 'Yahiko',
        'Danzo Shimura': 'Shimura',
        'Shisui Uchiha': 'Uchiha',
        'Fugaku Uchiha': 'Uchiha',
        'Mikoto Uchiha': 'Uchiha',
        'Kushina Uzumaki': 'Uzumaki',
        'Mito Uzumaki': 'Uzumaki',
        'Tobirama Senju': 'Senju',
        'Hiruzen Sarutobi': 'Sarutobi',
        'Asuma Sarutobi': 'Sarutobi',
        'Kurenai Yuhi': 'Yuhi',
        'Guy': 'Guy',
        'Yamato': 'Yamato',
        'Anko Mitarashi': 'Mitarashi',
        'Ibiki Morino': 'Morino',
        'Genma Shiranui': 'Shiranui',
        'Raido Namiashi': 'Namiashi',
        'Aoba Yamashiro': 'Yamashiro',
        'Shizune': 'Shizune',
        'Inoichi Yamanaka': 'Yamanaka',
        'Choza Akimichi': 'Akimichi',
        'Shikaku Nara': 'Nara',
        'Hiashi Hyuga': 'Hyuga',
        'Hizashi Hyuga': 'Hyuga'
    };
    
    if (clas[name]) {
        return clas[name];
    }
    
    for (const key in clas) {
        if (name.includes(key.split(' ')[0]) || key.includes(name.split(' ')[0])) {
            return clas[key];
        }
    }
    
    return 'Desconhecido';
}

function getNinjaRank(name) {
    const ranks = {
        'Naruto Uzumaki': 'Hokage',
        'Sasuke Uchiha': 'Nukenin',
        'Kakashi Hatake': 'Hokage',
        'Itachi Uchiha': 'ANBU',
        'Jiraiya': 'Sannin',
        'Tsunade': 'Hokage',
        'Orochimaru': 'Sannin',
        'Minato Namikaze': 'Hokage',
        'Hashirama Senju': 'Hokage',
        'Madara Uchiha': 'Nukenin',
        'Obito Uchiha': 'Nukenin',
        'Nagato': 'Líder Akatsuki',
        'Killer B': 'Jinchuriki',
        'Gaara': 'Kazekage',
        'Rock Lee': 'Jonin',
        'Neji Hyuga': 'Jonin',
        'Shikamaru Nara': 'Jonin',
        'Choji Akimichi': 'Jonin',
        'Ino Yamanaka': 'Jonin',
        'Sakura Haruno': 'Jonin',
        'Hinata Hyuga': 'Chunin',
        'Kiba Inuzuka': 'Jonin',
        'Shino Aburame': 'Jonin',
        'Tenten': 'Chunin',
        'Kankuro': 'Jonin',
        'Temari': 'Jonin',
        'Deidara': 'S-Rank',
        'Sasori': 'S-Rank',
        'Hidan': 'S-Rank',
        'Kakuzu': 'S-Rank',
        'Kisame Hoshigaki': 'S-Rank',
        'Zetsu': 'S-Rank',
        'Konan': 'S-Rank',
        'Yahiko': 'Líder',
        'Danzo Shimura': 'ANBU',
        'Shisui Uchiha': 'ANBU',
        'Fugaku Uchiha': 'Jonin',
        'Mikoto Uchiha': 'Chunin',
        'Kushina Uzumaki': 'Jonin',
        'Mito Uzumaki': 'Jinchuriki',
        'Tobirama Senju': 'Hokage',
        'Hiruzen Sarutobi': 'Hokage',
        'Asuma Sarutobi': 'Jonin',
        'Kurenai Yuhi': 'Jonin',
        'Guy': 'Jonin',
        'Yamato': 'ANBU',
        'Anko Mitarashi': 'Jonin',
        'Ibiki Morino': 'ANBU',
        'Genma Shiranui': 'Jonin',
        'Raido Namiashi': 'Jonin',
        'Aoba Yamashiro': 'Jonin',
        'Shizune': 'Jonin',
        'Inoichi Yamanaka': 'ANBU',
        'Choza Akimichi': 'Jonin',
        'Shikaku Nara': 'Jonin',
        'Hiashi Hyuga': 'Jonin',
        'Hizashi Hyuga': 'Jonin'
    };
    
    if (ranks[name]) {
        return ranks[name];
    }
    
    for (const key in ranks) {
        if (name.includes(key.split(' ')[0]) || key.includes(name.split(' ')[0])) {
            return ranks[key];
        }
    }
    
    return 'Genin';
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach((card, index) => {
        const nameElement = card.querySelector('.character-name');
        const name = nameElement.textContent.trim();
        
        // Adicionar ranking
        const rankingBadge = card.querySelector('.ranking-badge');
        if (rankingBadge) {
            const rankText = rankingBadge.querySelector('.rank-text');
            const ranking = getRanking(name);
            rankText.textContent = ranking;
        }
        
        // Adicionar informações extras
        const details = card.querySelectorAll('.detail-item');
        details.forEach(detail => {
            const icon = detail.querySelector('.detail-icon');
            const text = detail.querySelector('.detail-text');
            
            if (icon.textContent === '🏘️') {
                const vila = getVila(name);
                text.textContent = vila;
            } else if (icon.textContent === '👨‍👩‍👧‍👦') {
                const cla = getCla(name);
                text.textContent = cla;
            } else if (icon.textContent === '🏆') {
                const ninjaRank = getNinjaRank(name);
                text.textContent = ninjaRank;
            }
        });
    });
});
