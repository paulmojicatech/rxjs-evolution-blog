import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPositionSections } from '../../models/players.interface';
import { IPlayerOverview } from '../../models/players.interface';
import { PlayerPositionType } from '../../models/players.interface';
import { PlayerHttpService } from '../../services/player-http.service';

@Component({
    templateUrl: './subscribes.component.html',
    styleUrls: ['./subscribes.component.scss']
})
export class SubscribesComponent implements OnInit, OnDestroy {

    @ViewChild('drawer')
    drawer: MatDrawer;

    topFiveForm: FormGroup;
    positionSections: IPositionSections[];
    selectedPlayer: IPlayerOverview;
    showSidePanel = false;
    searchFilter: string;

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
                this.searchFilter = value;
            });

        this.positionSections = this.setupSections();
        this.getPlayers();
    }

    ngOnDestroy(): void {
        this._componentDestroyed$.next();
    }

    handlePlayerSelected(player: IPlayerOverview): void {
      this.drawer.toggle();
      this.selectedPlayer = player;
    }

    handlePlayerLiked(player: IPlayerOverview): void {
      const updatedSections = this.positionSections.map(section => {
        if (section.position === player.position) {
          const updatedPlayers = section.players.map(sectionPlayer => {
            if (sectionPlayer.name === player.name) {
              return {
                ...player,
                likes: !!player.likes ? player.likes + 1 : 1
              };
            }
            return sectionPlayer;
          });
          return {
            ...section,
            players: updatedPlayers
          };
        }
        return section;
      })
      this.positionSections = updatedSections;
    }

    private setupSections(): IPositionSections[] {
        return [
            {
                position: PlayerPositionType.PG,
                players: [],
            },
            {
                position: PlayerPositionType.SG,
                players: [],
            },
            {
                position: PlayerPositionType.SF,
                players: [],
            },
            {
                position: PlayerPositionType.PF,
                players: [],
            },
            {
                position: PlayerPositionType.C,
                players: [],
            },
        ];
    }

    private getPlayers(): void {
        this._playersHttpSvc
            .getPlayers()
            .pipe(takeUntil(this._componentDestroyed$))
            .subscribe(players => {
                players.forEach(player => {
                    this._playersHttpSvc.getPlayerDetails(player).subscribe(playerDetails => {
                        this.addPlayerToPositionSection(playerDetails);
                    });
                    
                });
            });
    }

    private addPlayerToPositionSection(playerOverview: IPlayerOverview): void {
        this.positionSections.forEach(section => {
            if (section.position === playerOverview.position) {
                section.players = [...section.players, playerOverview];
            }
        });
    }
}
