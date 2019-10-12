import { Component, OnInit } from "@angular/core";
import { ThiefService } from "../thief.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  constructor(private thiefService: ThiefService, private router: Router) {}

  ngOnInit() {}
  onSave(form: NgForm) {
    //console.log(form.value);
    this.thiefService.createThief(form.value).subscribe(res => {
      this.router.navigate(["/list"]);
    });
  }
}
