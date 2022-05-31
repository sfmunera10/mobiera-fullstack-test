-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `given_names` VARCHAR(100) NOT NULL DEFAULT '-',
    `family_names` VARCHAR(100) NOT NULL DEFAULT '-',
    `doc_id_number` INTEGER UNSIGNED NOT NULL,
    `signature_file_url` VARCHAR(100) NOT NULL DEFAULT '-',
    `photo_file_url` VARCHAR(100) NOT NULL DEFAULT '-',
    `country_code` VARCHAR(2) NOT NULL DEFAULT '-',
    `state` VARCHAR(50) NOT NULL DEFAULT '-',
    `city` VARCHAR(50) NOT NULL DEFAULT '-',
    `fingerprint_file_url` VARCHAR(100) NOT NULL DEFAULT '-',
    `birth_date` DATE NOT NULL,
    `height` INTEGER UNSIGNED NULL,
    `blood_type` ENUM('A', 'B', 'AB', 'O', 'Undefined') NOT NULL DEFAULT 'Undefined',
    `rh` ENUM('Positive', 'Negative', 'Undefined') NOT NULL DEFAULT 'Undefined',
    `gender` ENUM('Male', 'Female', 'Other', 'Undefined') NOT NULL DEFAULT 'Undefined',
    `expedition_date` DATE NOT NULL,
    `expedition_place` VARCHAR(100) NOT NULL DEFAULT '-',
    `created_datetime` DATETIME NOT NULL,
    `updated_datetime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_doc_id_number_key`(`doc_id_number`),
    UNIQUE INDEX `User_given_names_family_names_key`(`given_names`, `family_names`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
