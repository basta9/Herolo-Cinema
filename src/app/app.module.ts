import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MoviesService } from './services/movie-service/movies.service';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { movieReducer } from './store/reducers/movies.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './cmps/movie-list/movie-list.component';
import { MoviePreviewComponent } from './cmps/movie-preview/movie-preview.component';
import { EditorModalComponent } from './cmps/editor-modal/editor-modal.component';
import { Title } from './pipes/title.pipe';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MoviePreviewComponent,
    EditorModalComponent,
    Title,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot({
      movies: movieReducer,
    })
  ],
  
  entryComponents: [EditorModalComponent],
  providers: [{ provide: 'movie', useClass: MoviesService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
