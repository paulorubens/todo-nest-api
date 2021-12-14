import { type } from "os";
import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterTableTaskAddColumnsDate1639444619115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'tasks',
            [
                new TableColumn({
                    name: 'dateCreated',
                    type: 'timestamp without time zone',
                    default: 'current_timestamp'
                }),
                new TableColumn({
                    name: 'dateCompleted',
                    type: 'timestamp without time zone',
                    isNullable: true
                }),
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns(
            'tasks',
            ['dateCreated', 'dateCompleted']
        );
    }

}
