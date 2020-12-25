import { Component, OnInit } from '@angular/core';
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
  private team: Team;
  countries = Object.keys(Country).map((key) => ({
    label: key,
    key: Country[key],
  }));
  squadNumber = Object.keys(SquadNumber).slice(
    Object.keys(SquadNumber).length / 2
  );

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
}
