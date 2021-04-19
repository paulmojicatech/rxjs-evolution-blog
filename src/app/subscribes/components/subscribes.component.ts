import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPositionSections } from '../../models/players.interface';
import { IPlayerOverview } from '../../models/players.interface';
import { PlayerPositionType } from '../../models/players.interface';
import { PlayerHttpService } from '../../services/player-http.service';

@Component({
    templateUrl: './subscribes.component.html',
})
export class SubscribesComponent implements OnInit, OnDestroy {
    topFiveForm: FormGroup;
    filteredPositions: IPositionSections[];
    players: IPlayerOverview[];
    positionSections: IPositionSections[];

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
                if (!!value) {
                    this.filteredPositions = this.positionSections.filter(
                        section =>
                            section.position
                                .toLowerCase()
                                .indexOf(value.toLowerCase()) > -1
                    );
                } else {
                    this.filteredPositions = this.positionSections;
                }
            });

        this.positionSections = this.setupSections();
        this.filteredPositions = this.setupSections();
        this.getPlayers();
    }

    ngOnDestroy(): void {
        this._componentDestroyed$.next();
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
                players.forEach(player =>
                    this.addPlayerToPositionSection(player)
                );
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
