import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ChCharacter } from 'src/app/models/character-module/ch-character';
import { UploadResponse } from 'src/app/models/response/uploadResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChCharacterService {

  private URL_Character = environment.url+'api/v1/dbzapp';
  private URL_Character_Upload = environment.url+'api/v1/dbzapp/character/image';
  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<ChCharacter[]> {
    return this.http.get<ChCharacter[]>(`${this.URL_Character}/list-character`);
  }

  getCharacterById(id: number): Observable<ChCharacter> {
    return this.http.get<ChCharacter>(`${this.URL_Character}/character/${id}`);
  }

  createCharacter(ChCharacter: ChCharacter): Observable<any> {
    return this.http.post(`${this.URL_Character}/create-character`, ChCharacter);
  }

  updateCharacter(id: number, ChCharacter: ChCharacter): Observable<any> {
    return this.http.put(`${this.URL_Character}/character-edit/${id}`, ChCharacter);
  }

  deleteCharacter(id: number): Observable<any> {
    return this.http.delete(`${this.URL_Character}/character-delete/${id}`);
  }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResponse>(this.URL_Character_Upload, formData).pipe(
      map((response) => {
        if (response.status) {
          return response.link;
        } else {
          throw new Error('Error al subir la imagen');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la subida de la imagen:', error);
        return throwError(() => new Error('No se pudo subir la imagen.'));
      })
    );
  }
}
