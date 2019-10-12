import { Injectable } from "@angular/core";
import { Thief } from "./thief.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ThiefService {
  singleRow: Thief;
  constructor(private http: HttpClient) {}

  createThief(thief: Thief) {
    return this.http.post<Thief>(
      "http://localhost:3000/api/thiefs/create",
      thief
    );
  }

  getThief() {
    return this.http.get("http://localhost:3000/api/thiefs");
  }

  deleteOneRow(id) {
    return this.http.delete("http://localhost:3000/api/thiefs" + "/" + id);
  }

  updateData(thief) {
    return this.http.put(
      "http://localhost:3000/api/thiefs" + "/" + this.singleRow._id,
      thief
    );
  }
}
