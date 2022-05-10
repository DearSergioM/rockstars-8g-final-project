from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .albums import albums
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    return Response("Hello")

@api_view(['GET'])
def getAlbums(request):
    return Response(albums)

@api_view(['GET'])
def getAlbum(request, pk):
    album = None
    for i in albums:
        if i['_id'] == pk:
            album = i
            break


    return Response(album)
