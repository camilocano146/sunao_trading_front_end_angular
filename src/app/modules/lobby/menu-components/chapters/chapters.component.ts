import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppComponent } from '../../../../app.component';
import { MatDialog } from '@angular/material/dialog';
import { ChapterService } from 'src/app/services/chapter/chapter.service';
import { DialogChapterCreateEditComponent } from './dialog-chapter-create-edit/dialog-chapter-create-edit.component';
import { Chapter } from 'src/app/models/Chapter';

export interface DataDialogChapter {
  dataEdit: Chapter;
}

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnInit {

  preload:boolean=false;
  list:Chapter[];
  pageSizeOptions = AppComponent.pageSizeOptions;
  resultsLength:number=0;
  @ViewChild(MatPaginator) paginator: MatPaginator;  

  public displayedColumns: string[] = [
    'id',
    "name",
    "code",
    "actions"
  ];

  constructor(
    private chapterService: ChapterService ,
    private matDialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(){
    this.preload = true;
    this.list = undefined;
    const limit = this.paginator?.pageSize ? this.paginator.pageSize : this.pageSizeOptions[0];
    const page = this.paginator?.pageIndex ? this.paginator.pageIndex*limit : 0;
    this.chapterService.getListChapters(page, limit).subscribe(res=>{
      this.list=res.results;
      this.resultsLength = res.count;
      this.preload=false;
    })

  }
  

  openDialogCreate(): void {
    const dialogRef = this.matDialog.open(DialogChapterCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
        
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }

  openDialogEdit(chapter: Chapter): void {
    const dialogRef = this.matDialog.open(DialogChapterCreateEditComponent, {
      width: '100vw',
      maxWidth: '400px',
      data: {
        dataEdit: chapter
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable();
    });
  }




}
