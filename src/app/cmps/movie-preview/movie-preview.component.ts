import { Component, OnInit, Input } from '@angular/core';
import { EditorModalComponent } from '../editor-modal/editor-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-preview',
  template: `
      <div class="card-preview">
          <div class="card bg-dark text-white">
            <img class="card-img" [src]="movie.img" alt="Card image">
              <div class="card-img-overlay">
                <button type="button" class="close card__delete card-text"  (click)="open(true)"
                aria-label="Close" data-toggle="tooltip" data-placement="top" title="Click to delete movie">
                <img src="assets/imgs/delete.png">
                </button>
                <button type="button" class="close card__edit card-text" (click)="open()"
                aria-label="edit" data-toggle="tooltip" data-placement="top" title="Click to edit movie">
                <img src="assets/imgs/pencil.png">
                </button>
                <h5 class="card-title">{{movie.title | title | titlecase }}</h5>
                <p class="card-text card-time">{{movie.year}}</p>
                <p class="card-text card-genre">{{movie.genre}}</p>
                <p class="card-text">{{movie.runtime}}</p>
                <p class="card-text">{{movie.director}}</p>
              </div>
          </div>
      </div>`,
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent {

  @Input() movie = null

  constructor(private modalService: NgbModal) { }

  open(isRemoved = false) {
    const modalRef = this.modalService.open(EditorModalComponent);
    modalRef.componentInstance.id = this.movie._id;
    modalRef.componentInstance.isRemoved = isRemoved;
  }
}
