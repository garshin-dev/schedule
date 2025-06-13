package routes

import (
	"api/di"
	"github.com/gorilla/mux"
)

func SetupRouter(deps *di.Dependencies) *mux.Router {
	router := mux.NewRouter().PathPrefix("/api").Subrouter()

	SetupUserRouters(router, deps)
	SetupTagsRoutes(router, deps)

	return router
}
