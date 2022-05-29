CREATE TABLE user (
	id INTEGER UNSIGNED auto_increment NOT NULL,
	given_names varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '-' NOT NULL,
	family_names varchar(100) DEFAULT '-' NOT NULL,
	doc_id_number INTEGER UNSIGNED NOT NULL,
	signature_file_url varchar(100) DEFAULT '-' NULL,
	photo_file_url varchar(100) DEFAULT '-' NULL,
	country_code varchar(2) DEFAULT '-' NOT NULL,
	state varchar(50) DEFAULT '-' NOT NULL,
	city varchar(50) DEFAULT '-' NOT NULL,
	fingerprint_file_url varchar(100) DEFAULT '-' NOT NULL,
	birth_date DATE NOT NULL,
	height INTEGER UNSIGNED NULL,
	blood_type ENUM('A','B','AB','O') NULL,
	gender ENUM('Male','Female','Other','Undefined') DEFAULT 'Undefined' NOT NULL,
	expedition_date DATE NOT NULL,
	expedition_place varchar(100) DEFAULT '-' NOT NULL,
	created_datetime DATETIME NOT NULL,
	updated_datetime DATETIME NOT NULL,
	CONSTRAINT user_PK PRIMARY KEY (id),
	CONSTRAINT user_unique_fullname UNIQUE KEY (given_names,family_names),
	CONSTRAINT user_unique_id UNIQUE KEY (id),
	CONSTRAINT user_unique_doc_id_number UNIQUE KEY (doc_id_number)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
