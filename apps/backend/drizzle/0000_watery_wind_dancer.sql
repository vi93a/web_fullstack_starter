CREATE TABLE "config_variable" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "config_variable_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"key" varchar(255) NOT NULL,
	"value" varchar(255) NOT NULL
);
