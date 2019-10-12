import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ThiefService } from "../thief.service";
import { Thief } from "../thief.model";
import { EditComponent } from "../edit/edit.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  thiefs: Thief[];
  displayedColumns: string[] = [
    "no",
    "name",
    "gender",
    "height",
    "op_area",
    "age",
    "options"
  ];
  constructor(private thiefService: ThiefService, private dialog: MatDialog) {}

  ngOnInit() {
    this.onFetch();
  }

  onFetch() {
    this.thiefService.getThief().subscribe(res => {
      this.thiefs = res as Thief[];
    });
  }

  onEdit(row: Thief) {
    //console.log(row);
    this.thiefService.singleRow = row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "80%";
    this.dialog.open(EditComponent, dialogConfig);
  }

  onDelete(row) {
    if (confirm("Are you sure?")) {
      this.thiefService.deleteOneRow(row._id).subscribe(res => {
        this.onFetch();
      });
    }
  }
}
