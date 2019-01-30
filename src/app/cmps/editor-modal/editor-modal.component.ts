import { Component, Input, Inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.state';
import { Observable } from 'rxjs';
import { Movie } from '../../store/models/movie.model';
import { ADD_MOVIE, UPDATE_MOVIE, REMOVE_MOVIE } from '../../store/actions/movie.actions'

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" *ngIf="!id">Add a Movie</h4>
      <h4 *ngIf="!!id">{{(isRemoved)? 'Are you sure you want to delete ' + editMovie.title + '?' : 'Edit Movie'}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="modal-body" *ngIf="!isRemoved">
      <img [src]="editMovie.img" *ngIf="!!id && !isRemoved">
      <form  #frm="ngForm" (submit)="$event.preventDefault(); saveMovie()">
        <!-- EDIT -->
        <div *ngIf="!!id && !isRemoved">
          <label>
            Title: <input 
            name="title" 
            #title="ngModel" 
            type="string"
            [ngModel]="editMovie.title | title | titlecase" 
            (ngModelChange)="editMovie.title=$event"
            required>
            </label>      
          <div *ngIf="title.touched">
            <div *ngIf="title.errors?.required" class="alert-danger">
              Title is required
            </div>
          </div>
          <label>
          Year: <input 
          name="year" 
          #year="ngModel" 
          type="string"
          pattern='(([0-9])|([0-2][0-9])|([3][0-1])) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (?:19|20)[0-9]{2}'
          [(ngModel)]="editMovie.year" 
          required>
        </label>     
          <div *ngIf="year.touched">
            <div *ngIf="year.errors?.required" class="alert-danger">
              Year is required
            </div>
            <div *ngIf="year.errors?.pattern" class="alert-danger">
              Please enter a date in the following pattern: DD MMM YYYY (example: 06 Jan 1990)
            </div>
          </div>
          <label>
            Run time: <input 
            name="runTime" 
            #runTime="ngModel" 
            type="string"
            [(ngModel)]="editMovie.runTime" 
            required>
          </label> 
          <div *ngIf="runTime.touched">
            <div *ngIf="runTime.errors?.required" class="alert-danger">
            Run time is required
            </div>
          </div>
          <label>
            Genre: <input 
            name="genre" 
            #genre="ngModel" 
            type="string"
            [(ngModel)]="editMovie.genre" 
            required>
          </label>      
          <div *ngIf="genre.touched">
            <div *ngIf="genre.errors?.required" class="alert-danger">
            Genre is required
            </div>
          </div>
          <label>
            Director: <input 
            name="director" 
            #director="ngModel" 
            type="string"
            [(ngModel)]="editMovie.director" 
            required>
          </label>      
          <div *ngIf="director.touched">
            <div *ngIf="director.errors?.required" class="alert-danger">
            Director is required
            </div>
          </div>
        </div>
        <!-- ADD -->
        <div *ngIf="!id">
          <label class="add-movie" >
            <input 
            name="movieTitle" 
            #movieTitle="ngModel" 
            [(ngModel)]="movieName"
            type="string"
            placeholder="Movie Title"
            (input)="doesExcist(movieName)"
            required/>  
            <button type="submit" class="btn btn-outline-dark" [disabled]="frm.invalid || !isValid">Add</button>
          </label>
          <div *ngIf="movieTitle.touched">
            <div *ngIf="!isValid" class="alert-danger">
              Movie Already Exsicts!
            </div>
            <div *ngIf="isFound" class="alert-danger">
              Cant find movie
            </div>
          </div>
        </div>
        <div class="modal-footer" *ngIf="!!id">
          <button *ngIf="!!id && !isRemoved" type="submit" class="btn btn-outline-dark" [disabled]="frm.invalid">Save</button>
          <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
        </div>
      </form>
    </div>
    <div class="modal-footer" *ngIf="isRemoved">
      <button *ngIf="isRemoved" type="button" class="btn btn-outline-dark" (click)="removeMovie()">Delete</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>

`,
  styleUrls: ['./editor-modal.component.scss']
})
export class EditorModalComponent {
  @Input() id;
  @Input() isRemoved;
  movieName: string = ''
  movieService
  movies$: Observable<Movie[]>
  editMovie = null
  isValid: boolean
  isFound: boolean

  constructor(public activeModal: NgbActiveModal, @Inject('movie') movie, private store: Store<AppState>) {
    this.movieService = movie
    this.movies$ = store.select('movies');
  }

  ngOnInit() {
    this.editMovie = this.movieService.getMovieById(this.id)
  }

  doesExcist(title) {
    if (title === '') return
    return this.movieService.getMovieInfo(title)
      .subscribe({
        next: data => {
          if (!data.Title) {
            this.isValid = true
            this.isFound = true
            return
          }
          this.isFound = false
          let movies = JSON.parse(localStorage.movies)
          this.isValid = (undefined === movies.find(movie => movie.title.toLowerCase() === data.Title.toLowerCase()))
        },
      })
  }


  saveMovie() {
    this.activeModal.close('Close click')
    //ADD
    if (!this.id) {
      this.movieService.getMovieInfo(this.movieName)
        .subscribe({
          next: data => {
            this.isFound = false
            this.isValid = false
            if (!data.Title) {
              return
            }
            const movie = {
              _id: this.movieService.makeId(),
              title: data.Title,
              year: data.Released,
              runTime: data.Runtime,
              genre: data.Genre,
              director: data.Director,
              img: data.Poster
            }
            this.movieService.addMovie(movie)
            this.store.dispatch({ type: ADD_MOVIE, payload: movie })
          },
          error: err => console.error('something wrong occurred: ' + err),
        })
    } else {
      //UPDATE
      this.movieService.updateMovie(this.editMovie)
      this.store.dispatch({ type: UPDATE_MOVIE, payload: this.editMovie })
    }
  }

  removeMovie() {
    this.activeModal.close('Close click')
    this.movieService.removeMovie(this.editMovie._id)
    this.store.dispatch({ type: REMOVE_MOVIE, payload: this.editMovie._id })
  }

}
