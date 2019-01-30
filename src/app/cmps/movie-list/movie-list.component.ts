import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Movie } from '../../store/models/movie.model';
import {  LOAD_MOVIE } from '../../store/actions/movie.actions'
import { AppState } from '../../store/state/app.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';


@Component({
  selector: 'app-movie-list',
  template: `
          <button class="add-movie" (click)="open()">Add a Movie!</button>
          <section class="movie-list">
            <app-movie-preview 
            *ngFor="let movie of movies$ | async"
            [movie]="movie"
            ></app-movie-preview>
          </section>
  `,
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieService
  movies$: Observable<Movie[]>

  constructor(@Inject('movie') movie, private store: Store<AppState>, private modalService: NgbModal) {
    this.movieService = movie
    this.movies$ = store.select('movies');
  }

  open() {
    const modalRef = this.modalService.open(EditorModalComponent);
    modalRef.componentInstance.id = null;
  }

 
  async ngOnInit() {
    let loadMovies: Movie[]
    loadMovies = await this.movieService.createMovies()
    this.store.dispatch({ type: LOAD_MOVIE, payload: loadMovies })
  }
}
