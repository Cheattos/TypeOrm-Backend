import { MigrationInterface, QueryRunner } from "typeorm";

export class PemiluMigration1700975885385 implements MigrationInterface {
    name = 'PemiluMigration1700975885385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`blog_entity\` (\`blog_id\` int NOT NULL AUTO_INCREMENT, \`blog_title\` varchar(255) NOT NULL, \`blog_description\` text NOT NULL, \`blog_cover\` varchar(255) NOT NULL, \`posted_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`blogsbyuserUserId\` int NULL, UNIQUE INDEX \`REL_dfe21c862b288334d3278d74aa\` (\`blogsbyuserUserId\`), PRIMARY KEY (\`blog_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`user_fullname\` varchar(255) NOT NULL, \`user_email\` varchar(255) NOT NULL, \`user_password\` varchar(255) NOT NULL, \`user_role\` varchar(255) NOT NULL, \`posted_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userVoterId\` int NULL, UNIQUE INDEX \`REL_b022cb583c3897af2e5abde7e4\` (\`userVoterId\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`voter_entity\` (\`voter_id\` int NOT NULL AUTO_INCREMENT, \`voter_name\` varchar(255) NOT NULL, \`voter_address\` text NOT NULL, \`voter_gender\` varchar(255) NOT NULL, \`posted_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`voterUserId\` int NULL, \`votepaslonPaslonId\` int NULL, UNIQUE INDEX \`REL_3f8a1b4630b62e3c41df8b5a73\` (\`voterUserId\`), UNIQUE INDEX \`REL_8e901f304c7892391a0becba70\` (\`votepaslonPaslonId\`), PRIMARY KEY (\`voter_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`paslon_entity\` (\`paslon_id\` int NOT NULL AUTO_INCREMENT, \`paslon_name\` varchar(255) NOT NULL, \`pasnlon_number\` varchar(255) NOT NULL, \`paslon_vision_mision\` text NOT NULL, \`paslon_photo\` varchar(255) NOT NULL, \`posted_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`paslon_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`partai_entity\` (\`partai_id\` int NOT NULL AUTO_INCREMENT, \`partai_name\` varchar(255) NOT NULL, \`partai_leader\` varchar(255) NOT NULL, \`partai_vision_mision\` text NOT NULL, \`partai_logos\` varchar(255) NOT NULL, \`partai_address\` varchar(255) NOT NULL, \`posted_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`paslonPaslonId\` int NULL, UNIQUE INDEX \`REL_5598d6805776f70cfe4c371a81\` (\`paslonPaslonId\`), PRIMARY KEY (\`partai_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`blog_entity\` ADD CONSTRAINT \`FK_dfe21c862b288334d3278d74aaa\` FOREIGN KEY (\`blogsbyuserUserId\`) REFERENCES \`user_entity\`(\`user_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_entity\` ADD CONSTRAINT \`FK_b022cb583c3897af2e5abde7e45\` FOREIGN KEY (\`userVoterId\`) REFERENCES \`voter_entity\`(\`voter_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`voter_entity\` ADD CONSTRAINT \`FK_3f8a1b4630b62e3c41df8b5a732\` FOREIGN KEY (\`voterUserId\`) REFERENCES \`user_entity\`(\`user_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`voter_entity\` ADD CONSTRAINT \`FK_8e901f304c7892391a0becba704\` FOREIGN KEY (\`votepaslonPaslonId\`) REFERENCES \`paslon_entity\`(\`paslon_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`partai_entity\` ADD CONSTRAINT \`FK_5598d6805776f70cfe4c371a812\` FOREIGN KEY (\`paslonPaslonId\`) REFERENCES \`paslon_entity\`(\`paslon_id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partai_entity\` DROP FOREIGN KEY \`FK_5598d6805776f70cfe4c371a812\``);
        await queryRunner.query(`ALTER TABLE \`voter_entity\` DROP FOREIGN KEY \`FK_8e901f304c7892391a0becba704\``);
        await queryRunner.query(`ALTER TABLE \`voter_entity\` DROP FOREIGN KEY \`FK_3f8a1b4630b62e3c41df8b5a732\``);
        await queryRunner.query(`ALTER TABLE \`user_entity\` DROP FOREIGN KEY \`FK_b022cb583c3897af2e5abde7e45\``);
        await queryRunner.query(`ALTER TABLE \`blog_entity\` DROP FOREIGN KEY \`FK_dfe21c862b288334d3278d74aaa\``);
        await queryRunner.query(`DROP INDEX \`REL_5598d6805776f70cfe4c371a81\` ON \`partai_entity\``);
        await queryRunner.query(`DROP TABLE \`partai_entity\``);
        await queryRunner.query(`DROP TABLE \`paslon_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_8e901f304c7892391a0becba70\` ON \`voter_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_3f8a1b4630b62e3c41df8b5a73\` ON \`voter_entity\``);
        await queryRunner.query(`DROP TABLE \`voter_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_b022cb583c3897af2e5abde7e4\` ON \`user_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
        await queryRunner.query(`DROP INDEX \`REL_dfe21c862b288334d3278d74aa\` ON \`blog_entity\``);
        await queryRunner.query(`DROP TABLE \`blog_entity\``);
    }

}
