import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeService } from './me.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css'],
  providers: [ MeService ]
})
export class MeComponent implements OnInit, OnDestroy {
    meText = "Tjänstledig småländsk sjukgymnast och IT-utbildare som när hon inte kämpar med kursen jsramverk gärna plockar kantareller och lingon, lagar god mat och ser på film och hockeyX.";
    private subscription: any;
    texts: object;


    constructor(private meService: MeService) { }

    ngOnInit() {
        this.subscription = this.meService.fetchMe()
        // this.meService.fetchMe()
            .subscribe((data) => {
                this.texts = data.data;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
