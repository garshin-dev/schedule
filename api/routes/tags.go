package routes

import (
	"api/di"
	"github.com/gorilla/mux"
)

func SetupTagsRoutes(router *mux.Router, deps *di.Dependencies) {
	router.HandleFunc("/tags", deps.TagHandler.GetTags).Methods("GET")
}
