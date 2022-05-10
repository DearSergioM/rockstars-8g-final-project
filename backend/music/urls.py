from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('albums/', views.getAlbums, name="albums"),
    path('albums/<str:pk>/', views.getAlbum, name="album"),
]