import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }


  getMovieInfo(movie): Observable<any> {
    return this.http.get(`http://www.omdbapi.com/?t=${movie}&apikey=ba5fc262`)
  }

  createMovies() {
    var movieNames = ['ace ventura', 'guardians of', 'thor', 'hulk', 'star wars', 'The Dark Knight', 'The Shawshank Redemption', 'truman show']
    var movies = []
    movieNames.map(movie => {
      return this.getMovieInfo(movie)
        .subscribe({
          next: data => movies.push({
            _id: this.makeId(),
            title: data.Title,
            year: data.Released,
            runTime: data.Runtime,
            genre: data.Genre,
            director: data.Director,
            img: data.Poster
          }),
          error: err => console.error('something wrong occurred: ' + err),
          complete: () => localStorage.movies = JSON.stringify(movies)
        })
    })
    return movies
  }

  getMovieById(id) {
    let movies = JSON.parse(localStorage.movies)
    return movies.find(movie => movie._id === id)
  }

  updateMovie(movie) {
    let movies = JSON.parse(localStorage.movies)
    movies = movies.map(currMovie => {
      if (movie._id === currMovie._id) return movie
      return currMovie
    })
    localStorage.setItem('movies', JSON.stringify(movies))
  }

  addMovie(movie) {
    console.log(movie.title, 'was added to DB');
    let movies = JSON.parse(localStorage.movies)
    movies.push(movie)
    localStorage.movies = JSON.stringify(movies)
  }

  removeMovie(id) {
    console.log('removing ' + id + ' from DB');
    let movies = JSON.parse(localStorage.movies)
    let idx = movies.findIndex(movie => movie._id === id)
    movies.splice(idx, 1)
    localStorage.movies = JSON.stringify(movies)
  }

  makeId() {
    var length = 8;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
  }
}
