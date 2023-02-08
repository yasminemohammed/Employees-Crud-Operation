import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean = false;
  constructor() { }
  //set
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  //get
  getLoading(): boolean {
    return this.loading;
  }
}
