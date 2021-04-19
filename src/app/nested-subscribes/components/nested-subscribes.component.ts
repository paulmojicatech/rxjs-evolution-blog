import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPositionSections } from '../../models/players.interface';
import { IPlayerOverview } from '../../models/players.interface';
import { PlayerPositionType } from '../../models/players.interface';
import { PlayerHttpService } from '../../services/player-http.service';

@Component({
    templateUrl: './nested-subscribes.component.html',
})
export class NestedSubscribesComponent implements OnInit, OnDestroy {
    topFiveForm: FormGroup;
    positions = [
        PlayerPositionType.PG,
        PlayerPositionType.SG,
        PlayerPositionType.SF,
        PlayerPositionType.PF,
        PlayerPositionType.C,
    ];
    filteredPositions: string[];
    players: IPlayerOverview[];
    positionSections: IPositionSections[] = [
      {
        position: PlayerPositionType.PG,
        players: []
      },
      {
        position: PlayerPositionType.SG,
        players: []
      },
      {
        postion: PlayerPositionType.SF,
        players: []
      },
      {
        position: PlayerPositionType.PF,
        players: []
      },
      {
        position: PlayerPositionType.C,
        players: []
      }
    ];

    private _componentDestroyed$ = new Subject();

    constructor(
        private _fb: FormBuilder,
        private _playersHttpSvc: PlayerHttpService
    ) {}

    ngOnInit(): void {
        this.topFiveForm = this._fb.group({
            position: [null],
        });
        this.topFiveForm
            .get('position')
            .valueChanges.pipe(takeUntil(this._componentDestroyed$))
            .subscribe(value => {
                console.log('VALUE', value);
                if (!!value) {
                    this.filteredPositions = this.positions.filter(
                        position =>
                            position
                                .toLowerCase()
                                .indexOf(value.toLowerCase()) > -1
                    );
                } else {
                    this.filteredPositions = this.positions;
                }
            });
        this.getPlayers();
    }

    ngOnDestroy(): void {
        this._componentDestroyed$.next();
    }

    private getPlayers(): void {
        this._playersHttpSvc
            .getPlayers()
            .pipe(takeUntil(this._componentDestroyed$))
            .subscribe(players => {
              players.forEach(player => this.addPlayerToPositionSection(player));
            });
    }

    private addPlayerToPositionSection(playerOverview: IPlayerOverview): void {
      const sectionToAddPlayerTo = this.positionSections
        .find(section => section.position === playerOverview.position)
        .filter(section => {
          return section.players.lastIndexOf(player => player.name !== playerOverview.name);
        });
      if (!sectionToAddPlayerTo?.length) {
        const updatedSectionIndex = this.positionSections.findIndex(section => section.position === sectionToAddPlayerTo.section);
        const updatedSection = this.positionSections[updatedSectionIndex];
        this.positionSections[updatedSectionIndex] = {
          ...updatedSection,
          players: [
            ...updatedSection.players,
            playerOverview
          ]
        };
      }
    }
}
