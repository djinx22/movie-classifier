// Classe Movie pour gérer les données
class Movie {
    constructor(title, genre, category, year = null, rating = null, description = '', image = '') {
        this.id = Date.now();
        this.title = title;
        this.genre = genre;
        this.category = category;
        this.year = year;
        this.rating = rating;
        this.description = description;
        this.image = image;
        this.favorite = false;
        this.createdAt = new Date();
    }
}

// Application principale
class MovieClassifier {
    constructor() {
        this.movies = [];
        this.filteredMovies = [];
        this.currentFilter = 'all';
        this.currentGenreFilter = null;
        this.genres = new Set();
        this.categories = new Set();
        this.searchQuery = '';
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.renderMovies();
        this.updateGenreFilters();
        this.updateStats();
        
        // Charger quelques films d'exemple
        if (this.movies.length === 0) {
            this.loadSampleMovies();
        }
    }

    setupEventListeners() {
        // Modal Add Movie
        const addMovieBtn = document.getElementById('addMovieBtn');
        const movieModal = document.getElementById('movieModal');
        const closeModal = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const movieForm = document.getElementById('movieForm');

        addMovieBtn.addEventListener('click', () => this.openAddModal());
        closeModal.addEventListener('click', () => this.closeModal());
        cancelBtn.addEventListener('click', () => this.closeModal());
        movieForm.addEventListener('submit', (e) => this.handleAddMovie(e));

        // Details Modal
        const closeDetails = document.getElementById('closeDetails');
        closeDetails.addEventListener('click', () => this.closeDetailsModal());

        // Fermer les modals en cliquant en dehors
        document.getElementById('movieModal').addEventListener('click', (e) => {
            if (e.target.id === 'movieModal') this.closeModal();
        });
        document.getElementById('detailsModal').addEventListener('click', (e) => {
            if (e.target.id === 'detailsModal') this.closeDetailsModal();
        });

        // Search
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => this.handleSearch(e));

        // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });
    }

    loadSampleMovies() {
        const samples = [
            new Movie('Inception', 'Science-fiction', 'Cinéma', 2010, 8.8, 'Un voleur qui vole les secrets corporatifs grâce à la technologie des rêves partagés.', 'https://via.placeholder.com/200x300?text=Inception'),
            new Movie('The Dark Knight', 'Action', 'Cinéma', 2008, 9.0, 'Batman doit affronter son plus grand adversaire: le Joker.', 'https://via.placeholder.com/200x300?text=Dark+Knight'),
            new Movie('Interstellar', 'Science-fiction', 'Cinéma', 2014, 8.6, 'Des astronautes voyagent à travers un trou de ver pour sauver l\'humanité.', 'https://via.placeholder.com/200x300?text=Interstellar'),
            new Movie('La La Land', 'Romance', 'Cinéma', 2016, 8.0, 'Un pianiste et une actrice tombent amoureux à Los Angeles.', 'https://via.placeholder.com/200x300?text=La+La+Land'),
            new Movie('Pulp Fiction', 'Thriller', 'Cinéma', 1994, 8.9, 'Plusieurs histoires entrecroisées de criminels à Los Angeles.', 'https://via.placeholder.com/200x300?text=Pulp+Fiction'),
            new Movie('Toy Story', 'Animation', 'Cinéma', 1995, 8.3, 'Les jouets prennent vie quand les humains ne sont pas là.', 'https://via.placeholder.com/200x300?text=Toy+Story'),
        ];

        samples.forEach(movie => this.movies.push(movie));
        this.saveToStorage();
        this.renderMovies();
        this.updateGenreFilters();
    }

    handleNavigation(e) {
        const filter = e.currentTarget.dataset.filter;
        
        // Update active button
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        e.currentTarget.classList.add('active');

        this.currentFilter = filter;
        this.currentGenreFilter = null;
        this.renderMovies();
        this.updateGenreFilters();
    }

    openAddModal() {
        document.getElementById('movieModal').classList.add('active');
        document.getElementById('movieForm').reset();
    }

    closeModal() {
        document.getElementById('movieModal').classList.remove('active');
    }

    closeDetailsModal() {
        document.getElementById('detailsModal').classList.remove('active');
    }

    handleAddMovie(e) {
        e.preventDefault();

        const title = document.getElementById('movieTitle').value;
        const genre = document.getElementById('movieGenre').value;
        const category = document.getElementById('movieCategory').value;
        const year = document.getElementById('movieYear').value || null;
        const rating = document.getElementById('movieRating').value || null;
        const description = document.getElementById('movieDescription').value;
        const image = document.getElementById('movieImage').value;

        if (!title || !genre || !category) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }

        const movie = new Movie(title, genre, category, year, rating, description, image);
        this.movies.push(movie);
        
        this.genres.add(genre);
        this.categories.add(category);

        this.saveToStorage();
        this.closeModal();
        this.renderMovies();
        this.updateGenreFilters();
        this.updateStats();
    }

    handleSearch(e) {
        this.searchQuery = e.target.value.toLowerCase();
        this.renderMovies();
    }

    handleGenreFilter(genre) {
        this.currentGenreFilter = this.currentGenreFilter === genre ? null : genre;
        
        // Update active filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (this.currentGenreFilter) {
            document.querySelector(`[data-genre="${this.currentGenreFilter}"]`).classList.add('active');
        }

        this.renderMovies();
    }

    deleteMovie(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce film ?')) {
            this.movies = this.movies.filter(m => m.id !== id);
            this.saveToStorage();
            this.closeDetailsModal();
            this.renderMovies();
            this.updateStats();
        }
    }

    toggleFavorite(id) {
        const movie = this.movies.find(m => m.id === id);
        if (movie) {
            movie.favorite = !movie.favorite;
            this.saveToStorage();
            this.renderMovies();
        }
    }

    filterMovies() {
        let filtered = [...this.movies];

        // Filter by main navigation
        switch (this.currentFilter) {
            case 'genre':
                if (this.currentGenreFilter) {
                    filtered = filtered.filter(m => m.genre === this.currentGenreFilter);
                }
                break;
            case 'category':
                if (this.currentGenreFilter) {
                    filtered = filtered.filter(m => m.category === this.currentGenreFilter);
                }
                break;
            case 'favorites':
                filtered = filtered.filter(m => m.favorite);
                break;
        }

        // Filter by search
        if (this.searchQuery) {
            filtered = filtered.filter(m =>
                m.title.toLowerCase().includes(this.searchQuery) ||
                m.genre.toLowerCase().includes(this.searchQuery) ||
                m.category.toLowerCase().includes(this.searchQuery)
            );
        }

        return filtered;
    }

    renderMovies() {
        const moviesGrid = document.getElementById('moviesGrid');
        this.filteredMovies = this.filterMovies();

        if (this.filteredMovies.length === 0) {
            moviesGrid.innerHTML = `
                <div class="empty-state">
                    <p>📭 Aucun film trouvé</p>
                    <p class="empty-subtitle">Essayez une autre recherche ou ajoutez un nouveau film</p>
                </div>
            `;
            return;
        }

        moviesGrid.innerHTML = this.filteredMovies.map(movie => this.createMovieCard(movie)).join('');

        // Add event listeners to cards
        document.querySelectorAll('.movie-card').forEach(card => {
            const movieId = parseInt(card.dataset.id);
            
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-icon')) {
                    this.showMovieDetails(movieId);
                }
            });

            const favoriteBtn = card.querySelector('.btn-icon.favorite');
            favoriteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(movieId);
            });

            const deleteBtn = card.querySelector('.btn-icon.delete');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteMovie(movieId);
                });
            }
        });
    }

    createMovieCard(movie) {
        const ratingHtml = movie.rating ? `<div class="movie-rating">⭐ ${movie.rating}/10</div>` : '';
        const imageHtml = movie.image 
            ? `<img src="${movie.image}" alt="${movie.title}" onerror="this.style.display='none'">`
            : '';
        
        return `
            <div class="movie-card" data-id="${movie.id}">
                <div class="movie-poster ${!movie.image ? 'no-image' : ''}">
                    ${imageHtml}
                    <div class="movie-badge">${movie.category}</div>
                    ${ratingHtml}
                </div>
                <div class="movie-info">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-meta">
                        <span class="movie-genre">${movie.genre}</span>
                        ${movie.year ? `<span>${movie.year}</span>` : ''}
                    </div>
                    <div class="movie-actions">
                        <button class="btn-icon favorite ${movie.favorite ? 'active' : ''}">
                            ${movie.favorite ? '❤️' : '🤍'}
                        </button>
                        <button class="btn-icon delete">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    }

    showMovieDetails(id) {
        const movie = this.movies.find(m => m.id === id);
        if (!movie) return;

        const detailsModal = document.getElementById('detailsModal');
        const detailTitle = document.getElementById('detailTitle');
        const movieDetails = document.getElementById('movieDetails');

        detailTitle.textContent = movie.title;

        const posterHtml = movie.image 
            ? `<img src="${movie.image}" alt="${movie.title}" onerror="this.style.display='none'">`
            : '<div style="width: 200px; height: 300px; background: linear-gradient(135deg, #334155, #0f172a); display: flex; align-items: center; justify-content: center; border-radius: 8px;">🎬</div>';

        const descriptionHtml = movie.description 
            ? `<div class="details-description">${movie.description}</div>`
            : '';

        movieDetails.innerHTML = `
            <div class="details-header">
                <div class="details-poster">
                    ${posterHtml}
                </div>
                <div class="details-info">
                    <div class="details-title">${movie.title}</div>
                    <div class="details-meta">
                        <div class="meta-item">
                            <div class="meta-label">Genre</div>
                            <div class="meta-value">${movie.genre}</div>
                        </div>
                        <div class="meta-item">
                            <div class="meta-label">Catégorie</div>
                            <div class="meta-value">${movie.category}</div>
                        </div>
                        ${movie.year ? `
                            <div class="meta-item">
                                <div class="meta-label">Année</div>
                                <div class="meta-value">${movie.year}</div>
                            </div>
                        ` : ''}
                        ${movie.rating ? `
                            <div class="meta-item">
                                <div class="meta-label">Note</div>
                                <div class="meta-value">⭐ ${movie.rating}/10</div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            ${descriptionHtml}
            <div class="details-actions">
                <button class="btn-submit" onclick="app.toggleFavorite(${movie.id}); app.showMovieDetails(${movie.id});">
                    ${movie.favorite ? '❌ Retirer des favoris' : '❤️ Ajouter aux favoris'}
                </button>
                <button class="btn-delete" onclick="app.deleteMovie(${movie.id});">
                    🗑️ Supprimer
                </button>
            </div>
        `;

        detailsModal.classList.add('active');
    }

    updateGenreFilters() {
        const genreFilters = document.getElementById('genreFilters');
        
        this.genres.clear();
        this.categories.clear();

        this.movies.forEach(movie => {
            this.genres.add(movie.genre);
            this.categories.add(movie.category);
        });

        if (this.currentFilter === 'genre') {
            genreFilters.innerHTML = Array.from(this.genres)
                .sort()
                .map(genre => `
                    <button class="filter-btn" data-genre="${genre}" onclick="app.handleGenreFilter('${genre}')">
                        ${genre}
                    </button>
                `)
                .join('');
        } else if (this.currentFilter === 'category') {
            genreFilters.innerHTML = Array.from(this.categories)
                .sort()
                .map(category => `
                    <button class="filter-btn" data-category="${category}" onclick="app.handleCategoryFilter('${category}')">
                        ${category}
                    </button>
                `)
                .join('');
        } else {
            genreFilters.innerHTML = '';
        }
    }

    handleCategoryFilter(category) {
        this.currentGenreFilter = this.currentGenreFilter === category ? null : category;
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (this.currentGenreFilter) {
            document.querySelector(`[data-category="${this.currentGenreFilter}"]`).classList.add('active');
        }

        this.renderMovies();
    }

    updateStats() {
        document.getElementById('totalMovies').textContent = this.movies.length;
    }

    saveToStorage() {
        const data = this.movies.map(movie => ({
            ...movie,
            createdAt: movie.createdAt.toISOString()
        }));
        localStorage.setItem('movies', JSON.stringify(data));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('movies');
        if (stored) {
            try {
                const data = JSON.parse(stored);
                this.movies = data.map(item => {
                    const movie = new Movie(
                        item.title,
                        item.genre,
                        item.category,
                        item.year,
                        item.rating,
                        item.description,
                        item.image
                    );
                    movie.id = item.id;
                    movie.favorite = item.favorite || false;
                    movie.createdAt = new Date(item.createdAt);
                    return movie;
                });

                // Rebuild genres and categories
                this.movies.forEach(movie => {
                    this.genres.add(movie.genre);
                    this.categories.add(movie.category);
                });
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        }
    }
}

// Initialiser l'application au chargement
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MovieClassifier();
});
