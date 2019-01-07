import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class CrudMethods {
    protected http: HttpClient;
    protected entity: string;

    public constructor() { }

    /**
    * Gets data from an ApiRoute
    * @param id (OPTIONAL) {number | boolean} Get with specified Id
    * @param queryParams (OPTIONAL) {any} Get with query params
    */
    public get(id: number | boolean = false, queryParams: any = false): Observable<any> {
        return this.http.get(`${environment.API_URL}/api/${this.entity}${id ? `/${id}` : ''}`, { params: queryParams } || {});
    }

    /**
    * Posts data to an ApiRoute
    * @param data {any}
    */
    public post(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/api/${this.entity}`, data);
    }

    /**
    * Deletes entities data with a specified Id
    * @param id {number}
    */
    public delete(id: number): Observable<any> {
        return this.http.delete(`${environment.API_URL}/api/${this.entity}/${id}/delete`);
    }

    /**
    * Changes entity data with a specified Id
    * @param data { id: number, [attributes: string]: any }
    */
    public update(data: { id: number, [attributes: string]: any }): Observable<any> {
        return this.http.put(`${environment.API_URL}/api/${this.entity}/${data.id}/edit`, data);
    }

}
