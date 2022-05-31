/*
  Warnings:

  - You are about to drop the column `birth_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `blood_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_datetime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `doc_id_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expedition_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `expedition_place` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `family_names` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fingerprint_file_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `given_names` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo_file_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `signature_file_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_datetime` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[docIdNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[givenNames,familyNames]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdDatetime` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `docIdNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expeditionDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDatetime` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_doc_id_number_key` ON `User`;

-- DropIndex
DROP INDEX `User_given_names_family_names_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `birth_date`,
    DROP COLUMN `blood_type`,
    DROP COLUMN `country_code`,
    DROP COLUMN `created_datetime`,
    DROP COLUMN `doc_id_number`,
    DROP COLUMN `expedition_date`,
    DROP COLUMN `expedition_place`,
    DROP COLUMN `family_names`,
    DROP COLUMN `fingerprint_file_url`,
    DROP COLUMN `given_names`,
    DROP COLUMN `photo_file_url`,
    DROP COLUMN `signature_file_url`,
    DROP COLUMN `updated_datetime`,
    ADD COLUMN `birthDate` DATE NOT NULL,
    ADD COLUMN `bloodType` ENUM('A', 'B', 'AB', 'O', 'Undefined') NOT NULL DEFAULT 'Undefined',
    ADD COLUMN `countryCode` VARCHAR(2) NOT NULL DEFAULT '-',
    ADD COLUMN `createdDatetime` DATETIME NOT NULL,
    ADD COLUMN `docIdNumber` INTEGER UNSIGNED NOT NULL,
    ADD COLUMN `expeditionDate` DATE NOT NULL,
    ADD COLUMN `expeditionPlace` VARCHAR(100) NOT NULL DEFAULT '-',
    ADD COLUMN `familyNames` VARCHAR(100) NOT NULL DEFAULT '-',
    ADD COLUMN `fingerprintFileUrl` VARCHAR(100) NOT NULL DEFAULT '-',
    ADD COLUMN `givenNames` VARCHAR(100) NOT NULL DEFAULT '-',
    ADD COLUMN `photoFileUrl` VARCHAR(100) NOT NULL DEFAULT '-',
    ADD COLUMN `signatureFileUrl` VARCHAR(100) NOT NULL DEFAULT '-',
    ADD COLUMN `updatedDatetime` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_docIdNumber_key` ON `User`(`docIdNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `User_givenNames_familyNames_key` ON `User`(`givenNames`, `familyNames`);
