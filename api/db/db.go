package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func Connect(dsn string) (*sql.DB, error) {
	db, err := sql.Open("postgres", dsn)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return db, nil
}
