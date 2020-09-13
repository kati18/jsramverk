import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
    meText = "Tjänstledig småländsk sjukgymnast och IT-utbildare som när hon inte kämpar med kursen jsramverk gärna plockar kantareller och lingon, lagar god mat och ser på film och hockey.";

  constructor() { }

  ngOnInit(): void {
  }

}
