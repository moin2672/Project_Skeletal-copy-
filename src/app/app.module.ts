import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthInterceptor} from './auth/auth-interceptor'
import { ErrorInterceptor } from './error-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
              {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
