import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateUsers1717936752241 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < 1000000; i++) {
      await queryRunner.query(
        `INSERT INTO usr ("firstName", "lastName", age, gender, "hasIssues") VALUES ($1, $2, $3, $4, $5)`,
        [`FirstName${i}`, `LastName${i}`, Math.floor(Math.random() * 100), "M", Math.random() > 0.5]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM usr`);
  }
}
