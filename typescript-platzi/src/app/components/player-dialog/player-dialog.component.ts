import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Country } from 'src/app/enums/country';
import { SquadNumber } from 'src/app/enums/squad-number';
import { Player } from 'src/app/interfaces/player';
import { Team } from 'src/app/interfaces/team';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent implements OnInit {
  @Input() player: Player;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private team: Team;
  countries = Object.keys(Country).map((key) => ({
    label: key,
    key: Country[key],
  }));
  squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key) => ({
      label: key,
      key: SquadNumber[key],
    }));

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  private newPlayer(playerFormValue: Player) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey: Player = {
      ...playerFormValue,
      $key: key,
    };
    const formattedTeam: Team = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFormValueKey,
      ],
    };
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = {
      ...playerForm.value,
    };
    if (playerForm.valid) {
      playerFormValue.leftFooted =
        playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    if (this.player) {
      this.editPlayer(playerFormValue);
    } else {
      this.newPlayer(playerFormValue);
    }
    window.location.replace('#');
  }

  private editPlayer(playerForm) {
    const playerFormValueWithKey = {
      ...playerForm,
      $key: this.player.$key,
    };
    const playerFormValueWithFormattedKey = {
      ...playerForm,
      key: this.player.$key,
    };
    delete playerFormValueWithFormattedKey.$key;
    const modifiedPlayers = this.team.players
      ? this.team.players.map((player) => {
          return player.$key === this.player.$key
            ? playerFormValueWithFormattedKey
            : player;
        })
      : this.team.players;
    const formattedTeam = {
      ...this.team,
      players: [
        ...(modifiedPlayers
          ? modifiedPlayers
          : [playerFormValueWithFormattedKey]),
      ],
    };
    this.playerService.editPlayer(playerFormValueWithKey);
    this.teamService.editTeam(formattedTeam);
  }

  onClose() {
    this.closeDialog.emit(true);
  }
}
