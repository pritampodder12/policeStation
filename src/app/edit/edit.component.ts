import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { ThiefService } from "../thief.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  constructor(
    private dialog: MatDialogRef<EditComponent>,
    private thiefService: ThiefService
  ) {}

  ngOnInit() {}

  onClose() {
    this.dialog.close();
  }

  onUpdate(form: NgForm) {
    //console.log(this.thiefService.singleRow._id);
    this.thiefService.updateData(form.value).subscribe(res => {
      //console.log(res);
    });
    this.dialog.close();
  }
}
